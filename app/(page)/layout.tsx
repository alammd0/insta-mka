import type { ReactNode } from "react";
import SideBar from "../components/core/home/SideBar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#000000] min-h-screen flex flex-row pl-40 relative">
      {/* 1. Side Bar */}
      <div className="w-[15%] p-4 border-r-1 border-r-white fixed h-screen top-0 left-0 z-10">
        <SideBar />
      </div>

      <div className="pl-30 mx-auto flex justify-center pt-14">
        {children}
      </div>
    </div>
  );
}
