import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  EvaluationTest,
  FunctionalityResult,
  MultipleChoiceQuestion,
  ReadabilitySample,
} from "@/types";
import { SingletonSample } from "@/app/admin/page";
import { v4 as uuidv4 } from "uuid";
import {
  FUNCTIONALITY_SAMPLE_LIST_NAME,
  READABILITY_SAMPLE_LIST_NAME,
} from "@/utils/constants";
import { ReadabilityFormData } from "@/components/readabilitySampleForm";
import { FunctionalityFormData } from "@/components/functionalitySampleForm";
export const dynamic = "force-dynamic";
const sampleListName = FUNCTIONALITY_SAMPLE_LIST_NAME;
export async function GET(request: NextRequest) {
  let samples = await kv.hgetall<{ [key: string]: MultipleChoiceQuestion }>(
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
  let rawData: FunctionalityFormData = await request.json();
  let len = await kv.hlen(sampleListName);
  console.log("len", len);
  const id = uuidv4();
  console.log(id);
  const res = await kv.hset<MultipleChoiceQuestion>(sampleListName, {
    [id]: {
      id: id,
      codeText: rawData.codeText,
      questions: rawData.questions,
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
