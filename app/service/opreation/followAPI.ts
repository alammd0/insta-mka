import { toast } from "react-toastify";
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

export const unfollow = async ({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) => {
  try {
    const response = await apiconnecter(
      "DELETE",
      "/follow/delete-follo",
      JSON.stringify({ followerId, followingId })
    );

    if (response) {
      toast.success("Unfollow Succes");
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchfollowing = async () => {
  try {
    const response = await apiconnecter("GET", "/follow/get-follow");

    if (response) {
      return response;
    } else {
      throw new Error("Error while fetching following");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
