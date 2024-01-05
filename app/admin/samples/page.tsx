"use client";
import { StoredCodeSample } from "@/types";
import { Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dynamic from "next/dynamic";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { inherits } from "util";
import loadable from "@loadable/component";
const ReactJson = loadable(() => import("react-json-view"));

function Page() {
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
      render: (_, data) => <ReactJson collapsed={1} src={data}></ReactJson>,
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
  console.log(data);
  return (
    <>
      <Toaster />
      <Table columns={columns} dataSource={data}>
        page
      </Table>
    </>
  );
}

export default Page;
