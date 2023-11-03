import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "";
  const data = await kv.hget("volunteers", id);
  if (!data) {
    return new Response("UnAuthorized", { status: 401 });
  }
  let response = new NextResponse("Ok", { status: 200 });
  response.cookies.set("volunteer", id);
  return response;
}
