import React, { useEffect, useRef, useState } from "react";
import { dracula } from "react-code-blocks";
import scoreHint from "@/utils/scoreHint";
import CodeBlock from "./codeblock";
type Props = {
  showRateButton?: boolean;
  onChange?: (values: ReadabilityResult[]) => void;
  index?: number;
  codeSamples: ReadabilitySample[];
  tourOpen?: boolean;
  readabilityResults?: ReadabilityResult[];
};
import hljs from "highlight.js";
import { Card, Form, Pagination, Select, Tabs, Tour, TourProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { ReadabilityResult, ReadabilitySample } from "@/types";
import { current } from "@reduxjs/toolkit";
function ReadabilityEval({
  codeSamples = [],
  showRateButton = true,
  onChange = () => {},
  index = -1,
  tourOpen = false,
  readabilityResults,
}: Props) {
  const [form] = Form.useForm();
  const [tourPerformed, setTourPerformed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const pageAreaRef = useRef(null);
  const pageRef = useRef(null);
  const rankAreaRef = useRef(null);
  const rankSelectRef = useRef(null);

  if (!codeSamples.length) return "Loading";
  const currentSample = codeSamples[currentIndex - 1];
  console.log(currentSample);
  const steps: TourProps["steps"] = [
    {
      title: "Similarity Rank",
      description:
        "You will evaluate the code readability by comparing the similarity between different code samples and the source code",
      target: () => pageAreaRef.current,
    },
    {
      title: " Compare the Similarity",
      description:
        "You will be asked to compare the similarity between the code samples and the source code, and choose which one is more similar or the two are equal",
      target: () => rankAreaRef.current,
    },
  ];
  return (
    <div
      className="flex-col flex justify-start gap-2 items-center flex-1"
      ref={pageAreaRef}
    >
      <Tour
        steps={steps}
        open={!tourPerformed && tourOpen}
        onClose={() => setTourPerformed(true)}
      ></Tour>
      <div className="flex w-full gap-5 justify-center items-center">
        <div className="w-[49%]">
          <Tabs
            className="h-full "
            defaultActiveKey="1"
            centered
            items={[
              {
                label: currentSample.sample1.title,
                key: `${currentSample.sample1.title}`,
                children: (
                  <CodeBlock
                    className="overflow-auto h-[60vh]"
                    codeText={currentSample.sample1.content}
                  ></CodeBlock>
                ),
              },
            ]}
          />
        </div>
        <div ref={rankAreaRef}>
          <Select
            value={
              readabilityResults?.find(
                (value) => value.sampleId == currentSample.id
              )?.result.relative
            }
            onChange={(value) => {
              if (!readabilityResults) return;
              let updatedResult = [...readabilityResults];
              const updated = updatedResult?.find(
                (value) => value.sampleId == currentSample.id
              );
              if (!updated) return;
              updated.result.relative = value;
              onChange(updatedResult);
            }}
            options={[
              {
                label: ">",
                value: "greater",
              },
              {
                label: "<",
                value: "less",
              },
              {
                label: "=",
                value: "equals",
              },
            ]}
          ></Select>
        </div>
        <div className="w-[49%]">
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                label: currentSample.sample2.title,
                key: `${currentSample.sample2.title}`,
                children: (
                  <CodeBlock
                    className="overflow-auto h-[60vh]"
                    codeText={currentSample.sample2.content}
                  ></CodeBlock>
                ),
              },
            ]}
          />
        </div>
      </div>
      <Card className="w-[99%]  break-words text-white">
        <CodeBlock codeText={currentSample.source.content}></CodeBlock>
      </Card>
      <div ref={pageRef}>
        <Pagination
          total={10 * codeSamples.length}
          current={currentIndex}
          onChange={(page) => {
            console.log(page);
            setCurrentIndex(page);
          }}
        ></Pagination>
      </div>
    </div>
  );
}

export default ReadabilityEval;
