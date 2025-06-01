"use client";

import { getPost } from "@/app/service/opreation/postAPI";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";

interface Profile {
  avatar: string;
}

interface User {
  name: string;
  profile: Profile;
  // add other user properties if needed
}

interface post {
  title: string;
  image: string;
  likes: string;
  user: User;
  name: string;
  description: string;
  comments: string;
}

export default function Maincontent() {
  const [postDetails, setPostDetails] = useState<post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getPost();
        if (res) {
          setPostDetails(res.data);
        } else {
          throw new Error("No Data Found");
        }
      } catch (err) {
        throw new Error("Error inside mainContent");
      }
    };

    getPosts();
  }, []);

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
              <div className="text-3xl font-semibold">
                {" "}
                {/* <GoHeart /> */}
                <FiHeart />
              </div>

              <div className="text-3xl font-semibold">
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
    </div>
  );
}
