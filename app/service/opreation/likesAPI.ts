import { apiconnecter } from "../apiconnecter";

export const createLike = async (postId: string) => {
  try {
    const response = await apiconnecter(
      "POST",
      "/like/create-likes",
      JSON.stringify({ postId })
    );

    if (!response) {
      throw new Error("No response from server");
    }

    return response;
  } catch (err) {
    console.log("Error Creating Like : ", err);
    throw new Error("Error Creating Like");
  }
};

export const deleteLike = async (postId: string) => {
  try {
    const response = await apiconnecter(
      "DELETE",
      "/like/unlike-post",
      JSON.stringify({ postId })
    );

    if (!response) {
      throw new Error("No response from server");
    }

    return response;
  } catch (err) {
    console.log("Error Deleting Like : ", err);
    throw new Error("Error Deleting Like");
  }
};
