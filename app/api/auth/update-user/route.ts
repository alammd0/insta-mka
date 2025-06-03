import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface LoggedInUser {
  id: string;
}

export const PUT = async (req: NextRequest) => {
  try {
    const user = (await getLoggedinUser()) as LoggedInUser | null;

    if (!user || !user.id) {
      return NextResponse.json(
        {
          message: "User Unauthorized...",
        },
        {
          status: 404,
        }
      );
    }

    const body = await req.json();

    const { name, email, phone, username } = body;

    // depend on your requirement you can add validation here
    let updatedFields: any = {};

    if (name) {
      updatedFields.name = name;
    }

    if (email) {
      updatedFields.email = email;
    }

    if (phone) {
      updatedFields.phone = phone;
    }

    if (username) {
      updatedFields.username = username;
    }

    //TODO : ADD if user updating userdetails then next user update after 14 days

    // check if user exits or not
    const userExisting = await prisma?.user.findUnique({
      where: { id: user.id },
    });

    if (!userExisting) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // update user details
    const updatedUser = await prisma?.user.update({
      where: { id: user.id },
      data: {
        ...updatedFields,
      },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          username: updatedUser.username,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
};
