import { toast } from "react-toastify";
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
    
    toast.success("Post Like")
    return response;
  } catch (err) {
    console.log("Error Creating Like : ", err);
    toast.error("Post like error")
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

    toast.success("Post unlike");
    return response;
  } catch (err) {
    console.log("Error Deleting Like : ", err);
    toast.error("Post unlike error")
    throw new Error("Error Deleting Like");
  }
};
