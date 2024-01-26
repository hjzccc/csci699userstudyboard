export const dynamic = "force-dynamic";
import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  FUNCTIONALITY_SAMPLE_LIST_NAME,
  PARTICIPANT_LIST_NAME,
  READABILITY_SAMPLE_LIST_NAME,
  USER_COOKIE_NAME,
} from "@/utils/constants";
import {
  EvaluationTest,
  MultipleChoiceQuestion,
  Participant,
  ReadabilitySample,
} from "@/types";
const readablityListKey = READABILITY_SAMPLE_LIST_NAME;
const functionalityListKey = FUNCTIONALITY_SAMPLE_LIST_NAME;
export async function GET(request: NextRequest) {
  const rawReadabilitySamples = await kv.hgetall<
    Record<string, ReadabilitySample>
  >(readablityListKey);
  const rawFunctionalitySamples = await kv.hgetall<
    Record<string, MultipleChoiceQuestion>
  >(functionalityListKey);
  const readabilitySamples = [];
  const functionalitySamples = [];
  for (const key in rawReadabilitySamples) {
    readabilitySamples.push({
      ...rawReadabilitySamples[key],
    });
  }
  for (const key in rawFunctionalitySamples) {
    functionalitySamples.push({
      ...rawFunctionalitySamples[key],
    });
  }
  let groupedReadablitySamples = readabilitySamples.reduce<
    Record<string, ReadabilitySample[]>
  >((result, value) => {
    let tag = value.tag;
    if (!result[tag]) {
      result[tag] = [];
    }
    result[tag].push(value);
    return result;
  }, {});

  let groupedFunctionalitySamples = functionalitySamples.reduce<
    Record<string, MultipleChoiceQuestion[]>
  >((result, value) => {
    let tag = value.tag;
    if (!result[tag]) {
      result[tag] = [];
    }
    result[tag].push(value);
    return result;
  }, {});
  //console.log(groupedFunctionalitySamples);
  const allTags = Object.keys(groupedReadablitySamples);
  let len = allTags.length;
  const numbers = Array.from({ length: len }, (_, i) => i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (numbers.length - 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  let selectedTags: string[] = [];
  numbers.slice(0, 3).forEach((i) => {
    selectedTags.push(allTags[i]);
  });
  console.log(selectedTags);
  let response = NextResponse.json<EvaluationTest[]>(
    selectedTags.map((tag) => ({
      readabilityEval: {
        codeSamples: groupedReadablitySamples[tag],
      },
      functionalityEval: {
        questionSamples: groupedFunctionalitySamples[tag],
      },
    }))
  );
  return response;
}
