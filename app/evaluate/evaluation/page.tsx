"use client";
import ReadabilityEval from "@/components/readabilityEval";
import {
  EvaluationTest,
  EvaluateResult,
  FunctionalityResult,
  ReadabilityResult,
} from "@/types";
import { useRouter } from "next/navigation";
import React, { Suspense, use, useEffect, useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import hljs from "highlight.js";
import SummaryEval from "@/components/summaryEval";
import FunctionalityEval from "@/components/functionalityEval";
import { Button, Tabs, Tour } from "antd";
import type { TourProps } from "antd";
import { json } from "stream/consumers";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { useAppSelector } from "@/hooks/redux";
import { current } from "@reduxjs/toolkit";
import { LockOutlined } from "@ant-design/icons";
export default function EvaluationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [tabName, setTabName] = useState("Functionality");
  const {
    data: evaluationSet,
    isLoading,
    error,
  } = useSWRImmutable<EvaluationTest[]>("/api/evaluation", (url: string) =>
    fetch(url).then((data) => data.json())
  );
  const [evaluationResults, setEvaluationResults] = useState<EvaluateResult[]>(
    []
  );
  useEffect(() => {
    const initialResult: EvaluateResult[] =
      evaluationSet?.map((evaluation) => {
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
    setEvaluationResults(initialResult);
  }, [evaluationSet]);

  if (isLoading || error || evaluationResults?.length == 0 || !evaluationSet) {
    return <div>loading...</div>;
  }
  console.log("evaluationSet", evaluationSet);
  const currentEvaluation = evaluationSet?.[currentIndex];
  const getTotalProgress = () => {
    let progress = 0;
    evaluationSet.forEach((evaluation) => {
      progress += evaluation.readabilityEval.codeSamples?.length;
      progress += evaluation.functionalityEval.questionSamples?.length;
    });
    return progress;
  };

  const getCurrentFunctionalityResult = () => {
    return evaluationResults[currentIndex].functionality.some(
      (functionalityResult) => {
        return functionalityResult.result?.questions?.some(
          (value) => value.choice === -1
        );
      }
    );
  };
  const getCurrentProgress = () => {
    let readabilityProgress = 0;
    evaluationResults.forEach((result) => {
      result.readability.forEach((readabilityResult) => {
        if (readabilityResult.result.relative) {
          readabilityProgress += 1;
        }
      });
    });
    let functionalityProgress = 0;
    evaluationResults.forEach((result) => {
      result.functionality.forEach((functionalityResult) => {
        if (
          functionalityResult.result?.questions?.every(
            (value) => value.choice != -1
          )
        ) {
          functionalityProgress += 1;
        }
      });
    });
    return readabilityProgress + functionalityProgress;
  };
  console.log(evaluationResults);
  console.log(getTotalProgress(), getCurrentProgress());
  return (
    <>
      <div className="relative flex justify-start w-full h-screen">
        <div className="w-24 bg-slate-800 flex flex-none flex-col">
          {evaluationSet.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex((preIndex) => index);
                setTabName("Functionality");
              }}
              className="w-full min-h-[96px] flex justify-center items-center text-white hover:bg-slate-700 border-b border-slate-700"
            >
              {index}
            </button>
          ))}
          <Button
            type="primary"
            className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm  text-center m-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={async () => {
              try {
                const response = await fetch("/api/results", {
                  method: "POST",
                  body: JSON.stringify(evaluationResults),
                });
                if (response.ok) {
                  router.replace("/thanks");
                }
              } catch {}
              console.log(evaluationResults);
            }}
            disabled={getCurrentProgress() != getTotalProgress()}
          >
            Submit
          </Button>
        </div>
        <div className="flex w-[90%] flex-1 flex-col">
          <div className="overflow-auto">
            <div className={`${tabName != "Summary" ? "hidden" : ""}`}>
              {/* <SummaryEval
                rates={evaluationResults[currentIndex]?.summary.results || []}
                tourOpen={false}
                onChange={(summary, rate) => {
                  setEvaluationResults((pre) => {
                    let results = pre[currentIndex].summary.results;
                    let matchedResult = results?.find(
                      (value) => value.summary == summary
                    );
                    if (matchedResult) {
                      matchedResult.rate = rate;
                    }
                    localStorage.setItem("newformat1", JSON.stringify(pre));
                    return [...pre];
                  });
                }}
                groundTruth={currentExample.summaryEval.groundTruth}
                generatedSummaries={currentExample.summaryEval.generated?.map(
                  (value) => value.text
                )}
              ></SummaryEval> */}
            </div>
            <div className={`${tabName != "Readability" ? "hidden" : ""}`}>
              <ReadabilityEval
                tourOpen={false}
                codeSamples={currentEvaluation.readabilityEval.codeSamples}
                readabilityResults={evaluationResults[currentIndex].readability}
                onChange={(values: ReadabilityResult[]) => {
                  setEvaluationResults((pre) => {
                    const updated = [...pre];
                    updated[currentIndex].readability = values;
                    console.log(updated[currentIndex]);
                    localStorage.setItem("newformat1", JSON.stringify(updated));
                    return updated;
                  });
                }}
              ></ReadabilityEval>
            </div>
            <div className={`${tabName != "Functionality" ? "hidden" : ""}`}>
              <FunctionalityEval
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
                tourOpen={false}
                multipleChoiceQuestions={
                  currentEvaluation.functionalityEval.questionSamples
                }
              ></FunctionalityEval>
            </div>
          </div>
          <div className="mt-auto h-12 w-full bottom-0 bg-slate-800 flex">
            {/* <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Summary");
              }}
            >
              Summary
            </button> */}
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Functionality");
              }}
            >
              Functionality
            </button>
            <button
              disabled={getCurrentFunctionalityResult()}
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Readability");
              }}
            >
              {getCurrentFunctionalityResult() ? <LockOutlined /> : ""}
              Readability
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
