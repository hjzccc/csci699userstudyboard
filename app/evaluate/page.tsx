import Link from "next/link";
import React from "react";

function Page() {
  const insturctions = `
  Thank you for taking this user study! 

  There are a total of 3 question sets in this study, and each will have questions evaluating three aspects of the code.
  Three Objectives:
  1.Assess the readability of the decompiled code
  2.Whether the process preserves the functionality of the code 
  3.Obtain human judgment on the model generated summary

  `;
  return (
    <main className="min-h-screen p-24 flex-col flex justify-center items-center">
      <div className="  h-max border-4 border-gray-200 max-w-screen-lg rounded-3xl bg-slate-300 p-6">
        <div className=" block">
          <h1>Evaluation Instruction:</h1>
          <pre className="mt-2 break-word whitespace-pre-line">
            {insturctions}
          </pre>
        </div>
      </div>
      <Link
        href="/evaluate/examples"
        className="text-white w-1/2 mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Gotcha! Lets see those examples!
      </Link>
    </main>
  );
}

export default Page;
