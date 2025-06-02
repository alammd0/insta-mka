import type { ReactNode } from "react";
import SideBar from "../components/core/home/SideBar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#000000] flex flex-row gap-20 relative">
      {/* 1. Side Bar */}
      <div className="w-[15%] p-4 border-r-1 border-r-white">
        <SideBar />
      </div>

      <div className="w-[80%] mx-auto flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
