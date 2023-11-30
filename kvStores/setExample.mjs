import { createClient } from "@vercel/kv";
import * as dotEnv from "dotenv";
dotEnv.config({ path: "./.env.local" });
const users = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const user = await users.set("evaluationExamples", [
  {
    codeSamples: [
      `
    #include <cmath>
    #include <vector>
    
    bool has_close_elements(std::vector<float> arr, float threshold) {
        int n = arr.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (std::abs(arr[i] - arr[j]) < threshold)
                    return true;
            }
        }
        return false;
    }
    `,
      `
    #include<stdio.h>
    #include<vector>
    #include<math.h>
    using namespace std;
    #include<algorithm>
    #include<stdlib.h>
    bool has_close_elements(vector<float> numbers, float threshold){
        int i,j;
        
        for (i=0;i<numbers.size();i++)
        for (j=i+1;j<numbers.size();j++)
        if (abs(numbers[i]-numbers[j])<threshold)
        return true;

        return false;
    }
    `,
      `
    #include<stdio.h>
    #include<vector>
    #include<math.h>
    using namespace std;
    #include<algorithm>
    #include<stdlib.h>
    bool has_close_elements(vector<float> numbers, float threshold){
        int i,j;
        
        for (i=0;i<numbers.size();i++)
        for (j=i+1;j<numbers.size();j++)
        if (abs(numbers[i]-numbers[j])<threshold)
        return true;

        return false;
    }
    `,
    ],
    sourceCode: `
    #include<stdio.h>
    #include<vector>
    #include<math.h>
    using namespace std;
    #include<algorithm>
    #include<stdlib.h>
    bool has_close_elements(vector<float> numbers, float threshold){
        int i,j;
        
        for (i=0;i<numbers.size();i++)
        for (j=i+1;j<numbers.size();j++)
        if (abs(numbers[i]-numbers[j])<threshold)
        return true;

        return false;
    }
    `,
    initialHint: `This is a score 5 example, The decompiled code is nearly the same as the source code`,
    index: 0,
  },
]);
