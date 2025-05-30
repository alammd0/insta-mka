import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // check if user exists
    const userExisting = await prisma?.user.findUnique({
      where: { email },
    });

    if (!userExisting) {
      console.log("User not found with email:", email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check password
    const ispasswordValid = await bcrypt.compare(
      password,
      userExisting.password
    );

    if (!ispasswordValid) {
      console.log("Invalid password for user:", email);
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: userExisting.id,
        email: userExisting.email,
        name: userExisting.name,
        username: userExisting.username,
      },
      process.env.JWT_SECRET || "default",
      { expiresIn: "7d" }
    );

    // genrate
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: userExisting.id,
        name: userExisting.name,
        email: userExisting.email,
        phone: userExisting.phone,
        username: userExisting.username,
      },
      token,
    });

    return response;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
