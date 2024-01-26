import { EvaluateResult } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState: EvaluateResult[] = [];
export const evalResultSlice = createSlice({
  name: "evaluationResults",
  initialState,
  reducers: {
    setEvaluationResults: (state, action: PayloadAction<EvaluateResult[]>) => {
      return action.payload;
    },
  },
});

export const { setEvaluationResults } = evalResultSlice.actions;
export default evalResultSlice.reducer;
