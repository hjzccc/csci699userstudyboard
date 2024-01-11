"use client";
import FunctionalityEval from "@/components/functionalityEval";
import Question from "@/components/question";
import SummaryEval from "@/components/summaryEval";
import { CodeExample } from "@/types";
import { Tour, TourProps } from "antd";
import { get } from "http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, use, useMemo, useRef, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import useSWRImmutable from "swr/immutable";

export default function CodeSamplePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [tabName, setTabName] = useState("Summary");
  const examples: (CodeExample & {
    summaryEval: {
      generated: {
        rate: number;
      }[];
    };
  })[] = [
    {
      readabilityEval: {
        id: "-1",
        codeSamples: [
          {
            title: "wasm2c",
            content: `
u32 w2c__has_close_elements0x28std0x3A0x3A_0x5F20x3A0x3Avector0x3Cfloat0x2C0x20std0x3A0x3A_0x5F20x3A0x3Aallocator0x3Cfloat0x3E0x3E0x2C0x20float0x29(w2c_* instance, u32 var_p0, f32 var_p1) {
  u32 var_l2 = 0, var_l3 = 0, var_l4 = 0, var_l5 = 0, var_l6 = 0, var_l7 = 0;
  FUNC_PROLOGUE;
  u32 var_i0, var_i1, var_i2;
  f32 var_f0, var_f1;
  var_i0 = var_p0;
  var_i0 = i32_load(instance->w2c_env_memory, (u64)(var_i0) + 4u);
  var_i1 = var_p0;
  var_i1 = i32_load(instance->w2c_env_memory, (u64)(var_i1));
  var_l4 = var_i1;
  var_i0 -= var_i1;
  var_i1 = 2u;
  var_i0 = (u32)((s32)var_i0 >> (var_i1 & 31));
  var_l3 = var_i0;
  var_L0: 
    var_i0 = var_l2;
    var_i1 = var_l3;
    var_i0 = var_i0 != var_i1;
    if (var_i0) {
      var_i0 = var_l4;
      var_i1 = var_l2;
      var_i2 = 2u;
      var_i1 <<= (var_i2 & 31);
      var_i0 += var_i1;
      var_l5 = var_i0;
      var_i0 = var_l2;
      var_i1 = 1u;
      var_i0 += var_i1;
      var_l6 = var_i0;
      var_p0 = var_i0;
      var_L2: 
        var_i0 = var_p0;
        var_i1 = var_l3;
        var_i0 = var_i0 == var_i1;
        if (var_i0) {
          var_i0 = var_l6;
          var_l2 = var_i0;
          goto var_L0;
        }
        var_i0 = var_p0;
        var_i1 = 2u;
        var_i0 <<= (var_i1 & 31);
        var_l7 = var_i0;
        var_i0 = var_p0;
        var_i1 = 1u;
        var_i0 += var_i1;
        var_p0 = var_i0;
        var_i0 = var_l5;
        var_f0 = f32_load(instance->w2c_env_memory, (u64)(var_i0));
        var_i1 = var_l4;
        var_i2 = var_l7;
        var_i1 += var_i2;
        var_f1 = f32_load(instance->w2c_env_memory, (u64)(var_i1));
        var_f0 -= var_f1;
        var_f0 = wasm_fabsf(var_f0);
        var_f1 = var_p1;
        var_i0 = var_f0 < var_f1;
        var_i0 = !(var_i0);
        if (var_i0) {goto var_L2;}
    }
  var_i0 = var_l2;
  var_i1 = var_l3;
  var_i0 = var_i0 < var_i1;
  FUNC_EPILOGUE;
  return var_i0;
}
        `,
          },
          {
            title: "our approach",
            content: `
#include <algorithm>
#include <stdlib.h>
// has_close_elements

#include <vector>
#include <cmath> // For std::abs

extern "C" {

bool has_close_elements(const std::vector<float>& vec, float threshold) {
    const size_t size = vec.size(); // get the number of elements in the vector
    // Outer loop: Iterate through each element in the vector
    for (size_t i = 0; i < size; ++i) {
        // Inner loop: Compare the current element with the rest of the elements
        for (size_t j = i + 1; j < size; ++j) {
            // Calculate the absolute difference between the elements
            if (std::abs(vec[i] - vec[j]) < threshold) {
                return true; // Return true if elements are close
            }
        }
    }
    // Return false if no close elements are found
    return false;
}

} // extern "C"
          `,
          },
        ],
      },
      functionalityEval: {
        id: "-1",
        codeText: `
#include <algorithm>
#include <stdlib.h>
// has_close_elements

#include <vector>
#include <cmath> // For std::abs

extern "C" {

bool has_close_elements(const std::vector<float>& vec, float threshold) {
    const size_t size = vec.size(); // get the number of elements in the vector
    // Outer loop: Iterate through each element in the vector
    for (size_t i = 0; i < size; ++i) {
        // Inner loop: Compare the current element with the rest of the elements
        for (size_t j = i + 1; j < size; ++j) {
            // Calculate the absolute difference between the elements
            if (std::abs(vec[i] - vec[j]) < threshold) {
                return true; // Return true if elements are close
            }
        }
    }
    // Return false if no close elements are found
    return false;
}

} // extern "C"
`,

        problems: [
          {
            title: "When will the model exit and return true?",
            choices: [
              "When the value of an element in the vector exceeds the threshold value",
              "When the vector is empty",
              "When two elements are found to have a difference smaller than the threshold value.",
            ],
          },
          {
            title: "When will the model return false?",
            choices: [
              "When both indexes i and j come to the end of the vector",
              "When there are two elements in the vector have a difference exceed the threshold value",
            ],
          },
          {
            title: " What does i and j mean in the context of the code?",
            choices: [
              "j = i + 1, and i is the index of the iteration",
              "Both of them are indexes, and j can be any number larger than i and less than array size",
              "i,j are independent and should not depend on each other",
            ],
          },
        ],
      },
      summaryEval: {
        id: "-1",
        groundTruth: `Check if in given vector of numbers, are any two numbers closer to each other than given threshold.
>>> has_close_elements({1.0, 2.0, 3.0}, 0.5)
false
>>> has_close_elements({1.0, 2.8, 3.0, 4.0, 5.0, 2.0}, 0.3)
true
        `,
        generated: [
          {
            text: `
The Wasm function seems to check a given float vector (starts at memory address \`start_address\`) to see if it contains close elements based on a threshold (\`threshold\`).
            
A score of 3 can be given because it is able to identify the function aims to “see if it contains close elements based on a threshold,” which is a paraphrase of “if any two numbers closer to each other than the given threshold”          
                    `,
            rate: 3,
            title: "Summary 1",
          },
          {
            text: `
The main function, $func1, takes an i32 and a f32 as parameters and returns an i32. It involves complex arithmetic and looping operations. The function appears to be performing a comparison and manipulation of floating-point values, possibly iterating over a data structure in memory. It includes conditionals and branching, indicating some form of decision-making process based on the input and computed values. 
            
A score of 1 can be given because it only identifies the low-level operations of the function (comparison, manipulation of floats) but not the high-level functionality, i.e. comparing the difference between two elements with a threshold value.
                    `,
            rate: 1,
            title: "Summary 2",
          },
        ],
      },
    },
  ];
  const sideBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const summarySectionRef = useRef(null);
  const [tourOpen, setTourOpen] = useState(true);
  const [summaryTour, setSummaryTour] = useState(false);
  const [readabilityTour, setReadabilityTour] = useState(false);
  const [functionalityTour, setFunctionalityTour] = useState(false);
  const currentExample = examples[0];
  const steps: TourProps["steps"] = [
    {
      title: "Switch and Submit",
      description:
        "Click on the button to switch between samples and submit when all samples are finished.",
      placement: "right",
      target: () => sideBarRef.current,
    },
    {
      title: "Switch Sections",
      description:
        "You will evaluate the the code summary, code readability and code functionality. Click on the buttons to switch between sections.",
      placement: "top",
      target: () => bottomBarRef.current,
    },
    {
      title: "Get Started!",
      description: "Now lets click the first section and see how it works",
      placement: "top",
      target: () => summarySectionRef.current,
    },
  ];
  return (
    <>
      <Tour
        steps={steps}
        open={tourOpen}
        onClose={() => setTourOpen(false)}
      ></Tour>
      <div className="relative flex justify-start w-full h-screen">
        <div
          ref={sideBarRef}
          className="w-24 bg-slate-800 flex flex-none flex-col"
        >
          {examples.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex((preIndex) => index);
              }}
              className="w-full min-h-[96px] flex justify-center items-center text-white hover:bg-slate-700 border-b border-slate-700"
            >
              {/* {scores[index]?.score != 0 ? (
                <AiFillCheckCircle className=" fill-green-600" />
              ) : ( */}
              {index}
              {/* )} */}
            </button>
          ))}
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm p-2.5 text-center m-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={async () => {
              router.push("/evaluate/evaluation");
            }}
          >
            Proceed to Evaluation
          </button>
        </div>
        <div className="flex w-[90%] flex-1 flex-col">
          <div className="overflow-auto">
            <div className={`${tabName != "Summary" ? "hidden" : ""}`}>
              <SummaryEval
                tourOpen={summaryTour}
                groundTruth={currentExample.summaryEval.groundTruth}
                generatedSummaries={currentExample.summaryEval.generated.map(
                  (value) => value.text
                )}
                rates={currentExample.summaryEval.generated.map((value) => ({
                  summary: value.text,
                  //@ts-ignore
                  rate: value.rate,
                }))}
              ></SummaryEval>
            </div>
            <div className={`${tabName != "Readability" ? "hidden" : ""}`}>
              <Question
                tourOpen={readabilityTour}
                codeSamples={currentExample.readabilityEval.codeSamples}
                // sourceCode={currentExample.sourceCode}
                onChange={(values) => {
                  localStorage.setItem("results", JSON.stringify(values));
                }}
                initialHint={currentExample.initialHint}
              ></Question>
            </div>
            <div className={`${tabName != "Functionality" ? "hidden" : ""}`}>
              <FunctionalityEval
                tourOpen={functionalityTour}
                problems={currentExample.functionalityEval.problems}
                codeText={currentExample.functionalityEval.codeText}
              ></FunctionalityEval>
            </div>
          </div>
          <div
            className="mt-auto h-12 w-full bottom-0 bg-slate-800 flex"
            ref={bottomBarRef}
          >
            <button
              ref={summarySectionRef}
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Summary");
                setSummaryTour(true);
                setTourOpen(false);
              }}
            >
              Summary
            </button>
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Readability");
                setReadabilityTour(true);
                setTourOpen(false);
              }}
            >
              Readability
            </button>
            <button
              className="flex-1 text-center p-3 hover:bg-slate-700 text-white"
              onClick={() => {
                setTabName("Functionality");
                setFunctionalityTour(true);
                setTourOpen(false);
              }}
            >
              Functionality
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
