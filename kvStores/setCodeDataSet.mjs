import { createClient } from "@vercel/kv";
import * as dotEnv from "dotenv";
dotEnv.config({ path: "./.env.local" });
const users = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const user = await users.set("evaluationDataSet", [
  {
    codeSamples: [
      {
        title: "wat2c",
        content: `
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
      },
      {
        title: "chatgpt",
        content: `
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
      },
      {
        title: "our approach",
        content: `
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
      },
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
    initialHint: `This C++ code defines a function has_close_elements that determines if a vector of floating-point numbers contains any two elements that are within a specified distance from each other, as defined by the threshold value. The function iterates through pairs of elements in the vector and returns true if it finds a pair whose absolute difference is less than the threshold, indicating they are closely spaced. If no such pair is found, the function returns false.`,
    index: 0,
  },
  {
    codeSamples: [
      {
        title: "wat2c",
        content: `
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
      },
      {
        title: "chatgpt",
        content: `
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
      },
      {
        title: "our approach",
        content: `
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
      },
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
    initialHint: `This C++ code defines a function has_close_elements that determines if a vector of floating-point numbers contains any two elements that are within a specified distance from each other, as defined by the threshold value. The function iterates through pairs of elements in the vector and returns true if it finds a pair whose absolute difference is less than the threshold, indicating they are closely spaced. If no such pair is found, the function returns false.`,
    index: 0,
  },
  {
    codeSamples: [
      {
        title: "wat2c",
        content: `
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
      },
      {
        title: "sourcecode",
        content: `
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
      },
      {
        title: "our approach",
        content: `
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
      },
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
    initialHint: `This C++ code defines a function has_close_elements that determines if a vector of floating-point numbers contains any two elements that are within a specified distance from each other, as defined by the threshold value. The function iterates through pairs of elements in the vector and returns true if it finds a pair whose absolute difference is less than the threshold, indicating they are closely spaced. If no such pair is found, the function returns false.`,
    index: 0,
  },
  {
    codeSamples: [
      {
        title: "wat2c",
        content: `
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
      },
      {
        title: "chatgpt",
        content: `
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
      },
      {
        title: "our approach",
        content: `
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
      },
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
    initialHint: `This C++ code defines a function has_close_elements that determines if a vector of floating-point numbers contains any two elements that are within a specified distance from each other, as defined by the threshold value. The function iterates through pairs of elements in the vector and returns true if it finds a pair whose absolute difference is less than the threshold, indicating they are closely spaced. If no such pair is found, the function returns false.`,
    index: 0,
  },
]);
