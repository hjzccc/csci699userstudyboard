export type Problem = {
  title: string;
  choices: string[];
};
type ProblemWithAnswer = Problem & {
  answer: number;
};
export type CodeExample = {
  readabilityEval: {
    id: number;
    codeSamples: { title: string; content: string }[];
  };

  initialHint?: string;
  functionalityEval: { id: number; codeText: string; problems: Problem[] };
  summaryEval: {
    id: number;
    groundTruth: string;
    generated: { text: string }[];
  };
};
export type StoredCodeSample = {
  readabilityEval: {
    id: number;
    codeSamples: { title: string; content: string }[];
  };
  initialHint?: string;
  functionalityEval: {
    id: number;
    codeText: string;
    problems: ProblemWithAnswer[];
  };
  summaryEval: {
    id: number;
    groundTruth: string;
    generated: { text: string }[];
  };
};
export type SummaryResult = {
  id: number;
  results: {
    summary: string;
    rate: number;
  }[];
  extra: {
    groundTruth: string;
  };
};
export type FunctionalityResult = {
  id: number;
  results: {
    title: string;
    choice: number;
  }[];
  extra: {
    codeText: string;
    problems: Problem[];
  };
};
export type ReadabilityResult = {
  id: number;
  results: { [key: string]: string };
  extra: {
    codeSamples: { title: string; content: string }[];
  };
};
export type EvaluateResult = {
  summary: SummaryResult;
  functionality: FunctionalityResult;
  readability: ReadabilityResult;
};
