"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useEffect, useState } from "react";
import { getuser } from "@/app/service/opreation/authAPI";
import Link from "next/link";

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
          const response = await getuser({ token, username });
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
    <div className="text-white bg-[#2d2b2b] p-4 flex flex-col items-center justify-center border-fuchsia-800 border-1 rounded-xl">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center h-60 rounded-2xl overflow-hidden ">
          <img
            className="h-full rounded-2xl border-fuchsia-800 border-1"
            src={userDetail.profile.avatar}
            alt="Profile Avatar"
          />
        </div>

        <div className="bg-[#070707] p-4 rounded-lg shadow-lg border-1 border-fuchsia-400">
          <h1 className="text-xl font-semibold">{userDetail.name}</h1>
          <p className="text-[14px] font-normal">{userDetail.profile.bio}</p>
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
