export const dynamic = "force-dynamic";
import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// export async function GET(request: NextRequest) {
//   const data = await kv.get<[]>("evaluationDataSet");
//   const length = data?.length ? data.length - 1 : 0;
//   const numbers = Array.from({ length: length }, (_, i) => i + 1);
//   for (let i = numbers.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (numbers.length - 1));
//     [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//   }
//   if (!data) {
//     return new Response("Internal Error", { status: 500 });
//   }
//   let selectedCodeData: [] = [];
//   numbers.slice(0, 10).forEach((i) => {
//     selectedCodeData.push(data[i]);
//   });
//   let response = new NextResponse(JSON.stringify(selectedCodeData), {
//     status: 200,
//   });
//   return response;
// }
const listKey = "testList1";
export async function GET(request: NextRequest) {
  const len = await kv.hlen(listKey);
  if (len == 0) {
    return new Response("Internal Error", { status: 500 });
  }
  const records = await kv.hgetall(listKey);
  let data: any[] = [];
  for (const key in records) {
    data.push(records[key]);
  }
  const numbers = Array.from({ length: len }, (_, i) => i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (numbers.length - 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  let selectedCodeData: any[] = [];
  numbers.slice(0, 10).forEach((i) => {
    selectedCodeData.push(data[i]);
  });
  let response = new NextResponse(JSON.stringify(selectedCodeData), {
    status: 200,
  });
  return response;
}
