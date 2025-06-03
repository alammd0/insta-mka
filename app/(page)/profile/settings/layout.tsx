import TabComponents from "@/app/components/core/settings/TabComponents";
import type { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-white bg-[#000000] min-h-screen flex flex-col items-center pt-10 gap-8 pb-10">
      <div>
        <TabComponents></TabComponents>
      </div>

      <div>{children}</div>
    </div>
  );
}
