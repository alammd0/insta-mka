"use client";

import { updateUser } from "@/app/service/opreation/authAPI";
import { updateProfile } from "@/app/service/opreation/updateProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ProfileModalProps {
  onClose: () => void;
}

interface profileData {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export default function UserUpdateModal({ onClose }: ProfileModalProps) {
  const router = useRouter();

  const dispatch = useDispatch();

  const [updateProfileData, SetProfileData] = useState<profileData>({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    SetProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSumbitData() {
    console.log("Data : ", updateProfileData);

    try {
      const response = await updateUser(updateProfileData, dispatch);

      console.log("response : ", response);
      if (response) {
        router.push("/home");
      } else {
        throw new Error(
          response?.message ||
            "Something went wrong while updating the profile."
        );
      }
    } catch (err) {
      console.error("Update profile error:", err);
      // Optional: Show an error message to the user
      alert(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
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

        <form
          className="space-y-6 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSumbitData();
          }}
        >
          <div>
            <label
              className="block mb-2 text-sm font-medium text-white tracking-[1px]"
              htmlFor="name"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter Update Name"
              onChange={handleChange}
              name="name"
              value={updateProfileData.name}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white tracking-[1px]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Update email"
              onChange={handleChange}
              name="email"
              value={updateProfileData.email}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white tracking-[1px]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Update username"
              onChange={handleChange}
              name="username"
              value={updateProfileData.username}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-white tracking-[1px]"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Update Phone Number"
              onChange={handleChange}
              name="phone"
              value={updateProfileData.phone}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-fuchsia-600 px-4 py-2 text-white transition hover:bg-fuchsia-700"
          >
            Update User Details
          </button>
        </form>
      </div>
    </>
  );
}
