"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function Page() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="flex justify-center items-center  min-h-screen">
      <Toaster />
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        id="first_name"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="password here"
        required
      />
      <div
        onClick={async () => {
          const response = await fetch(`/api/admin/login?password=${password}`);
          if (!response.ok) {
            alert("wrong pass");
          } else {
            toast.success("Login success");
            router.push("/admin");
          }
        }}
      >
        <BsFillArrowRightCircleFill className="h-8 w-8 mt-7 ml-2 cursor-pointer" />
      </div>
    </div>
  );
}

export default Page;
