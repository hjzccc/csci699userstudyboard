import { NextResponse, NextRequest } from "next/server";

import next from "next";
import { adminpass } from "./utils";
import { PARTICIPANT_LIST_NAME, USER_COOKIE_NAME } from "./utils/constants";
import path from "path";
import { kv } from "@vercel/kv";
import { Participant } from "./types";

export async function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const pathName = nextUrl.pathname;
  const isStaticResource = /\.\w+$/.test(pathName);
  // console.log(pathName);
  // console.log(isStaticResource);
  if (pathName.startsWith("/api/admin") || pathName.startsWith("/admin")) {
    if (pathName != "/admin/login" && pathName != "/api/admin/login") {
      if (
        !req.cookies.get("admin") ||
        req.cookies.get("admin")?.value != adminpass
      ) {
        return new NextResponse("UnAuthorized", { status: 401 });
      }
    }
  } else if (
    pathName == "/api/evaluation" ||
    pathName == "/api/evaluation/results" ||
    pathName == "/evaluate/evaluation"
  ) {
    const participantId = req.cookies.get("participantId")?.value ?? "";
    const participant: Participant | null = await kv.hget(
      PARTICIPANT_LIST_NAME,
      participantId
    );
    if (!participant || participant.status != "pending") {
      return NextResponse.redirect(new URL("/thanks", req.url));
    }
  }
}
// export const config = {
//   matcher: ["/admin/:path*"],
// };
