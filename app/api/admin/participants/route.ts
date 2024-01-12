import { Participant } from "@/types";
import { PARTICIPANT_LIST_NAME } from "@/utils/constants";
import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const results = await kv.hgetall(PARTICIPANT_LIST_NAME);
  return new Response(JSON.stringify(results), { status: 200 });
}
export async function POST(request: NextRequest) {
  const newId = (await request.json()).id;
  if (!newId) {
    return new Response("Invalid parameters", { status: 400 });
  }
  const res = await kv.hset<Participant>(PARTICIPANT_LIST_NAME, {
    [newId]: {
      status: "pending",
      submissionTime: -1,
      results: {},
    },
  });
  if (res) {
    return new Response("ok", { status: 200 });
  }
  return new Response("Internal Error", { status: 500 });
}
