import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const data = await kv.get<[]>("evaluationDataSet");
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  if (!data) {
    return new Response("Internal Error", { status: 500 });
  }
  let selectedCodeData: [] = [];
  numbers.slice(0, 10).forEach((i) => {
    selectedCodeData.push(data[i]);
  });
  let response = new NextResponse(JSON.stringify(selectedCodeData), {
    status: 200,
  });
  return response;
}
