import { Card, Tour, TourProps } from "antd";
import React, { useRef, useState } from "react";
import CodeBlock from "./codeblock";
import { Problem } from "@/types";

const problems: Problem[] = [
  {
    title: "When will the model exit and return true?",
    choices: [
      "When the value of an element in the vector exceeds the threshold value",
      "When the vector is empty",
      "When two elements are found to have a difference smaller than the threshold value.",
    ],
  },
  {
    title: "When will the model return false?",
    choices: [
      "When both indexes i and j come to the end of the vector",
      "When there are two elements in the vector have a difference exceed the threshold value",
    ],
  },
  {
    title: " What does i and j mean in the context of the code?",
    choices: [
      "j = i + 1, and i is the index of the iteration",
      "Both of them are indexes, and j can be any number larger than i and less than array size",
      "i,j are independent and should not depend on each other",
    ],
  },
];
const code = `
#include <algorithm>
#include <stdlib.h>
// has_close_elements

#include <vector>
#include <cmath> // For std::abs

extern "C" {

bool has_close_elements(const std::vector<float>& vec, float threshold) {
    const size_t size = vec.size(); // get the number of elements in the vector
    // Outer loop: Iterate through each element in the vector
    for (size_t i = 0; i < size; ++i) {
        // Inner loop: Compare the current element with the rest of the elements
        for (size_t j = i + 1; j < size; ++j) {
            // Calculate the absolute difference between the elements
            if (std::abs(vec[i] - vec[j]) < threshold) {
                return true; // Return true if elements are close
            }
        }
    }
    // Return false if no close elements are found
    return false;
}

} // extern "C"

`;
function SingletonQuestion({
  problem,
  onSelect,
  chosen = "0",
}: {
  problem: Problem;
  onSelect: (optionMark: string) => void;
  chosen?: string;
}) {
  const c = "A";
  return (
    <Card className="m-2" bordered={true}>
      <pre className=" text-lg">{problem.title}</pre>
      {problem.choices.map((value, index) => {
        const optionMark = String.fromCharCode(c.charCodeAt(0) + index);
        return (
          <div
            key={index}
            onClick={() => {
              onSelect(optionMark);
            }}
            className={`border-2 border-gray-500 p-2 rounded-full  max-w-fit mt-3 cursor-pointer hover:bg-gray-500 ${
              chosen === optionMark ? "bg-gray-500" : ""
            }`}
          >
            {`${optionMark}.${value}`}
          </div>
        );
      })}
    </Card>
  );
}
type Props = {
  codeText: string;
  problems: Problem[];
  tourOpen: boolean;
};
function FunctionalityEval({
  codeText = "",
  problems = [],
  tourOpen = false,
}: Props) {
  const [tourPerformed, setTourPerformed] = React.useState(false);
  const pageRef = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "Functionality Evaluation",
      description:
        "You will answer a few questions about the code to show your understanding of the code.",
      placement: "center",
      target: () => pageRef.current,
    },
  ];
  const [choices, setChoices] = useState<string[]>(new Array(problems.length));
  return (
    <div className="p-3" ref={pageRef}>
      <Tour
        open={tourOpen && !tourPerformed}
        steps={steps}
        onClose={() => setTourPerformed(true)}
      ></Tour>
      <CodeBlock codeText={codeText}></CodeBlock>
      {problems?.map((problem, index) => (
        <SingletonQuestion
          chosen={choices[index]}
          onSelect={(mark) => {
            setChoices((choices) => {
              choices[index] = mark;
              return [...choices];
            });
          }}
          key={index}
          problem={problem}
        ></SingletonQuestion>
      ))}
    </div>
  );
}

export default FunctionalityEval;
