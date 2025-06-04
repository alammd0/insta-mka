import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getLoggedinUser } from "@/app/lib/auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface User {
  id: string;
  email: string;
  password: string;
}

export async function PUT(req: NextRequest) {
  try {
    // get user
    const user = (await getLoggedinUser()) as User;

    if (!user || !user.id) {
      return NextResponse.json({ error: "User not found or not logged in." });
    }

    const body = await req.json();
    const { oldPassword, newPassword } = body;

    console.log("Request Body:", body);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Old password and new password are required." },
        { status: 400 }
      );
    }

    // find old password of the current user
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        password: true,
      },
    });

    console.log("Existing User Password:", existingUser?.password);

    if (!existingUser || !existingUser.password) {
      return NextResponse.json(
        { error: "User not found or password not set." },
        { status: 404 }
      );
    }


    // compare old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
    console.log("Is Old Password Valid:", isOldPasswordValid);
    
    if (!isOldPasswordValid) {
      return NextResponse.json(
        { error: "Old password is incorrect." },
        { status: 401 }
      );
    }

    // hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    console.log("Hashed New Password", newPasswordHash);

    // update password
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: newPasswordHash,
      },
    });

    // return success response
    return NextResponse.json(
      { message: "Password updated successfully.", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the password." },
      { status: 500 }
    );
  }
}
