import { updateProfile } from "@/app/service/opreation/updateProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileModalProps {
  onClose: () => void;
}

export default function MoreModal({ onClose }: ProfileModalProps) {

    const router = useRouter();

    function logoutHandle() {
        console.log("Logout clicked");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        onClose();
    }

  return (
    <>
      {/* Background Overlay with Blur */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-2xl border-2 border-fuchsia-500 bg-[#262626] p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-xl hover:text-fuchsia-400"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4">
          <button className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold" onClick={logoutHandle}>Log Out</button>

          <button onClick={onClose} className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold">
            <Link href="/profile/settings/account">Settings</Link>
          </button>
        </div>
      </div>
    </>
  );
}
