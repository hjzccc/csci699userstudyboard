import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  const results = await request.json();
  const id = cookies().get("volunteer")?.value;
  if (!id) {
    return new Response("No volunteer id", { status: 400 });
  }
  await kv.hset("testResults", { [id]: JSON.stringify(results) });
  return new Response("Ok", { status: 200 });
}
