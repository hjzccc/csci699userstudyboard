"use client";
import { EvaluateResult, StoredCodeSample } from "@/types";
import { Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dynamic from "next/dynamic";
import { userAgent } from "next/server";
import React from "react";
import useSWRImmutable from "swr/immutable";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
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
      <DynamicReactJson collapsed={1} src={data}></DynamicReactJson>
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
function Page() {
  const { data, isLoading, error } = useSWRImmutable<{
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
}

export default Page;
