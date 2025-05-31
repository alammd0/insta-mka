import type { ReactNode } from "react";
import SideBar from "../components/core/home/SideBar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-[#000000] gap-32">
      {/* 1. Side Bar */}
      <div className="w-1/5 p-4 border-r-1 border-r-white">
        <SideBar />
      </div>
      <div className="p-4 border">{children}</div>
    </div>
  );
}
