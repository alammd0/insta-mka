"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const tabData = [
  { label: "Account", path: "/profile/settings/account" },
  { label: "Edit Profile", path: "/profile/settings/edit-profile" },
  { label: "Update Profile", path: "/profile/settings/update-profile" },
  { label: "Change Password", path: "/profile/settings/change-password" },
];

export default function TabComponents() {
  const pathname = usePathname();

  return (

      <div className=" w-[100vh] flex justify-between max-w-4xl p-4 gap-10 bg-[#262626] border-b-2 border-fuchsia-500 rounded-tr-2xl rounded-tl-2xl rounded-br-xl rounded-bl-xl">
        {tabData.map((tab, index) => {
          const isActive = pathname.startsWith(tab.path);

          return (
            <div key={index}>
              <Link
                href={tab.path}
                className={`text-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-fuchsia-500 underline"
                    : "text-white hover:text-fuchsia-500"
                }`}
              >
                {tab.label}
              </Link>
            </div>
          );
        })}
      </div>
  );
}
