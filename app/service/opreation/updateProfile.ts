import { apiconnecter } from "../apiconnecter";

interface profileData {
  bio: string;
  avatar: File | null;
}

export const updateProfile = async ({ bio, avatar }: profileData) => {
  try {
    const formData = new FormData();
    formData.append("bio", bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const response = await apiconnecter(
      "POST",
      "profile/update-profile",
      formData
    );

    if (!response) {
      throw new Error("No profile data received.");
    }

    return response; // ✅ important
  } catch (err) {
    console.error("Update profile error:", err); // ✅ show actual error
    throw err; // rethrow to be caught in component
  }
};
