import {
  FUNCTIONALITY_SAMPLE_LIST_NAME,
  PARTICIPANT_LIST_NAME,
  READABILITY_SAMPLE_LIST_NAME,
} from "@/utils/constants";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
const participantsList = PARTICIPANT_LIST_NAME;
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
  const res = await kv.hdel(participantsList, id);
  if (res) {
    return new NextResponse("ok", {
      status: 200,
    });
  }
  return new NextResponse("Internal Error", {
    status: 500,
  });
}
