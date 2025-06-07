import { apiconnecter } from "../apiconnecter";

type commentData = {
  postId: string;
  comment: string;
};

export const createcomment = async ({ postId, comment }: commentData) => {
  try {
    const res = await apiconnecter(
      "POST",
      "/create-comments",
      JSON.stringify({
        postId,
        comment,
      })
    );

    if (!res) {
      throw new Error("No Response Found....");
    }

    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Error Create Comment....");
  }
};

export const getallcomment = async ({ postId }: { postId : string}) => {
  try {
    const response = await apiconnecter(
      "GET",
      `/get-all-comments?postId=${postId}`
    );

    console.log("All comments Data here -> ", response.data);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Fetching Error here in fetching comments..");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
