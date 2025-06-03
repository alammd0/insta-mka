"use client";

import { updateProfile } from "@/app/service/opreation/updateProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface ProfileModalProps {
  onClose: () => void;
}

interface profileData {
  bio: string;
  avatar: File | null;
}

export default function UpdateProfiles() {
  const router = useRouter();

  const [updateProfileData, SetProfileData] = useState<profileData>({
    bio: "",
    avatar: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      SetProfileData((prev) => ({
        ...prev,
        avatar: files[0],
      }));
    } else {
      SetProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSumbitData() {
    // e.preventDefault();
    console.log("Data : ", updateProfileData);

    try {
      const { bio, avatar } = updateProfileData;

      const resp: any = await updateProfile({
        bio,
        avatar,
      });

      console.log("response : ", resp);

      if (resp) {
        router.push("/home");
      } else {
        throw new Error(
          resp?.message || "Something went wrong while updating the profile."
        );
      }
    } catch (err) {
      console.error("Update profile error:", err);
    }

    // Clear form after submit
    SetProfileData({
      bio: "",
      avatar: null,
    });
  }

  return (
    <>
      <div className="bg-[#2d2b2b] md:w-[65vh] rounded-xl flex flex-col pb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSumbitData();
          }}
           className="flex flex-col gap-6 p-6 rounded-lg w-[100%] max-w-md"
        >
          <div>
            <label
              htmlFor="default_size"
            >
              Upload Image for Pic
            </label>
            <input
              className="block px-2 py-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
              id="default_size"
              accept="image/*"
              onChange={handleChange}
              name="avatar"
              type="file"
            />
          </div>

          <div>
            <label
              htmlFor="default-input"
            >
              Write Small Bio
            </label>
            <input
              type="text"
              id="default-input"
              placeholder="Enter your username"
              onChange={handleChange}
              name="bio"
              value={updateProfileData.bio}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-fuchsia-600 px-4 py-2 text-white transition hover:bg-fuchsia-700"
          >
            Update Profile
          </button>
        </form>

         <button className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold mt-4 w-[40%] mx-auto">
            <Link href="/home">
                Go to Home
            </Link>
        </button>
        
      </div>
    </>
  );
}
