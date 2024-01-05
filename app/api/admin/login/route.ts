import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminpass } from "@/utils";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password") ?? "";
  console.log(password);
  if (password != adminpass) {
    return new Response("UnAuthorized", { status: 401 });
  }
  let response = new NextResponse("Ok", { status: 200 });
  response.cookies.set("admin", adminpass);
  return response;
}
