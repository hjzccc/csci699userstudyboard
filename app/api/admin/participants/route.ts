import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const results = await kv.hgetall("participants");
  return new Response(JSON.stringify(results), { status: 200 });
}
export async function POST(request: NextRequest) {
  const newId = (await request.json()).id;
  if (!newId) {
    return new Response("Invalid parameters", { status: 400 });
  }
  const res = await kv.hset("participants", { [newId]: {} });
  if (res) {
    return new Response("ok", { status: 200 });
  }
  return new Response("Internal Error", { status: 500 });
}
