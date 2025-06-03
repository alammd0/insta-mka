"use client";

import { updateUser } from "@/app/service/opreation/authAPI";
import { updateProfile } from "@/app/service/opreation/updateProfile";
import Link from "next/link";
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

export default function EditProfile() {
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
      <div className="bg-[#2d2b2b] md:w-[65vh] rounded-xl flex flex-col pb-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSumbitData();
          }}

          className="flex flex-col gap-6 p-6 rounded-lg w-[100%] max-w-md"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              placeholder="Enter Update Name"
              onChange={handleChange}
              name="name"
              className="w-[100%] rounded-lg bg-[#3a3a3a] px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={updateProfileData.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Update email"
              onChange={handleChange}
              name="email"
              className="w-[100%] rounded-lg bg-[#3a3a3a] px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={updateProfileData.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Update username"
              onChange={handleChange}
              className="w-[100%] rounded-lg bg-[#3a3a3a] px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              name="username"
              value={updateProfileData.username}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              className="w-[100%] rounded-lg bg-[#3a3a3a] px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter Update Phone Number"
              onChange={handleChange}
              name="phone"
              value={updateProfileData.phone}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-fuchsia-600 px-4 py-2 text-white transition hover:bg-fuchsia-700"
          >
            Update User Details
          </button>

        </form>

        <button className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold mt-4 w-[40%] mx-auto">
            <Link href="/profile">
                Go to Profile
            </Link>
        </button>
      </div>
    </>
  );
}
