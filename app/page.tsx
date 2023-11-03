"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
export default function Home() {
  const [id, setId] = useState("");
  const router = useRouter();
  return (
    <main className="min-h-screen p-24 flex justify-center items-center">
      <div className="h-max w-fit ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
          input test id:
        </label>
        <input
          type="text"
          onChange={(e) => {
            setId(e.target.value);
          }}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1001"
          required
        />
      </div>
      <div
        onClick={async () => {
          const response = await fetch(`/api/login?id=${id}`);
          if (!response.ok) {
            alert("wrong id");
          } else {
            router.push("/evaluate/examples");
          }
        }}
      >
        <BsFillArrowRightCircleFill className="h-8 w-8 mt-7 ml-2 cursor-pointer" />
      </div>
    </main>
  );
}
