import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import scoreHint from "@/utils/scoreHint";
type Props = {
  codeLeft?: string;
  codeRight?: string;
  showRateButton?: boolean;
  onRateChange?: (index: number, score: number) => void;
  initialHint?: string;
  index?: number;
  initialScore?: number;
};
function Question({
  codeLeft = "",
  codeRight = "",
  showRateButton = true,
  onRateChange = () => {},
  initialHint = "",
  index = -1,
  initialScore = 0,
}: Props) {
  const currentHint = scoreHint[initialScore] || initialHint;

  return (
    <main className="py-10 flex-col flex justify-center items-center flex-1">
      <div className="flex gap-10 w-full justify-center items-center ">
        <CodeBlock
          customStyle={{
            minWidth: "40%",
            maxWidth: "40%",
            height: "70vh",
            overflow: "auto",
            display: "inline-block",
          }}
          text={codeLeft}
          language={"cpp"}
          showLineNumbers={true}
          theme={dracula}
        />
        \
        <CodeBlock
          customStyle={{
            minWidth: "40%",
            maxWidth: "40%",
            height: "70vh",
            overflow: "auto",
          }}
          text={codeRight}
          language={"cpp"}
          showLineNumbers={true}
          theme={dracula}
        />
      </div>
      <div className=" mt-10 w-[90%] h-max border-4 border-gray-200  rounded-3xl bg-slate-300 p-6">
        <p>{currentHint}</p>
      </div>
      {showRateButton && (
        <div className="mt-5">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
            <button
              key={i}
              onClick={() => {
                onRateChange(index, i);
              }}
              className={`${
                initialScore == i &&
                "ring-blue-300 ring-4 outline-none dark:ring-blue-800 "
              } rounded-full w-20 h-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  p-2.5 mr-24 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            >
              {i}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

export default Question;
