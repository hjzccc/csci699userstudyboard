import { createClient } from "@vercel/kv";
import * as dotEnv from "dotenv";
dotEnv.config({ path: "./.env.development.local" });
const users = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const user = await users.set(
  "evaluationDataSet",
  Array.from({ length: 100 }, (_, i) => {
    return {
      leftCode: "",
      rightCode: "",
      initialHint: `this is evaluationDataSet ${i}`,
      index: i,
    };
  })
);
