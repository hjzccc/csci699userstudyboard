import { Button, Form, Input, InputNumber, Space } from "antd";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import toast, { Toaster } from "react-hot-toast";
export type FunctionalityFormData = {
  codeText: string;
  questions: {
    title: string;
    choices: string[];
    answer: number;
  }[];
  tag: string;
  tag1: string;
};
function FunctionalitySampleForm() {
  const [form] = Form.useForm<FunctionalityFormData>();

  return (
    <>
      <Toaster />
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={async (values) => {
          try {
            const response = await fetch("api/admin/functionalitySample", {
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
        }}
      >
        <Form.Item
          name={["codeText"]}
          rules={[{ required: true, message: "Missing Code Text" }]}
        >
          <TextArea placeholder="Functionality codeText Here"></TextArea>
        </Form.Item>
        <Form.List name={["questions"]}>
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
                    <Input placeholder="Question Title" />
                  </Form.Item>
                  <Form.List name={[name, "choices"]}>
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
                              name={name}
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
                  Add Question
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label="tag"
          name={"tag"}
          rules={[{ required: true, message: "Please input your tag" }]}
        >
          <TextArea placeholder="Give a tag to cluster the problem of the same type" />
        </Form.Item>
        <Form.Item
          label="tag1"
          name={"tag1"}
          rules={[{ required: true, message: "Please input your tag" }]}
        >
          <TextArea placeholder="Give a symbol to cluster the problem of the same tag" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FunctionalitySampleForm;
