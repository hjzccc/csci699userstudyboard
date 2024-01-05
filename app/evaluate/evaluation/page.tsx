"use client";
import Question from "@/components/question";
import {
  CodeExample,
  EvaluateResult,
  FunctionalityResult,
  ReadabilityResult,
  SummaryResult,
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
export default function EvaluationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [tabName, setTabName] = useState("Summary");
  const {
    data: evaluationSet,
    isLoading,
    error,
  } = useSWRImmutable<CodeExample[]>("/api/evaluation", (url: string) =>
    fetch(url).then((data) => data.json())
  );
  const [evaluationResults, setEvaluationResults] = useState<EvaluateResult[]>(
    []
  );
  useEffect(() => {
    const initialResult: EvaluateResult[] =
      evaluationSet?.map((example) => {
        return {
          summary: {
            id: example.summaryEval.id,
            results:
              example.summaryEval.generated?.map((value) => ({
                summary: value.text,
                rate: -1,
              })) || [],
            extra: {
              groundTruth: example.summaryEval.groundTruth,
            },
          },
          readability: {
            id: example.readabilityEval.id,
            results: {},
            extra: {
              codeSamples: example.readabilityEval.codeSamples || [],
            },
          },
          functionality: {
            id: example.functionalityEval.id,
            results:
              example.functionalityEval.problems?.map((value) => ({
                title: value.title,
                choice: -1,
              })) || [],
            extra: {
              problems: example.functionalityEval.problems,
              codeText: example.functionalityEval.codeText,
            },
          },
        };
      }) || [];
    setEvaluationResults(initialResult);
  }, [evaluationSet]);

  if (isLoading || error || evaluationResults?.length == 0 || !evaluationSet) {
    return <div>loading...</div>;
  }
  console.log(evaluationSet);
  const currentExample = evaluationSet?.[currentIndex];
  const getTotalProgress = () => {
    let progress = 0;
    evaluationSet.forEach((example) => {
      if (example.summaryEval.generated?.length > 0) {
        progress += 1;
      }
      if (example.readabilityEval.codeSamples?.length > 0) {
        progress += 1;
      }
      if (example.functionalityEval.problems?.length > 0) {
        progress += 1;
      }
    });
    return progress;
  };
  const getCurrentProgress = () => {
    let progress = 0;
    evaluationResults.forEach((result) => {
      if (
        result.summary.results.length > 0 &&
        result.summary.results.every((value) => value.rate != -1)
      ) {
        progress += 1;
      }
      if (
        Object.keys(result.readability.results).length > 0 &&
        Object.keys(result.readability.results).length ==
          result.readability.extra.codeSamples.length
      ) {
        progress += 1;
      }
      if (
        result.functionality.results.length > 0 &&
        result.functionality.results.every((value) => value.choice != -1)
      ) {
        progress += 1;
      }
    });
    return progress;
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
                  router.push("/thanks");
                }
              } catch {}
            }}
            disabled={getCurrentProgress() != getTotalProgress()}
          >
            Submit
          </Button>
        </div>
        <div className="flex w-[90%] flex-1 flex-col">
          <div className="overflow-auto">
            <div className={`${tabName != "Summary" ? "hidden" : ""}`}>
              <SummaryEval
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
              ></SummaryEval>
            </div>
            <div className={`${tabName != "Readability" ? "hidden" : ""}`}>
              <Question
                tourOpen={false}
                codeSamples={currentExample.readabilityEval.codeSamples}
                ranks={evaluationResults[currentIndex].readability.results}
                onChange={(values) => {
                  setEvaluationResults((pre) => {
                    pre[currentIndex].readability.results = values.ranks;
                    console.log(pre[currentIndex]);
                    localStorage.setItem("newformat1", JSON.stringify(pre));
                    return [...pre];
                  });
                }}
                initialHint={currentExample.initialHint}
              ></Question>
            </div>
            <div className={`${tabName != "Functionality" ? "hidden" : ""}`}>
              <FunctionalityEval
                onChange={(title, choice) => {
                  setEvaluationResults((pre) => {
                    console.log(pre);
                    let results = pre[currentIndex].functionality.results;
                    let matchedResult = results?.find(
                      (value) => value.title == title
                    );
                    if (matchedResult) {
                      matchedResult.choice = choice;
                    }
                    localStorage.setItem("newformat1", JSON.stringify(pre));
                    return [...pre];
                  });
                }}
                choices={evaluationResults[currentIndex]?.functionality.results}
                tourOpen={false}
                problems={currentExample.functionalityEval.problems}
                codeText={currentExample.functionalityEval.codeText}
              ></FunctionalityEval>
            </div>
          </div>
          <div className="mt-auto h-12 w-full bottom-0 bg-slate-800 flex">
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Summary");
              }}
            >
              Summary
            </button>
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Readability");
              }}
            >
              Readability
            </button>
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Functionality");
              }}
            >
              Functionality
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
