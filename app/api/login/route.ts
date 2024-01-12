import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PARTICIPANT_LIST_NAME, USER_COOKIE_NAME } from "@/utils/constants";
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "";
  const data = await kv.hget(PARTICIPANT_LIST_NAME, id);
  if (!data) {
    return new Response("UnAuthorized", { status: 401 });
  }
  let response = new NextResponse("Ok", { status: 200 });
  response.cookies.set(USER_COOKIE_NAME, id);
  return response;
}
