"use client";
import { useAppSelector } from "@/hooks/redux";
import { Card, Rate, Tour, TourProps } from "antd";
import React, { useRef, useState } from "react";
import Markdown from "react-markdown";

const groundTruth = `Check if in given vector of numbers, are any two numbers closer to each other than given threshold.
>>> has_close_elements({1.0, 2.0, 3.0}, 0.5)
false
>>> has_close_elements({1.0, 2.8, 3.0, 4.0, 5.0, 2.0}, 0.3)
true
`;
const generatedSummaries1 = [
  `
  The Wasm function seems to check a given float vector (starts at memory address \`start_address\`) to see if it contains close elements based on a threshold (\`threshold\`).

  A score of 3 can be given because it is able to identify the function aims to “see if it contains close elements based on a threshold,” which is a paraphrase of “if any two numbers closer to each other than the given threshold”
  
`,
  `
The main function, $func1, takes an i32 and a f32 as parameters and returns an i32. It involves complex arithmetic and looping operations. The function appears to be performing a comparison and manipulation of floating-point values, possibly iterating over a data structure in memory. It includes conditionals and branching, indicating some form of decision-making process based on the input and computed values. 

A score of 1 can be given because it only identifies the low-level operations of the function (comparison, manipulation of floats) but not the high-level functionality, i.e. comparing the difference between two elements with a threshold value.
`,
];
type Props = {
  groundTruth: string;
  generatedSummaries: string[];
  tourOpen: boolean;
  onChange?: (summary: string, rate: number) => void;
  rates?: { summary: string; rate: number }[];
};
const evaluationInstruction = `
You will evaluate the generated summaries based on the ground truth summary. 

Score 1: The summary is not similar at all to the reference
Score 2: The summary is somewhat similar to the reference (with some differences)
Score 3: The summary is essentially the same as the reference
`;
function SummaryEval({
  groundTruth,
  generatedSummaries,
  tourOpen = false,
  onChange = () => {},
  rates = [],
}: Props) {
  const [tourPerformed, setTourPerformed] = useState(false);
  const ref1 = useRef(null);
  const evaluationResults = useAppSelector((state) => state.evaluationResults);
  const steps: TourProps["steps"] = [
    {
      title: "Summary Evaluation ",
      description: (
        <pre className=" whitespace-pre-line">{evaluationInstruction}</pre>
      ),
      placement: "center",
      target: () => ref1.current,
    },
  ];
  return (
    <div ref={ref1}>
      <Tour
        open={tourOpen && !tourPerformed}
        onClose={() => {
          setTourPerformed(true);
        }}
        steps={steps}
      ></Tour>
      <Card title="Ground Truth Summary" bordered={true} className="m-4">
        <pre className="text-white whitespace-pre-wrap">{groundTruth}</pre>
      </Card>
      {generatedSummaries?.map((summary, index) => (
        <Card
          key={index}
          title={`Generated Summary ${index + 1}`}
          bordered={true}
          className="m-4"
        >
          <Markdown className="text-white whitespace-pre-wrap break-words">
            {summary}
          </Markdown>
          <Rate
            value={rates.find((value) => value?.summary == summary)?.rate || 0}
            className="mt-4"
            count={3}
            onChange={(value) => {
              onChange(summary, value);
            }}
          ></Rate>
        </Card>
      ))}
    </div>
  );
}

export default SummaryEval;
