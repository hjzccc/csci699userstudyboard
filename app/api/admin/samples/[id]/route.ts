import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let { id } = params;
  if (!id) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
  const res = await kv.hdel("testList1", id);
  if (res) {
    return new NextResponse("ok", {
      status: 200,
    });
  }
  return new NextResponse("Internal Error", {
    status: 500,
  });
}
