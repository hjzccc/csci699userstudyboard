import { createClient } from "@vercel/kv";
import * as dotEnv from "dotenv";
dotEnv.config({ path: "./.env.development.local" });
const users = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const user = await users.set("evaluationExamples", [
  {
    leftCode: `
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
    rightCode: `
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
  {
    leftCode: `
    #include <cmath>
    #include <cfloat>
    #include <climits>
    float truncate_number(float local0) {
      if(std::abs(local0) < FLT_MAX)
          return local0 - static_cast<int>(local0);
      else
          return -2147483648 - local0;
    }
    `,
    rightCode: `
    #include<stdio.h>
    #include<math.h>
    using namespace std;
    #include<algorithm>
    #include<stdlib.h>
    float truncate_number(float number){
        return number-int(number);
    }
    `,
    initialHint: `This is a score 4 example, The functionality is almost the same as source code, but its implementation has some differences`,
    index: 1,
  },
  {
    leftCode: `
    #include <stdint.h>
    #include <vector>
    int32_t below_zero(std::vector<int32_t> data) {
        int32_t total = 0;
        int32_t size = data.size();
        for(int32_t i = 0; i < size; i++){
            if(data[i] >= 0) break;
            total += data[i];
        }
        return total;
    }
    `,
    rightCode: `
    #include<stdio.h>
    #include<vector>
    using namespace std;
    #include<algorithm>
    #include<math.h>
    #include<stdlib.h>
    bool below_zero(vector<int> operations){
        int num=0;
        for (int i=0;i<operations.size();i++)
        {
            num+=operations[i];
            if (num<0) return true;
        }
        return false;
    }
    `,
    initialHint: `This is a score 1 example, The decompiled code is misleading",`,
    index: 2,
  },
]);
