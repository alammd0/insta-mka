"use client";

import Link from "next/link";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  // handle login and signup logic here
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setuserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(userData);
  }

  return (
    <div className="border-1 px-8 py-10 h-full flex flex-col gap-5 rounded-xl">
      <h2 className=" text-center font-bold text-4xl uppercase italic px-2 py-3">
        Insta mka
      </h2>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="text-[14px] font-normal text-gray-300"
            htmlFor="email"
          >
            Email & Username <sup className=" text-red-400">*</sup>{" "}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email or Username"
            value={userData.email}
            onChange={handleChange}
            required
            className="border-1 w-full text-gray-100 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-[14px] font-normal text-gray-300"
            htmlFor="password"
          >
            Password <sup className=" text-red-400">*</sup>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={userData.password}
            onChange={handleChange}
            className="border-1 w-full text-gray-100 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          className="bg-[#0069AD] p-1 rounded-xl text-[16px]"
          type="submit"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 text-gray-300">
        <div className="bg-white h-[1px] w-[40%]"></div>
        <div>Or</div>
        <div className="bg-white h-[1px] w-[40%]"></div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
        <p>Don't have an Account? </p>
        <Link href="/signup">
          <button className="text-[#0069AD] text-[16px] hover:text-blue-500 cursor-pointer duration-200 hover:scale-95">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
