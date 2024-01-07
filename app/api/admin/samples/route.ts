export const dynamic = "force-dynamic";
import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CodeExample, StoredCodeSample } from "@/types";
import { SingletonSample } from "@/app/admin/page";

export async function GET(request: NextRequest) {
  let samples = await kv.hgetall("testList1");
  let records = [];
  for (const key in samples) {
    records.push(samples[key]);
  }
  let response = new NextResponse(JSON.stringify(records), {
    status: 200,
  });
  return response;
}
export async function POST(request: NextRequest) {
  let rawData: SingletonSample = await request.json();
  let len = await kv.hlen("testList1");
  const id = len + 1;
  const res = await kv.hset<StoredCodeSample>("testList1", {
    [id]: {
      readabilityEval: {
        id,
        codeSamples: rawData.readabilityEval.codeSamples,
      },
      functionalityEval: {
        id,
        codeText: rawData.functionalityEval.codeText,
        problems: rawData.functionalityEval.problems,
      },
      summaryEval: {
        id,
        groundTruth: rawData.summaryEval.groundTruth,
        generated:
          rawData.summaryEval.generated?.map((item) => ({
            text: item,
          })) || [],
      },
    },
  });
  if (res) {
    return new NextResponse("ok", {
      status: 200,
    });
  }
  return new NextResponse("Internal Error", {
    status: 500,
  });
}
