export type Question = {
  title: string;
  choices: string[];
};
type QuestionWithAnswer = Question & {
  answer: number;
};
export type CodeSample = { title: string; content: string };
export type MultipleChoiceQuestion = {
  tag: string;
  id: string;
  codeText: string;
  questions: QuestionWithAnswer[];
};
export type ReadabilitySample = {
  tag: string;
  id: string;
  sample1: CodeSample;
  sample2: CodeSample;
  source: CodeSample;
};
export type EvaluationTest = {
  readabilityEval: {
    codeSamples: ReadabilitySample[];
  };
  functionalityEval: {
    questionSamples: MultipleChoiceQuestion[];
  };
  // summaryEval: {
  //   id: string;
  //   groundTruth: string;
  //   generated: { text: string; title: string }[];
  // };
};
// export type SummaryResult = {
//   id: string;
//   results: {
//     summary: string;
//     rate: number;
//     title: string;
//   }[];
//   extra: {
//     groundTruth: string;
//   };
// };
export type FunctionalityResult = {
  sampleId: string;
  result: {
    codeText: string;
    questions: { title: string; choice: number; answer: number }[];
  };
};
export type ReadabilityResult = {
  sampleId: string;
  result: {
    sample1: CodeSample;
    sample2: CodeSample;
    source: CodeSample;
    relative: "greater" | "less" | "equal" | ""; // compare sample 1 with sample 2
  };
};
export type EvaluateResult = {
  // summary: SummaryResult;
  functionality: FunctionalityResult[];
  readability: ReadabilityResult[];
};
export type Participant = {
  results: Partial<EvaluateResult>;
  status: "pending" | "done";
  submissionTime: number;
};
