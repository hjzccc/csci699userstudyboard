import Link from "next/link";
import React from "react";

function Page() {
  const insturctions = `
  Thank you for taking this study!!
  We are interested in how you evaluate our decompiling approaches.
  Please read the following instructions carefully.
  You will be presented with 10 test sets.
  For each test set, you will be asked to evaluate the approaches based on two criteria: functionality and similarity.
  For functionality, you will be asked to answer 3 questions for two different code samples, make sure you will answer the questions solely based on the current given code.
  For similarity, you will be given the two different code versions and asked to choose which one is more similar to the original code sample.
  Before you finish the functionality evaluation, you will not be able to see the similarity evaluation.
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
