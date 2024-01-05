import { NextResponse, NextRequest } from "next/server";

import next from "next";
import { adminpass } from "./utils";

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const pathName = nextUrl.pathname;
  const isStaticResource = /\.\w+$/.test(pathName);
  console.log(pathName);
  console.log(isStaticResource);
  if (
    pathName != "/admin/login" &&
    pathName != "/api/admin/login" &&
    (pathName.startsWith("/api/admin") || pathName.startsWith("/admin"))
  ) {
    if (
      !req.cookies.get("admin") ||
      req.cookies.get("admin")?.value != adminpass
    ) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
  } else if (
    !isStaticResource &&
    !pathName.startsWith("/api") &&
    pathName != "/"
  ) {
    if (!req.cookies.get("volunteer")) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
  }
}
// export const config = {
//   matcher: ["/admin/:path*"],
// };
