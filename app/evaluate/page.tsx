import Link from "next/link";
import React from "react";

function Page() {
  return (
    <main className="min-h-screen p-24 flex-col flex justify-center items-center">
      <div className="  h-max border-4 border-gray-200 max-w-screen-lg rounded-3xl bg-slate-300 p-6">
        <div className=" block">
          <h1>Evaluation Instruction:</h1>
          <p className="mt-2">
            Thank you very much for taking this user study! In the next 10
            questions, we want you to help us evaluate the quality of
            decompilation code, for each question please help us evaluate the
            quality of the decompilation code by choosing a score from 1 to 5,
            where 1 means the code is very bad and 5 means the code is very
            good. In the following we provide some examples to help you
            understand the meaning of each score.
          </p>
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
