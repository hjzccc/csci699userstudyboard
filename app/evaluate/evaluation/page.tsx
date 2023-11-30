"use client";
import Question from "@/components/question";
import { CodeExample } from "@/types";
import { useRouter } from "next/navigation";
import React, { Suspense, use, useEffect, useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import hljs from "highlight.js";
import SummaryEval from "@/components/summaryEval";
import FunctionalityEval from "@/components/functionalityEval";
import { Tabs, Tour } from "antd";
import type { TourProps } from "antd";
export default function EvaluationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [tabName, setTabName] = useState("Summary");
  const { data, isLoading, error } = useSWRImmutable<CodeExample[]>(
    "/api/evaluation",
    (url: string) => fetch(url).then((data) => data.json())
  );
  const evaluationSet = data ?? [];
  const currentExample = evaluationSet[currentIndex];

  if (isLoading || error) {
    return <div>loading...</div>;
  }

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
              try {
                const response = await fetch("/api/submit", {
                  method: "POST",
                  body: localStorage.getItem("scores"),
                });
                if (response.ok) {
                  router.push("/evaluate/evaluation");
                }
              } catch {}
            }}
          >
            Submit
          </button>
        </div>
        <div className="flex w-[90%] flex-1 flex-col">
          <div className="overflow-auto">
            <div className={`${tabName != "Summary" ? "hidden" : ""}`}>
              <SummaryEval
                tourOpen={false}
                groundTruth={currentExample.summary.groundTruth}
                generatedSummaries={currentExample.summary.generated}
              ></SummaryEval>
            </div>
            <div className={`${tabName != "Readability" ? "hidden" : ""}`}>
              <Question
                tourOpen={false}
                codeSamples={currentExample.codeSamples}
                // sourceCode={currentExample.sourceCode}
                onChange={(values) => {
                  localStorage.setItem("results", JSON.stringify(values));
                }}
                initialHint={currentExample.initialHint}
              ></Question>
            </div>
            <div className={`${tabName != "Functionality" ? "hidden" : ""}`}>
              <FunctionalityEval
                tourOpen={false}
                problems={currentExample.problemEval.problems}
                codeText={currentExample.problemEval.codeText}
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
