import type { ReactNode } from "react";
import SideBar from "../components/core/home/SideBar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#000000] min-h-screen flex flex-row ustify-between pl-40 relative">
      {/* 1. Side Bar */}
      <div className="p-4 border-r-1 border-r-white fixed h-screen top-0 left-0 z-10">
        <SideBar />
      </div>

      <div className="mx-auto flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
