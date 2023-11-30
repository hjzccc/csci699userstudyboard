import React, { useEffect, useRef, useState } from "react";
import { dracula } from "react-code-blocks";
import scoreHint from "@/utils/scoreHint";
import CodeBlock from "./codeblock";
type Props = {
  showRateButton?: boolean;
  onChange?: (values: any) => void;
  initialHint?: string;
  index?: number;
  codeSamples: {
    title: string;
    content: string;
  }[];
  sourceCode?: string;
  tourOpen?: boolean;
};
import hljs from "highlight.js";
import { Card, Form, Select, Tabs, Tour, TourProps } from "antd";
import { useForm } from "antd/es/form/Form";
function Question({
  sourceCode = "",
  codeSamples = [],
  showRateButton = true,
  onChange = () => {},
  initialHint = "",
  index = -1,
  tourOpen = false,
}: Props) {
  const currentHint = initialHint;
  const [form] = Form.useForm();
  const [tourPerformed, setTourPerformed] = useState(false);
  const codeOptions = codeSamples.map((value, index) => ({
    label: value.title,
    value: value.title,
  }));
  const pageAreaRef = useRef(null);
  const codeTabRef = useRef(null);
  const rankAreaRef = useRef(null);
  const rankSelectRef = useRef(null);
  const steps: TourProps["steps"] = [
    {
      title: "Readability Rank",
      description: "You will rank the readability of the code samples",
      target: () => pageAreaRef.current,
    },
    {
      title: "Switch between code samples",
      description:
        "You can switch between code samples to help you compare with different versions",
      target: () => codeTabRef.current,
    },
    {
      title: "Rank the readability",
      description:
        "Rank the readability of the code samples, from best to worst",
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
      <div className="flex w-full gap-5 justify-center" ref={codeTabRef}>
        <div className="w-[49%]">
          <Tabs
            className="h-full "
            defaultActiveKey="1"
            centered
            items={[...codeSamples].map((value, i) => {
              return {
                label: value.title,
                key: `${i}`,
                children: (
                  <CodeBlock
                    className="overflow-auto h-[60vh]"
                    codeText={value.content}
                  ></CodeBlock>
                ),
              };
            })}
          />
        </div>
        <div className="w-[49%]">
          <Tabs
            defaultActiveKey="1"
            centered
            items={[...codeSamples].map((value, i) => {
              return {
                label: value.title,
                key: `${i}`,
                children: (
                  <CodeBlock
                    className="overflow-auto h-[60vh]"
                    codeText={value.content}
                  ></CodeBlock>
                ),
              };
            })}
          />
        </div>
      </div>
      <Card className="w-[99%]  break-words text-white">
        <p>{currentHint}</p>
      </Card>
      <div className=" self-start ml-3">
        <Form
          form={form}
          onValuesChange={(_, values) => {
            console.log(values);
            onChange(values);
          }}
        >
          <div className="flex gap-1" ref={rankAreaRef}>
            <label className="pt-1.5">
              rank from the best to worst readability:{" "}
            </label>
            {codeOptions.map((value, index) => (
              <Form.Item key={index} name={["ranks", `rank${index}`]}>
                <Select
                  options={codeOptions}
                  defaultValue={codeOptions[0]}
                ></Select>
              </Form.Item>
            ))}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Question;
