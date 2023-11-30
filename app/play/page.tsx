"use client";
import hljs from "highlight.js";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
function Page() {
  const codeSequence = `
    #include<iostream>
    #include<cstdint>

        uint64_special_factorial(int inputNum) {
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
    }`;
  const codehighlited = hljs.highlight(codeSequence, { language: "cpp" }).value;
  const processCode = (code: string) => {
    // Define your custom highlighting logic here
    // For example, let's say we want to highlight the word "int" in the code
    const highlightedWords = ["int"]; // Words to highlight
    const regex = new RegExp(`\\b(${highlightedWords.join("|")})\\b`, "g");

    // Split the code into parts and wrap matches with a span
    const processedCode = code.split(regex).map((part, index) =>
      highlightedWords.includes(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );

    return processedCode;
  };

  return (
    <pre className="flex">
      <code dangerouslySetInnerHTML={{ __html: codehighlited }}></code>
    </pre>
  );
}

export default Page;
