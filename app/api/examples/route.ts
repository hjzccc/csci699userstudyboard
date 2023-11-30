export const dynamic = "force-dynamic";
import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const data = await kv.get<[]>("evaluationExamples");

  if (!data) {
    return new Response("Internal Error", { status: 500 });
  }
  let response = new NextResponse(JSON.stringify(data), { status: 200 });
  return response;
}
