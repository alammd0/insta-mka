"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useEffect, useState } from "react";
import { getuser } from "@/app/service/opreation/authAPI";
import Link from "next/link";
import Image from "next/image";

interface Profile {
  avatar: string;
  bio: string;
}

interface Post {
  image: string;
}

interface userDetails {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  profile: Profile;
  posts: Post[];
  followers: [];
  following: [];
}

export default function AccountSettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const username = user?.username;

  const token = useSelector((state: RootState) => state.auth.token);
  console.log("token inside: ", token);

  const [userDetail, setUserDetails] = useState<userDetails>({
    profile: { avatar: "", bio: "" },
    name: "",
    username: "",
    email: "",
    phone: "",
    posts: [],
    followers: [],
    following: [],
  });

  //   fetch user Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token && username) {
        try {
          const response = await getuser({ username, exact: true });
          console.log("User Details: ", response);

          if (response) {
            setUserDetails(response.data);
          } else {
            throw new Error("Failed to fetch user details.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [token, username]);

  console.log("User Details: ", userDetail);

  return (
    <div className="bg-[#2d2b2b] md:w-[65vh] rounded-xl flex flex-col pb-5 px-4 py-3">
      <div className="flex flex-col gap-5">
        {userDetail.profile === null ? (
          <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
              {userDetail.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 rounded-2xl overflow-hidden ">
            <Image
              src={userDetail.profile?.avatar}
              alt={
                userDetail.name ? `${userDetail.name}'s avatar` : "User avatar"
              }
            />
          </div>
        )}

        <div className="bg-[#070707] p-4 rounded-lg shadow-lg border-1 border-fuchsia-400">
          <h1 className="text-xl font-semibold">{userDetail.name}</h1>
          {
            userDetail.profile?.bio && userDetail.profile.bio.length > 0 ? (
              <p className="text-[14px] font-normal">{userDetail.profile.bio}</p>
            ) : (
              <p className="text-[14px] font-normal">No bio available</p>
            )
          }
        </div>

        <div className="bg-[#070707] p-4 rounded-lg shadow-lg border-1 border-fuchsia-400">
          <h2 className="text-[14px] font-normal">
            Username: {userDetail.username}
          </h2>
          <p className="text-[14px] font-normal">Email: {userDetail.email}</p>
          <p className="text-[14px] font-normal">Phone: {userDetail.phone}</p>
        </div>

        <div className="bg-[#070707] p-4 rounded-lg shadow-lg border-1 border-fuchsia-400">
          <p className="text-[14px] font-normal">
            Posts : {userDetail.posts.length}
          </p>
          <p className="text-[14px] font-normal">
            Followers : {userDetail.followers.length}
          </p>
          <p className="text-[14px] font-normal">
            Following : {userDetail.following.length}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-40 mt-6">
        <button className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold">
          <Link href="/home">Go to Home</Link>
        </button>

        <button className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold">
          <Link href="/profile">Go to Profile</Link>
        </button>
      </div>
    </div>
  );
}
