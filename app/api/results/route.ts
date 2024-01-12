import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PARTICIPANT_LIST_NAME, USER_COOKIE_NAME } from "@/utils/constants";
import { EvaluateResult, Participant } from "@/types";
export async function POST(request: NextRequest) {
  const results: EvaluateResult = await request.json();
  const requestId = cookies().get(USER_COOKIE_NAME)?.value as string;
  await kv.hset<Participant>(PARTICIPANT_LIST_NAME, {
    [requestId]: {
      status: "done",
      submissionTime: Date.now(),
      results,
    },
  });
  return new Response("Ok", { status: 200 });
}
