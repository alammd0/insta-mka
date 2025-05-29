import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { name, email, phone, password, username } = body;

    if (!name || !email || !phone || !password || !username) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingEmail || existingPhone) {
      console.log(
        "User already exists with email or phone:",
        existingEmail,
        existingPhone
      );
      return NextResponse.json(
        { message: "User already exists, check phone and email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, phone, username, password: hashedPassword },
    });

    const token = jwt.sign(
      { id: user.id, email, username : username, phone, name },
      process.env.JWT_SECRET || "default",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          username: user.username,
        },
        token,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
    });

    console.log("Cookie set with token:", token);
    console.log("User created successfully:", user);

    return response;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
