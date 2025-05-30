"use client";

import { RootState } from "@/app/lib/store";
import { getuser } from "@/app/service/opreation/authAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log("User : ", user);

  const username = user?.username;

  const token = useSelector((state: RootState) => state.auth.token);
  // console.log("token inside: ", token);

  const [userDetail, setUserDetails] = useState({});
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

  // console.log(userDetail);

  if (loading) {
    <div>Loading....</div>;
  }

  return <div>hello world</div>;
}
