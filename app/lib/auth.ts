import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getLoggedinUser = async () => {
  const token = (await cookies()).get("token")?.value || null;

  if (!token) {
    console.log("User Not Logged In Pleas login or Token Expired");
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const response = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("Response Get Loginuser...", response);

    return response;
  } catch (err) {
    console.log(err);
    throw new Error("User error...");
  }
};
