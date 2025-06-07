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
        comment
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
