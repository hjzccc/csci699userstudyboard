import { createClient } from "@vercel/kv";
import * as dotEnv from "dotenv";
dotEnv.config({ path: "./.env.development.local" });
const users = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const user = await users.set(
  "evaluationExamples",
  Array.from({ length: 10 }, (_, i) => {
    return {
      leftCode: "",
      rightCode: "",
      initialHint: `this is example ${i}`,
      index: i,
    };
  })
);
