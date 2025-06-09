import TabComponents from "@/app/components/core/settings/TabComponents";
import type { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-white bg-[#000000] min-h-screen flex flex-col justify-center items-center md:pt-10 gap-8 pb-10">
      <div>
        <TabComponents></TabComponents>
      </div>

      <div className="pr-10">{children}</div>
    </div>
  );
}
