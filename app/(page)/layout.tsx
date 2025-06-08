import type { ReactNode } from "react";
import SideBar from "../components/core/home/SideBar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#000000] min-h-screen flex flex-row lg:pl-40 md:pl-10 relative overflow-hidden">
      {/* 1. Side Bar */}
      <div className="w-[15%] hidden lg:flex p-4 border-r-1 border-r-white fixed h-screen top-0 left-0 z-10">
        <SideBar />
      </div>

      <div className="lg:pl-30 md:pl-10 mx-auto flex justify-center pt-14">
        {children}
      </div>
    </div>
  );
}
