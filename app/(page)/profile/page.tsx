"use client";

import { RootState } from "@/app/lib/store";
import { getuser } from "@/app/service/opreation/authAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { IoMdGrid } from "react-icons/io";
import { SlCamera } from "react-icons/sl";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const username = user?.username;

  const token = useSelector((state: RootState) => state.auth.token);
  // console.log("token inside: ", token);

  interface UserDetail {
    profile?: string;
    name?: string;
    username?: string;
    posts: [];
    followers: [];
    following: [];
  }

  const [userDetail, setUserDetails] = useState<UserDetail>({
    profile: "",
    name: "",
    username: "",
    posts: [],
    followers: [],
    following: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        setLoading(true);
        if (token && username) {
          const response = await getuser({ token, username });
          console.log("inside Profile Page : ", response);
          setUserDetails(response.data);
        } else {
          console.log("Token or username is missing");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchuser();
  }, [token, username]);

  console.log("User Details.... = ", userDetail);

  if (loading) {
    <div>loading....</div>;
  } else {
    return (
      <div className="flex flex-col text-white items-center justify-center mx-auto py-14 px-4 gap-20">
        <div className="flex text-white gap-20">
          {/* Profile Pic section */}
          <div className="text-white text-center flex flex-col gap-3">
            <div>
              {userDetail.profile === null ? (
                <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
                    {userDetail.name}
                  </span>
                </div>
              ) : (
                <div>
                  <Image
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="/docs/images/people/profile-picture-5.jpg"
                    alt="Bordered avatar"
                    width={40}
                    height={40}
                  />
                </div>
              )}
            </div>

            <div className="capitalize font-semibold text-xl">
              {userDetail.name}
            </div>
          </div>

          {/* follower and following, Edit and so on Section */}
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center gap-8">
              <p className=" text-xl font-normal lowercase">
                {userDetail.username}
              </p>
              <div className="flex items-center gap-8">
                <button className="bg-[#262626] px-3 py-1 rounded-md hover:bg-[#161616] transition-all duration-200">
                  <Link href="/profile/edit-profile">Edit Profile</Link>
                </button>
                <button className="bg-[#262626] px-3 py-1 rounded-md hover:bg-[#161616] transition-all duration-200">
                  <Link href="/profile/view-archive">Veiw Archive</Link>
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              <p className="text-[16px] font-normal capitalize font-family">
                {userDetail.posts.length === 0 ? "0" : userDetail.posts.length}{" "}
                posts
              </p>

              <p className="text-[16px] font-normal capitalize font-family">
                {userDetail.followers.length === 0
                  ? "0"
                  : userDetail.followers.length}{" "}
                followers
              </p>

              <p className="text-[16px] font-normal capitalize font-family">
                {userDetail.following.length === 0
                  ? "0"
                  : userDetail.following.length}{" "}
                following
              </p>
            </div>
          </div>
        </div>

        {/* Post Wala Section */}
        <div className="border-t-1 flex flex-col gap-4">
          <div className="flex items-center gap-1 uppercase text-[16px] font-semibold pt-2">
            <IoMdGrid />
            <h2>Posts</h2>
          </div>

          <div>
            {!userDetail.posts || userDetail.posts.length === 0 ? (
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="text-2xl border-2 p-3 rounded-full">
                  <SlCamera />
                </div>

                <div className="flex gap-3 flex-col items-center justify-center">
                  <h2 className="text-3xl font-bold capitalize">Share Photos</h2>
                  <p className="text-[16px] font-thin">
                    When you share photos, they will appear on your profile.
                  </p>
                  <Link href="some" className="text-[14px]  text-[#006FF6] font-normal hover:text-white">Share your first photo</Link>
                </div>
              </div>
            ) : (
              <div>
                {
                  // ADD:TODO
                }
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
