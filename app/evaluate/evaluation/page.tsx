"use client";
import Question from "@/components/question";
import { CodeExample } from "@/types";
import { useRouter } from "next/navigation";
import React, { Suspense, use, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

async function getEvaluationSet() {
  const res = await fetch("/api/evaluation");
  const data = await res.json();
  return data;
}
function EvaluationPage({
  evaluationCodePromise,
}: {
  evaluationCodePromise: Promise<CodeExample[]>;
}) {
  const evaluationSet = use<CodeExample[]>(evaluationCodePromise);
  const [currentIndex, setCurrentIndex] = useState(0);
  const storedScores = localStorage.getItem("scores");
  const initialScores: { index: number; score: number }[] = storedScores
    ? JSON.parse(storedScores)
    : "" ||
      Array.from(evaluationSet, (value, index) => {
        return { index: value.index, score: 0 };
      });
  console.log(initialScores);
  const [scores, setScores] =
    useState<{ index: number; score: number }[]>(initialScores);
  const currentExample = evaluationSet[currentIndex];
  const router = useRouter();
  return (
    <>
      <div className="flex w-full justify-start">
        <div className="w-24  bg-slate-800 flex flex-col overflow-hidden">
          {evaluationSet.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex((preIndex) => index);
              }}
              className="w-full min-h-[96px] flex justify-center items-center text-white hover:bg-slate-700 border-b border-slate-700"
            >
              {scores[index].score != 0 ? (
                <AiFillCheckCircle className=" fill-green-600" />
              ) : (
                index
              )}
            </button>
          ))}
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm p-2.5 text-center m-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={async () => {
              if (scores.findIndex((value) => value.score == 0) != -1) {
                alert("Please finish all examples");
                return;
              }
              try {
                const response = await fetch("/api/submit", {
                  method: "POST",
                  body: localStorage.getItem("scores"),
                });
                if (response.ok) {
                  router.push("/thanks");
                }
              } catch {}
            }}
          >
            Submit
          </button>
        </div>
        <Question
          codeLeft={currentExample.leftCode}
          initialScore={scores[currentIndex].score}
          codeRight={currentExample.rightCode}
          onRateChange={(index, score) => {
            console.log(scores);
            setScores((preScores) => {
              const newScores = [...preScores];
              newScores[currentIndex].score = score;
              localStorage.setItem("scores", JSON.stringify(newScores));
              return newScores;
            });
          }}
          initialHint={currentExample.initialHint}
        ></Question>
      </div>
    </>
  );
}
export default function Page() {
  return (
    <Suspense>
      <EvaluationPage
        evaluationCodePromise={getEvaluationSet()}
      ></EvaluationPage>
    </Suspense>
  );
}
