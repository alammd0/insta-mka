"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#000000] h-screen flex flex-col items-center justify-center text-white">
      <main className="flex flex-col gap-10 items-center justify-center text-center">
        <h1 className="text-xl font-medium">
          Capture moments, share stories, and connect with the world — all in
          one place.
        </h1>

        <div className="flex gap-10">
          <Link  href="/login">
            <button className="text-xl hover:text-shadow-indigo-100 cursor-pointer duration-200 hover:scale-95">Login</button>
          </Link>

          <Link href="/signup">
            <button className="text-xl hover:text-shadow-indigo-100 cursor-pointer duration-200 hover:scale-95">Sign Up</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
