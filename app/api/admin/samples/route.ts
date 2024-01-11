import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CodeExample, StoredCodeSample } from "@/types";
import { SingletonSample } from "@/app/admin/page";
import { v4 as uuidv4 } from "uuid";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  let samples = await kv.hgetall("testList1");
  let records = [];
  for (const key in samples) {
    records.push({
      id: key,
      ...(samples[key] as StoredCodeSample),
    });
  }
  let response = new NextResponse(JSON.stringify(records), {
    status: 200,
  });
  return response;
}
export async function POST(request: NextRequest) {
  console.log("request go in");
  let rawData: SingletonSample = await request.json();
  let len = await kv.hlen("testList1");
  console.log("len", len);
  const id = uuidv4();
  console.log(id);
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
            text: item.content,
            title: item.title,
          })) || [],
      },
      metadata: rawData.metadata,
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
