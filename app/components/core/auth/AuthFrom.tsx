"use client";

import { signin, signup } from "@/app/service/opreation/authAPI";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import HomeSkeleton from "../../common/skeleton/HomeSkeleton";
import { toast  } from "react-toastify"

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    phone: "",
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (type === "login") {
      setLoading(true);
      const { email, password } = userData;
      const res = await signin({ email, password }, dispatch);
      setLoading(false);
      if (res?.error) {
        console.error("Login Error:", res.error);
        toast.error("Invalid email or password");
      } else {
        // console.log("User logged in successfully:", res);
        toast.success("User Login Success");
        redirect("/home");
      }
    } else {
      setLoading(true);
      const { email, password, name, username, phone } = userData;
      const res = await signup(
        { email, password, name, phone, username },
        dispatch
      );
      setLoading(false);
      if (res?.error) {
        console.error("Signup Error:", res.error);
        // Optional: show error message to user
        toast.error("Invalid credentials");
      } else {
        // console.log("User signed up successfully:", res);
        toast.success("Signup success Please Login");
        router.push("/login");
      }
    }

    // Optional: Reset form only on error
    setUserData({
      email: "",
      password: "",
      name: "",
      username: "",
      phone: "",
    });
  }

  if (loading) {
    return <HomeSkeleton />;
  } else {
    return (
      <div className="border-1 px-8 py-6 h-full flex flex-col gap-5 rounded-xl">
        <h2 className="text-center font-bold text-4xl uppercase italic px-2 py-3">
          Insta mka
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-[14px] font-normal text-gray-300"
              htmlFor="email"
            >
              Email: <sup className="text-red-400">*</sup>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
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
              Password <sup className="text-red-400">*</sup>
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

          {type === "signup" && (
            <>
              <div>
                <label
                  className="text-[14px] font-normal text-gray-300"
                  htmlFor="name"
                >
                  Full Name <sup className="text-red-400">*</sup>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                  className="border-1 w-full text-gray-100 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  className="text-[14px] font-normal text-gray-300"
                  htmlFor="username"
                >
                  Username <sup className="text-red-400">*</sup>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                  className="border-1 w-full text-gray-100 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  className="text-[14px] font-normal text-gray-300"
                  htmlFor="phone"
                >
                  Phone Number <sup className="text-red-400">*</sup>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                  className="border-1 w-full text-gray-100 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          <button
            disabled={loading}
            className={`bg-[#0069AD] p-1 rounded-xl text-[16px] text-white font-semibold hover:bg-blue-500 duration-200 hover:scale-95 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {loading ? "Processing..." : type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-gray-300">
          <div className="bg-white h-[1px] w-[40%]"></div>
          <div>Or</div>
          <div className="bg-white h-[1px] w-[40%]"></div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <p>
            {type === "login" ? "Don't have an account?" : "I have an account?"}
          </p>
          <Link href={type === "login" ? "/signup" : "/login"}>
            <button className="text-[#0069AD] text-[16px] hover:text-blue-500 cursor-pointer duration-200 hover:scale-95">
              {type === "login" ? "Signup" : "Login"}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
