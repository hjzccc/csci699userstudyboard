export type Problem = {
  title: string;
  choices: string[];
};
export type CodeExample = {
  codeSamples: { title: string; content: string }[];
  initialHint?: string;
  problemEval: { codeText: string; problems: Problem[] };
  summary: {
    groundTruth: string;
    generated: string[];
  };
  index?: number;
};
