import { updateProfile } from "@/app/service/opreation/updateProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileModalProps {
  onClose: () => void;
}

interface profileData {
  bio: string;
  avatar: File | null;
}

export default function ProfileModalComponents({ onClose }: ProfileModalProps) {
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
              className="block mb-2 text-sm font-medium text-white tracking-[1px]"
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
      </div>
    </>
  );
}
