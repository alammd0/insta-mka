import type { ReactNode } from "react";
import SideBar from "../components/core/home/SideBar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#000000] min-h-screen flex flex-row lg:pl-40 md:pl-10 relative overflow-hidden">
      {/* 1. Side Bar */}

      <div
        className="fixed z-10 w-full bottom-[-620px]  bg-black flex justify-around items-center md:p-4 border-t border-white md:border-white  text-white 
                md:w-[15%] md:h-screen md:top-0 md:left-0 md:flex-col md:border-t-0 md:border-r"
      >
        <SideBar />
      </div>

      <div className="lg:pl-30 md:pl-10 pl-12 mx-auto pt-10">
        {children}
      </div>
    </div>
  );
}
