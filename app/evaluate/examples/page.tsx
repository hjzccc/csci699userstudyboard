"use client";
import Question from "@/components/question";
import { CodeExample } from "@/types";
import { get } from "http";
import { useRouter } from "next/navigation";
import React, { Suspense, use, useMemo, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

async function getExamples() {
  const res = await fetch("/api/examples");
  const data = await res.json();
  return data;
}

function CodeExamplePage({
  codeExamplePromise,
}: {
  codeExamplePromise: Promise<CodeExample[]>;
}) {
  const codeExamples = use<CodeExample[]>(codeExamplePromise);
  const [exampleIndex, setExampleIndex] = useState(0);
  const router = useRouter();
  const currentExample = codeExamples[exampleIndex];
  return (
    <>
      <div className="flex w-full justify-start">
        <div className="w-24  bg-slate-800 flex flex-col overflow-hidden">
          {codeExamples.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setExampleIndex((preIndex) => index);
              }}
              className="w-full min-h-[96px] flex justify-center items-center text-white hover:bg-slate-700 border-b border-slate-700"
            >
              {index}
            </button>
          ))}
          
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm p-2.5 text-center m-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              router.push("/evaluate/evaluation");
            }}
          >
            Proceed Evaluation
          </button>
        </div>
        <Question
          codeLeft={currentExample.leftCode}
          codeRight={currentExample.rightCode}
          initialHint={currentExample.initialHint}
          showRateButton={false}
        ></Question>
      </div>
    </>
  );
}
function Page() {
  return (
    <Suspense fallback="loading...">
      <CodeExamplePage codeExamplePromise={getExamples()}></CodeExamplePage>
    </Suspense>
  );
}
export default Page;
