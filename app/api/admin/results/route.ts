import { PARTICIPANT_LIST_NAME } from "@/utils/constants";
import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const results = await kv.hgetall(PARTICIPANT_LIST_NAME);
  return new Response(JSON.stringify(results), { status: 200 });
}
