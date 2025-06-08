import { apiconnecter } from "../apiconnecter";

export const createfollow = async ({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) => {
  try {
    const response = await apiconnecter(
      "POST",
      "/follow/create-follow",
      JSON.stringify({ followerId, followingId })
    );

    if (response) {
      console.log("response - ", response);
    } else {
      throw new Error("Error create Error...");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
