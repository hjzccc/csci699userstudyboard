"use client";
import { Button, Form, Input, InputNumber, Space, Table, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EvaluateResult, StoredCodeSample } from "@/types";
import { ColumnsType } from "antd/es/table";
import useSWR from "swr";
import dynamic from "next/dynamic";
import loadable from "@loadable/component";
import { useRouter } from "next/navigation";
const ReactJson = loadable(() => import("react-json-view"));
export type SingletonSample = {
  readabilityEval: {
    codeSamples: {
      title: string;
      content: string;
    }[];
  };
  summaryEval: {
    groundTruth: string;
    generated: {
      title: string;
      content: string;
    }[];
  };
  functionalityEval: {
    codeText: string;
    problems: {
      title: string;
      choices: string[];
      answer: number;
    }[];
  };
};
const AddSample = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  return (
    <div className="p-2">
      <Toaster />
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={async (values: SingletonSample) => {
          try {
            const response = await fetch("api/admin/samples", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) throw new Error("Failed to add sample");
            toast.success("Added sample");
            form.resetFields();
          } catch (err: any) {
            toast.error(err.message);
          }

          console.log(values);
        }}
      >
        <Form.List name={["readabilityEval", "codeSamples"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[{ required: true, message: "Missing name" }]}
                  >
                    <Input placeholder="Sample Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "content"]}>
                    <TextArea placeholder="Code Here" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name={["summaryEval", "groundTruth"]}>
          <TextArea placeholder="Ground Truth Here" />
        </Form.Item>
        <Form.List name={["summaryEval", "generated"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[{ required: true, message: "Missing name" }]}
                  >
                    <Input placeholder="Summary Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "content"]}>
                    <TextArea placeholder="Generated Summary Here" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name={["functionalityEval", "codeText"]}>
          <TextArea placeholder="Functionality codeText Here"></TextArea>
        </Form.Item>
        <Form.List name={["functionalityEval", "problems"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[
                      { required: true, message: "Missing Problem Title" },
                    ]}
                  >
                    <Input placeholder="Problem Title" />
                  </Form.Item>
                  <Form.List name={[name, "choices"]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Problem Choice Content",
                                },
                              ]}
                            >
                              <TextArea placeholder="Problem choice" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item
                    {...restField}
                    name={[name, "answer"]}
                    rules={[
                      { required: true, message: "Missing Problem Title" },
                    ]}
                  >
                    <InputNumber placeholder="correct answer index" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const Samples = () => {
  const { data, isLoading, error, mutate } = useSWR<StoredCodeSample[]>(
    "/api/admin/samples",
    (url: string) => fetch(url).then((data) => data.json())
  );
  const columns: ColumnsType<StoredCodeSample> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, data) => <a>{data.functionalityEval.id}</a>,
    },
    {
      title: "Sample",
      dataIndex: "sample",
      key: "sample",
      render: (_, data) => (
        <ReactJson theme={"monokai"} collapsed={1} src={data}></ReactJson>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      render: (_, data) => (
        <Button
          type="primary"
          onClick={async () => {
            try {
              const response = await fetch(
                `/api/admin/samples/${data.functionalityEval.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) throw new Error("Failed to delete");
              toast.success("Deleted");
            } catch (err: any) {
              toast.error(err.message);
            } finally {
              mutate();
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  if (isLoading || error) return <div>loading...</div>;
  return (
    <>
      <Toaster />
      <Table columns={columns} dataSource={data}>
        page
      </Table>
    </>
  );
};
const Results = () => {
  const columns: ColumnsType<EvaluateResult & { userId: string }> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, data) => <a>{data.userId}</a>,
    },
    {
      title: "Sample",
      dataIndex: "sample",
      key: "sample",
      render: (_, data) => (
        <ReactJson theme={"monokai"} collapsed={1} src={data}></ReactJson>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      render: (_, data) => <Button type="primary">Delete</Button>,
    },
  ];
  const { data, isLoading, error } = useSWR<{
    [key: string]: EvaluateResult;
  }>("/api/admin/results", (url: string) =>
    fetch(url).then((data) => data.json())
  );

  if (isLoading || error) return <div>loading...</div>;
  const results = [];
  for (const key in data) {
    results.push({ ...data[key], userId: key });
  }
  return (
    <Table columns={columns} dataSource={results}>
      page
    </Table>
  );
};
const Participants = () => {
  const [newParticipantId, setNewParticipantId] = useState("-1");
  const { data, isLoading, error } = useSWR("/api/admin/participants", (url) =>
    fetch(url).then((data) => data.json())
  );
  if (isLoading || error) return <div>loading...</div>;
  return (
    <div>
      <Toaster />
      <Input
        type="number"
        className="w-fit"
        onChange={(e) => {
          setNewParticipantId(e.target.value);
        }}
      ></Input>
      <Button
        type="primary"
        onClick={async () => {
          try {
            const response = await fetch(`/api/admin/participants`, {
              method: "POST",
              body: JSON.stringify({ id: newParticipantId }),
            });
            if (!response.ok) throw new Error("Failed to add participant");
            toast.success("Added participant");
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
      >
        Add
      </Button>
      <div>
        <ReactJson src={data} theme={"monokai"}></ReactJson>
      </div>
    </div>
  );
};
function Page() {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: "Add Sample",
            key: "1",
            children: <AddSample></AddSample>,
          },
          {
            label: "Samples",
            key: "2",
            children: <Samples></Samples>,
          },
          {
            label: "Results",
            key: "3",
            children: <Results></Results>,
          },
          {
            label: "Participants",
            key: "4",
            children: <Participants></Participants>,
          },
        ]}
      ></Tabs>
    </>
  );
}

export default Page;
