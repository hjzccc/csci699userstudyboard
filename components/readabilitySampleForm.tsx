import { CodeSample } from "@/types";
import { Button, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
export type ReadabilityFormData = {
  sample1: CodeSample;
  sample2: CodeSample;
  source: CodeSample;
  tag: string;
};
function ReadabilitySampleForm() {
  const [form] = Form.useForm<ReadabilityFormData>();

  return (
    <div className="p-2">
      <Toaster />
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={async (values) => {
          try {
            const response = await fetch("api/admin/readabilitySample", {
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
        <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
          <Form.Item
            name={["sample1", "title"]}
            rules={[{ required: true, message: "Missing name" }]}
          >
            <Input placeholder="Sample Name" />
          </Form.Item>
          <Form.Item
            name={["sample1", "content"]}
            rules={[{ required: true, message: "Missing code" }]}
          >
            <TextArea placeholder="Code Here" />
          </Form.Item>
        </Space>
        <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
          <Form.Item
            name={["sample2", "title"]}
            rules={[{ required: true, message: "Missing name" }]}
          >
            <Input placeholder="Sample Name" />
          </Form.Item>
          <Form.Item
            name={["sample2", "content"]}
            rules={[{ required: true, message: "Missing code" }]}
          >
            <TextArea placeholder="Code Here" />
          </Form.Item>
        </Space>
        <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
          <Form.Item
            name={["source", "title"]}
            rules={[{ required: true, message: "Missing name" }]}
          >
            <Input placeholder="Sample Name" defaultValue={"source"} />
          </Form.Item>
          <Form.Item
            name={["source", "content"]}
            rules={[{ required: true, message: "Missing code" }]}
          >
            <TextArea placeholder="Code Here" />
          </Form.Item>
        </Space>
        <Form.Item
          label="tag"
          name={"tag"}
          rules={[{ required: true, message: "Please input your tag" }]}
        >
          <TextArea placeholder="Give a tag to cluster the problem of the same type" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ReadabilitySampleForm;
