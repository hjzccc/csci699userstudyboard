export type Problem = {
  title: string;
  choices: string[];
};
type ProblemWithAnswer = Problem & {
  answer: number;
};
export type CodeExample = {
  readabilityEval: {
    id: string;
    codeSamples: { title: string; content: string }[];
  };

  initialHint?: string;
  functionalityEval: { id: string; codeText: string; problems: Problem[] };
  summaryEval: {
    id: string;
    groundTruth: string;
    generated: { text: string; title: string }[];
  };
};
export type StoredCodeSample = {
  readabilityEval: {
    id: string;
    codeSamples: { title: string; content: string }[];
  };
  initialHint?: string;
  functionalityEval: {
    id: string;
    codeText: string;
    problems: ProblemWithAnswer[];
  };
  summaryEval: {
    id: string;
    groundTruth: string;
    generated: { text: string; title: string }[];
  };
  metadata: string;
};
export type SummaryResult = {
  id: string;
  results: {
    summary: string;
    rate: number;
    title: string;
  }[];
  extra: {
    groundTruth: string;
  };
};
export type FunctionalityResult = {
  id: string;
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
  id: string;
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
