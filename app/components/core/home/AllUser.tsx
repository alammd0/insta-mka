"use client";

import { getalluser } from "@/app/service/opreation/authAPI";
import { useEffect, useState } from "react";
import { createfollow } from "@/app/service/opreation/followAPI";
import { UseSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { fetchfollowing } from "@/app/service/opreation/followAPI";
import { useSelector } from "react-redux";

type User = {
  id: string;
  name: string;
  username: string;
  profile: {
    avatar: string;
  } | null;
};

interface logedData {
  id: string;
}

export default function Alluser() {
  const [userData, setUserData] = useState<User[]>([]);

  const [followedUsers, setFollowedUsers] = useState<{
    [key: string]: boolean;
  }>({});

  const user = useSelector((state: RootState) => state.auth.user);

  //@ts-ignore
  const currentUserId = user.id;

  useEffect(() => {
    const fetchalluser = async () => {
      try {
        const response = await getalluser();
        if (response) {
          setUserData(response.data);
        } else {
          console.log("error while fetching user");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    fetchalluser();
  }, []);

  const handleFollow = async (UserId: string) => {
    try {
      const isFollowing = followedUsers[UserId];

      await createfollow({ followerId: currentUserId, followingId: UserId });

      // Optimistic UI update
      setFollowedUsers((prev) => ({
        ...prev,
        [UserId]: !isFollowing,
      }));
    } catch (err) {
      console.log(err);
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
  }, [currentUserId]);

  console.log("user details -> ", userData);

  return (
    <div>
      {userData.length === 0 ? (
        <div>No user Found</div>
      ) : (
        <div className="flex flex-col gap-3 w-[350px]">
          {userData.map((data, index) => (
            <div
              className="flex items-center justify-between gap-4 bg-gray-900 px-4 py-2 w-full rounded-xl"
              key={index}
            >
              <div className="flex items-center gap-4">
                <div>
                  {data.profile === null ? (
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="text-[8px] text-gray-600 dark:text-gray-300 capitalize">
                        {data.name[0]}
                      </span>
                    </div>
                  ) : (
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="text-[8px] text-gray-600 dark:text-gray-300 capitalize">
                        <img src={data.profile.avatar} alt={data.name[0]} />
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h3> {data.name}</h3>
                  <p> {data.username} </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleFollow(data.id)}
                  className={`text-[14px] font-bold cursor-pointer hover:text-white ${
                    followedUsers[data.id] ? "text-green-600" : "text-blue-500"
                  }`}
                >
                  {followedUsers[data.id] ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
