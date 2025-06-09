"use client";

import { getPost } from "@/app/service/opreation/postAPI";
import { useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { createLike, deleteLike } from "@/app/service/opreation/likesAPI";
import CreateCommentModal from "../modals/CommentModal";
import { formatDate } from "@/app/utils/data";
import {
  createfollow,
  fetchfollowing,
  unfollow,
} from "@/app/service/opreation/followAPI";
import { toast } from "react-toastify";

interface Profile {
  avatar: string;
}

interface User {
  id: string;
  username: string;
  name: string;
  profile: Profile;
}

interface Like {
  userId: string;
}

interface post {
  id: string;
  title: string;
  image: string;
  likes: Like[];
  user: User;
  name: string;
  description: string;
  comments: string;
  createdAt: string;
}

export default function Maincontent() {
  const [postDetails, setPostDetails] = useState<post[]>([]);
  const [liked, setLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  const user = useSelector((state: RootState) => state.auth.user);

  const [CommentModal, SetCommentModal] = useState(false);
  const [selectedPostId, SetSelectedPostId] = useState<string | null>(null);

  const openCommentModals = (postId: string) => {
    SetSelectedPostId(postId);
    SetCommentModal(true);
  };

  const closeCommentModals = () => {
    SetCommentModal(false);
  };

  //  @ts-ignore
  // console.log("user inside maincontent : ", user?.id);

  // @ts-ignore
  const userId = user?.id;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getPost();
        if (res) {
          setPostDetails(res.data);

          const posts = res.data;
          const likesMap: { [key: string]: boolean } = {};
          posts.forEach((post: post) => {
            likesMap[post.id] = post.likes.some(
              (like: Like) => like.userId === userId
            );
          });

          setLikedPosts(likesMap);
        } else {
          throw new Error("No Data Found");
        }
      } catch (err) {
        throw new Error("Error inside mainContent");
      }
    };

    getPosts();
  }, [userId]);

  const handleLikedPost = async (postId: string) => {
    const isLiked = likedPosts[postId];

    console.log("Post ID : ", postId);
    console.log("Is Liked : ", isLiked);

    try {
      if (isLiked) {
        // Logic to unlike the post
        const response = await deleteLike(postId);
        // console.log("Unlike Response : ", response);
      } else {
        // Logic to like the post
        const response = await createLike(postId);

        // console.log("Like Response : ", response);
      }

      setLikedPosts((prevLikes) => ({
        ...prevLikes,
        [postId]: !prevLikes[postId],
      }));

      setPostDetails((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.includes(userId)
                  ? post.likes.filter((id) => id !== userId)
                  : [...post.likes, userId],
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking or unliking post:", err);
      throw new Error("Error liking or unliking post");
    }
  };

  // console.log("post Details : ", postDetails);

  const formatedPostData = postDetails.map((date) => {
    return formatDate(date.createdAt);
  });

  const [followedUsers, setFollowedUsers] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFollow = async (postUserId: string) => {
    try {
      const isFollowing = followedUsers[postUserId];

      if (isFollowing) {
        // Unfollow logic
        await unfollow({ followerId: userId, followingId: postUserId });
        toast.success("Unfollow sucess");
      } else {
        // Follow logic
        await createfollow({ followerId: userId, followingId: postUserId });
        toast.success("follow sucess");
      }

      // Optimistic UI update
      setFollowedUsers((prev) => ({
        ...prev,
        [postUserId]: !isFollowing,
      }));
    } catch (err) {
      console.log(err);
      toast.error("Error while unfollow and follow");
    }
  };

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const res = await fetchfollowing();

        if (res && Array.isArray(res.data)) {
          // Convert array of users to a map
          const followingMap = Object.fromEntries(
            res.data.map((f: { followingId: string }) => [f.followingId, true])
          );

          setFollowedUsers(followingMap);
        } else {
          throw new Error("Error fetching followers");
        }
      } catch (err) {
        console.error("Error fetching followed users:", err);
      }
    };

    fetchFollowedUsers();
  }, [userId]);

  return (
    <div className="md:flex md:flex-col gap-6 md:justify-center">
      {postDetails.map((post, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            {post.user.profile === null ? (
              <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="text-[8px] text-gray-600 dark:text-gray-300 capitalize">
                  {post.user.name[0]}
                </span>
              </div>
            ) : (
              <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="text-[8px] text-gray-600 dark:text-gray-300 capitalize">
                  <img src={post.user.profile.avatar} alt={post.user.name[0]} />
                </span>
              </div>
            )}

            <div className="capitalize text-[16px] flex gap-4">
              <p>{post.user.name}</p>

              <button
                onClick={() => handleFollow(post.user.id)}
                className={`text-xl font-bold ${
                  followedUsers[post.user.id]
                    ? "text-green-600"
                    : "text-blue-500"
                }`}
              >
                {followedUsers[post.user.id] ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Image section */}
            <div className="h-[480px] w-[400px] border-1 border-b-blue-300 rounded-sm">
              <img
                src={post.image}
                className="h-[100%] w-[100%] rounded-sm"
                alt={post.title}
              />
            </div>

            {/* like, comment, share icons*/}
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center justify-center">
                <div
                  className={
                    !likedPosts[post.id]
                      ? "text-3xl font-semibold cursor-pointer"
                      : "text-red-800 text-3xl font-semibold cursor-pointer"
                  }
                  onClick={() => handleLikedPost(post.id)}
                >
                  {likedPosts[post.id] ? <GoHeartFill /> : <FiHeart />}
                </div>

                <div
                  className="text-3xl font-semibold cursor-pointer"
                  onClick={() => openCommentModals(post.id)}
                >
                  <FaRegComment />
                </div>
              </div>

              <div>
                <p className="text-[14px]">{formatedPostData[0]}</p>
              </div>
            </div>

            {/* count likes */}
            <div className="text-[16px]">{post.likes.length} likes</div>

            {/* title, description */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <p className=" capitalize">{post.user.name}</p>
                <p className="text-[14px]">{post.title}</p>
              </div>
              <div className="text-[14px]">{post.description}</div>
            </div>

            {/* view all comment, comment input */}
            <div>
              <button>Veiw all {post.comments.length} comments</button>
            </div>
          </div>
        </div>
      ))}

      {CommentModal && (
        <div>
          <CreateCommentModal
            onclose={closeCommentModals}
            postId={selectedPostId ?? ""}
          ></CreateCommentModal>
        </div>
      )}
    </div>
  );
}
