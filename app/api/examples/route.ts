export const dynamic = "force-dynamic";
import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  EvaluationTest,
  MultipleChoiceQuestion,
  ReadabilitySample,
} from "@/types";
export async function GET(request: NextRequest) {
  const readabilityExample = await kv.get<ReadabilitySample>(
    "readabilityExample"
  );
  const functionalityExample = await kv.get<MultipleChoiceQuestion[]>(
    "functionalityExample"
  );
  if (!readabilityExample || !functionalityExample) {
    return new Response("Internal Error", { status: 500 });
  }
  let response = NextResponse.json<EvaluationTest[]>([
    {
      readabilityEval: {
        codeSamples: [readabilityExample],
      },
      functionalityEval: {
        questionSamples: functionalityExample,
      },
    },
  ]);
  return response;
}
