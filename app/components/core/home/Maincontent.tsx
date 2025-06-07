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
  // add other properties if needed
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
  console.log("user inside maincontent : ", user?.id);

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
        console.log("Unlike Response : ", response);
      } else {
        // Logic to like the post
        const response = await createLike(postId);

        console.log("Like Response : ", response);
      }

      setLikedPosts((prevLikes) => ({
        ...prevLikes,
        [postId]: !prevLikes[postId],
      }));

      // setPostDetails((prev) =>
      //   prev.map((post) =>
      //     post.id === postId
      //       ? {
      //           ...post,
      //           likes: post.likes.includes(userId)
      //             ? post.likes.filter((id) => id !== userId) // remove like
      //             : [...post.likes, userId], // add like
      //         }
      //       : post
      //   )
      // );

      setPostDetails((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.includes(userId)
                  ? post.likes.filter((id) => id !== userId) // Unlike: remove userId
                  : [...post.likes, userId], // Like: add userId
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking or unliking post:", err);
      throw new Error("Error liking or unliking post");
    }
  };

  console.log("post Details : ", postDetails);

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
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

            <div className=" capitalize text-[16px] cursor-pointer">
              {post.user.name}
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
            <div className="flex items-center gap-5">
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

              <div className="text-3xl font-semibold">
                <BsSend />
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
