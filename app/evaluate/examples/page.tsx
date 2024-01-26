"use client";
import FunctionalityEval from "@/components/functionalityEval";
import ReadabilityEval from "@/components/readabilityEval";
import SummaryEval from "@/components/summaryEval";
import {
  EvaluateResult,
  EvaluationTest,
  FunctionalityResult,
  ReadabilityResult,
} from "@/types";
import { Tour, TourProps } from "antd";
import { get } from "http";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  Suspense,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import useSWRImmutable from "swr/immutable";
import { LockOutlined } from "@ant-design/icons";
export default function CodeSamplePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [tabName, setTabName] = useState("Functionality");
  const {
    data: examples,
    isLoading,
    error,
  } = useSWRImmutable<EvaluationTest[]>("/api/examples", (url: string) =>
    fetch(url).then((data) => data.json())
  );
  const [evaluationResults, setEvaluationResults] = useState<EvaluateResult[]>(
    []
  );
  useEffect(() => {
    console.log("wtf??", examples);
    const initialResult: EvaluateResult[] =
      examples?.map((evaluation) => {
        const readabilityResult: ReadabilityResult[] =
          evaluation.readabilityEval.codeSamples?.map((codeSample) => {
            return {
              sampleId: codeSample.id,
              result: {
                sample1: codeSample.sample1,
                sample2: codeSample.sample2,
                source: codeSample.source,
                relative: "",
              },
            };
          }) || [];
        const functionalityResult: FunctionalityResult[] =
          evaluation.functionalityEval.questionSamples?.map((mcq) => {
            return {
              sampleId: mcq.id,
              result: {
                codeText: mcq.codeText,
                questions: mcq.questions?.map((question) => ({
                  title: question.title,
                  choice: -1,
                  answer: question.answer,
                })),
              },
            };
          }) || [];
        return {
          readability: readabilityResult,
          functionality: functionalityResult,
        };
      }) || [];
    console.log("initial result", initialResult);
    setEvaluationResults(initialResult);
  }, [examples]);
  const getCurrentFunctionalityResult = () => {
    return evaluationResults[currentIndex].functionality.some(
      (functionalityResult) => {
        return functionalityResult.result?.questions?.some(
          (value) => value.choice === -1
        );
      }
    );
  };

  const sideBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const functionalitySectionRef = useRef(null);
  const [tourOpen, setTourOpen] = useState(true);
  const [summaryTour, setSummaryTour] = useState(false);
  const [readabilityTour, setReadabilityTour] = useState(false);
  const [functionalityTour, setFunctionalityTour] = useState(false);
  const readabilitySectionRef = useRef(null);
  const steps: TourProps["steps"] = [
    {
      title: "Switch and Submit",
      description:
        "Click on the button to switch between samples and submit when all samples are finished.",
      placement: "right",
      target: () => sideBarRef.current,
    },
    {
      title: "Switch Sections",
      description:
        "You will answer a couple of questions about the code then do a comparison between different code samples.",
      placement: "top",
      target: () => bottomBarRef.current,
    },
    {
      title: "Access the next section",
      description:
        "You will not have access to the readability section until you finish the functionality section",
      placement: "top",
      target: () => readabilitySectionRef.current,
    },
    {
      title: "Get Started!",
      description: "Now lets click the first section and see how it works",
      placement: "top",
      target: () => functionalitySectionRef.current,
    },
  ];
  if (isLoading || error || evaluationResults?.length == 0 || !examples) {
    return <div>loading...</div>;
  }
  const currentExample = examples[currentIndex];
  console.log("current", currentExample);
  console.log("current result", evaluationResults[currentIndex]);
  console.log(getCurrentFunctionalityResult());
  return (
    <>
      <Tour
        steps={steps}
        open={tourOpen}
        onClose={() => setTourOpen(false)}
      ></Tour>
      <div className="relative flex justify-start w-full h-screen">
        <div
          ref={sideBarRef}
          className="w-24 bg-slate-800 flex flex-none flex-col"
        >
          {examples.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex((preIndex) => index);
              }}
              className="w-full min-h-[96px] flex justify-center items-center text-white hover:bg-slate-700 border-b border-slate-700"
            >
              {/* {scores[index]?.score != 0 ? (
                <AiFillCheckCircle className=" fill-green-600" />
              ) : ( */}
              {index}
              {/* )} */}
            </button>
          ))}
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm p-2.5 text-center m-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={async () => {
              router.push("/evaluate/evaluation");
            }}
          >
            Proceed to Evaluation
          </button>
        </div>
        <div className="flex w-[90%] flex-1 flex-col">
          <div className="overflow-auto">
            <div className={`${tabName != "Summary" ? "hidden" : ""}`}>
              {/* <SummaryEval
                tourOpen={summaryTour}
                groundTruth={currentExample.summaryEval.groundTruth}
                generatedSummaries={currentExample.summaryEval.generated.map(
                  (value) => value.text
                )}
                rates={currentExample.summaryEval.generated.map((value) => ({
                  summary: value.text,
                  //@ts-ignore
                  rate: value.rate,
                }))}
              ></SummaryEval> */}
            </div>
            <div className={`${tabName != "Readability" ? "hidden" : ""}`}>
              <ReadabilityEval
                tourOpen={readabilityTour}
                codeSamples={currentExample.readabilityEval.codeSamples}
                // sourceCode={currentExample.sourceCode}
                onChange={(values) => {
                  localStorage.setItem("results", JSON.stringify(values));
                }}
              ></ReadabilityEval>
            </div>
            <div className={`${tabName != "Functionality" ? "hidden" : ""}`}>
              <FunctionalityEval
                tourOpen={functionalityTour}
                onChange={(values) => {
                  setEvaluationResults((pre) => {
                    const updated = [...pre];
                    updated[currentIndex].functionality = values;
                    localStorage.setItem("newformat1", JSON.stringify(pre));
                    return updated;
                  });
                }}
                functionalityResult={
                  evaluationResults[currentIndex]?.functionality
                }
                multipleChoiceQuestions={
                  currentExample.functionalityEval.questionSamples
                }
              ></FunctionalityEval>
            </div>
          </div>
          <div
            className="mt-auto h-12 w-full bottom-0 bg-slate-800 flex"
            ref={bottomBarRef}
          >
            {/* <button
              ref={summarySectionRef}
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Summary");
                setSummaryTour(true);
                setTourOpen(false);
              }}
            >
              Summary
            </button> */}
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              ref={functionalitySectionRef}
              onClick={() => {
                setTabName("Functionality");
                setFunctionalityTour(true);
                setTourOpen(false);
              }}
            >
              Functionality
            </button>
            <button
              disabled={getCurrentFunctionalityResult()}
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Readability");
                setReadabilityTour(true);
                setTourOpen(false);
              }}
            >
              {getCurrentFunctionalityResult() ? (
                <LockOutlined ref={readabilitySectionRef} />
              ) : (
                ""
              )}
              Readability
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
