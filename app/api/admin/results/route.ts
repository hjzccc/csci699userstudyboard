import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const results = await kv.hgetall("testResults");
  return new Response(JSON.stringify(results), { status: 200 });
}
