import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { EvaluationTest, ReadabilitySample } from "@/types";
import { SingletonSample } from "@/app/admin/page";
import { v4 as uuidv4 } from "uuid";
import { READABILITY_SAMPLE_LIST_NAME } from "@/utils/constants";
import { ReadabilityFormData } from "@/components/readabilitySampleForm";
export const dynamic = "force-dynamic";
const sampleListName = READABILITY_SAMPLE_LIST_NAME;
export async function GET(request: NextRequest) {
  let samples = await kv.hgetall<{ [key: string]: ReadabilitySample }>(
    sampleListName
  );
  let records = [];
  for (const key in samples) {
    records.push({
      ...samples[key],
    });
  }
  let response = new NextResponse(JSON.stringify(records), {
    status: 200,
  });
  return response;
}
export async function POST(request: NextRequest) {
  console.log("request go in");
  let rawData: ReadabilityFormData = await request.json();
  let len = await kv.hlen(sampleListName);
  console.log("len", len);
  const id = uuidv4();
  console.log(id);
  const res = await kv.hset<ReadabilitySample>(sampleListName, {
    [rawData.tag]: {
      id: id,
      sample1: rawData.sample1,
      sample2: rawData.sample2,
      source: rawData.source,
      tag: rawData.tag,
    },
  });
  if (res) {
    return new NextResponse("ok", {
      status: 200,
    });
  }
  console.log(res);
  return new NextResponse("Internal Error", {
    status: 500,
  });
}
