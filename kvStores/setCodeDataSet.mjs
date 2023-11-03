import { createClient } from "@vercel/kv";
import * as dotEnv from "dotenv";
dotEnv.config({ path: "./.env.development.local" });
const users = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const user = await users.set("evaluationDataSet", [
  {
    leftCode: `
    #include <cmath>
    #define epsilon 0.0001

    bool right_angle_triangle(float side_1, float side_2, float side_3) { 
        // Calculate square of the sides
        float square1 = side_1 * side_1;
        float square2 = side_2 * side_2;
        float square3 = side_3 * side_3;

        // Checking Pythagorean theorem
        if( std::abs(square1 + square2 - square3) < epsilon || std::abs(square1 + square3 - square2) < epsilon || std::abs(square2 + square3 - square1) < epsilon )
            return true;
        return false;
    }`,
    rightCode: `
    #include<stdio.h>
    #include<vector>
    using namespace std;
    #include<algorithm>
    #include<math.h>
    #include<stdlib.h>
    vector<int> eat(int number,int need,int remaining){
        if (need>remaining) return {number+remaining, 0};
        return {number+need,remaining-need};
    }
    `,
    index: 0,
  },
  {
    leftCode: `
    #include<cmath>
    #include<vector>
    using namespace std;

    // Assume env::setTempRet0 and env::roundf work as external functions
    extern void setTempRet0(int value);
    extern float roundf(float value);

    long long double_the_difference(std::vector<float> vec) {
        long long sum = 0;
        int half_diff = vec.size();
        
        for(int i=0; i<half_diff; i++) {
            float number = vec[i];
            float rounded_number = roundf(number);

            if(abs(rounded_number - number) < 0.0001 && abs(rounded_number) < pow(2, 31) && number > 0) {
                int adj_number = (int)rounded_number;
                if (adj_number & 1) {
                    sum += (long long)(adj_number * adj_number);
                }
            }
        }
        return sum;
    }`,
    rightCode: `
    #include<stdio.h>
    #include<math.h>
    #include<vector>
    #include<string>
    #include<algorithm>
    using namespace std;
    #include<stdlib.h>
    string Strongest_Extension(string class_name,vector<string> extensions){
        string strongest="";
        int max=-1000;
        for (int i=0;i<extensions.size();i++)
        {
            int strength=0;
            for (int j=0;j<extensions[i].length();j++)
            {
                char chr=extensions[i][j];
                if (chr>=65 and chr<=90) strength+=1;
                if (chr>=97 and chr<=122) strength-=1;
            }
            if (strength>max) 
            {
                max=strength;
                strongest=extensions[i];
            }
        }
        return class_name+'.'+strongest;
    }
    `,
    index: 1,
  },
  {
    leftCode: `
    #include <vector>
    // Given the name and module structure, this code was originally C++ built with Emscripten.
    // Some name mangling occurred as per the C++ ABI   
    int sum_squares(const std::vector<int> data) {
        int total = 0;
        int length = data.size();

        for (int i = 0; i < length; ++i) {
            int value = data.at(i);
            if (i % 3 == 0) {
                total += value * value;
            } else {
                total += value * value * value;
            }
        }

        return total;
    }
    `,
    rightCode: `
    #include<stdio.h>
    #include<string>
    #include<algorithm>
    using namespace std;
    #include<math.h>
    #include<stdlib.h>
    bool simplify(string x,string n){
        int a,b,c,d,i;
        for (i=0;i<x.size();i++)
            if (x[i]=='/') 
            {
                a=atoi(x.substr(0,i).c_str());
                b=atoi(x.substr(i+1).c_str());
            }
        for (i=0;i<n.size();i++)
            if (n[i]=='/') 
            {
                c=atoi(n.substr(0,i).c_str());
                d=atoi(n.substr(i+1).c_str());
            }
        if ((a*c)%(b*d)==0) return true;
        return false;
    }
    `,
    index: 2,
  },
  {
    leftCode: `
    #include<iostream>
    #include<cstdint>

    uint64_t special_factorial(int inputNum) {
        uint64_t targetNum = (inputNum > 0) ? inputNum + 1 : 0;
        uint64_t iterator = 1, accProduct = 1, totalProduct = 1;

        while(true){
            if(iterator == targetNum){
                break;
            }
            accProduct *= iterator;
            totalProduct *= accProduct;
            iterator++;
        }

        return totalProduct;
    }
    `,
    rightCode: `
    #include<stdio.h>
    #include<string>
    #include<algorithm>
    using namespace std;
    #include<math.h>
    #include<stdlib.h>
    string file_name_check(string file_name){
        int numdigit=0,numdot=0;
        if (file_name.length()<5) return "No";
        char w=file_name[0];
        if (w<65 or (w>90 and w<97) or w>122) return "No";
        string last=file_name.substr(file_name.length()-4,4);
        if (last!=".txt" and last!=".exe" and last!=".dll") return "No";
        for (int i=0;i<file_name.length();i++)
        {
            if (file_name[i]>=48 and file_name[i]<=57) numdigit+=1;
            if (file_name[i]=='.') numdot+=1;
        }
        if (numdigit>3 or numdot!=1) return "No";
        return "Yes"; 
    }
    `,
    index: 3,
  },
  {
    leftCode: `
    #include <stdint.h>
    bool is_equal_to_sum_even(int32_t input) {
        return ((input & 1) == 0) && (input > 7);
    }
    `,
    rightCode: `
    #include<stdio.h>
    #include<string>
    using namespace std;
    #include<algorithm>
    #include<math.h>
    #include<stdlib.h>
    string fix_spaces(string text){
        string out="";
        int spacelen=0;
        for (int i=0;i<text.length();i++)
        if (text[i]==' ') spacelen+=1;
        else
        {
            if (spacelen==1) out=out+'_';
            if (spacelen==2) out=out+"__";
            if (spacelen>2) out=out+'-';
            spacelen=0;
            out=out+text[i];
        }
        if (spacelen==1) out=out+'_';
        if (spacelen==2) out=out+"__";
        if (spacelen>2) out=out+'-';
        return out;
    }
    `,
    index: 4,
  },
]);
