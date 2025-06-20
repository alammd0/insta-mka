"use client";

import { RootState } from "@/app/lib/store";
import { getuser } from "@/app/service/opreation/authAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IoMdGrid } from "react-icons/io";
import { SlCamera } from "react-icons/sl";
import ProfileModalComponents from "@/app/components/core/modals/ProfileModal";
import UserUpdateModal from "@/app/components/core/modals/UserUpdateModal";

interface Profile {
  avatar: string;
  bio: string;
}

interface Post {
  image: string;
  // add other post properties if needed
}

interface UserDetail {
  name?: string;
  username?: string;
  posts: Post[];
  followers: [];
  following: [];
  profile: Profile;
}
export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const username = user?.username;

  const [loading, setLoading] = useState(false);

  const [userModalOpen, SetUserModalOpen] = useState(false);

  const [profileModalOpen, SetProfileModalOpen] = useState(false);

  const [userDetail, setUserDetails] = useState<UserDetail>({
    profile: { avatar: "", bio: "" },
    name: "",
    username: "",
    posts: [],
    followers: [],
    following: [],
  });

  useEffect(() => {
    const fetchuser = async () => {
      try {
        setLoading(true);
        if (username) {
          console.log("Fetching user details for username:", username);
          const response = await getuser({ username, exact: true });
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
    
  }, [username]);

  function profileOpenModal() {
    SetUserModalOpen(true);
  }

  function profileCloseModal() {
    SetUserModalOpen(false);
  }

  function openModal() {
    SetProfileModalOpen(true);
  }

  function onClose() {
    SetProfileModalOpen(false);
  }

  console.log("User Details.... inside profile = ", userDetail);
  console.log(userDetail.posts);

  if (loading) {
    <div>loading....</div>;
  } else {
    return (
      <div className="flex flex-col w-full text-white items-center justify-center mx-auto py-14 px-4 gap-20">
        <div className="flex flex-row justify-center gap-10">
          {/* Profile Pic section */}
          <div className="text-white flex flex-col gap-3 w-[50%]">
            <div>
              {userDetail.profile === null ? (
                <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
                    {userDetail.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              ) : (
                <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
                    <img
                      src={userDetail.profile?.avatar}
                      alt={
                        userDetail.name
                          ? `${userDetail.name}'s avatar`
                          : "User avatar"
                      }
                    />
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="capitalize font-semibold text-xl">
                {userDetail.name}
              </h2>
              <p className="w-[90%]">{userDetail.profile?.bio}</p>
            </div>

            <button
              onClick={openModal}
              className="bg-[#262626] px-3 py-1 rounded-md hover:bg-[#161616] transition-all duration-200 flex w-fit text-[14px] font-extralight"
            >
              Change Profile Pic & Bio
            </button>
          </div>

          {/* follower and following, Edit and so on Section */}
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center gap-8">
              <p className=" text-xl font-normal lowercase">
                {userDetail.username}
              </p>
              <div className="flex items-center gap-8">
                <button
                  onClick={profileOpenModal}
                  className="bg-[#262626] px-3 py-1 rounded-md hover:bg-[#161616] transition-all duration-200"
                >
                  Edit Profile
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
        <div className="border-t-1  flex flex-col gap-4 justify-center items-center">
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
                  <h2 className="text-3xl font-bold capitalize">
                    Share Photos
                  </h2>
                  <p className="text-[16px] font-thin">
                    When you share photos, they will appear on your profile.
                  </p>
                  <Link
                    href="some"
                    className="text-[14px]  text-[#006FF6] font-normal hover:text-white"
                  >
                    Share your first photo
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-5">
                {userDetail.posts.map((image, index) => (
                  <div
                    key={index}
                    className="h-[400px] w-[340px] border-2 rounded-sm hover:scale-105 transition-all duration-100"
                  >
                    <img
                      src={image.image}
                      className="h-[100%] w-[100%] rounded-sm"
                      alt="no Image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {profileModalOpen && (
          <div>
            <ProfileModalComponents onClose={onClose}></ProfileModalComponents>
          </div>
        )}

        {userModalOpen && (
          <div>
            <UserUpdateModal onClose={profileCloseModal}></UserUpdateModal>
          </div>
        )}
      </div>
    );
  }
}
