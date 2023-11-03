import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  const scores = await request.json();
  const id = cookies().get("volunteer");
  console.log(scores);
  return new Response("Ok", { status: 200 });
}
