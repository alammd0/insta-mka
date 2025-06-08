import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getLoggedinUser } from "@/app/lib/auth";
import { createNotification } from "@/app/lib/notifications";

const prisma = new PrismaClient();

interface LoggedInUser {
  id: string;
}

export const DELETE = async (req: NextRequest) => {
  try {
    const user = (await getLoggedinUser()) as LoggedInUser | null;

    console.log("User Details : ", user);

    if (!user || !user.id) {
      return NextResponse.json(
        {
          message: "User Unathurized please check",
        },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { postId } = body;

    console.log("Pst Id inside unlike", postId);

    // check this liked by this
    const checkLikePost = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: user.id,
      },
    });

    if (!checkLikePost) {
      return NextResponse.json(
        {
          message: "User Not Like this Project..",
        },
        {
          status: 400,
        }
      );
    }

    // find post details
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found.",
        },
        {
          status: 404,
        }
      );
    }

    const response = await prisma?.like.delete({
      where: { id: checkLikePost.id },
    });

    await createNotification({
      type: "like",
      message: "unlike Your Posts",
      senderId: user.id,
      receiverId: post.userId,
      postId,
    });

    return NextResponse.json(
      {
        message: "Like Deleted SuccessFully...",
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("Error Unliking Post : ", err);
    return NextResponse.json(
      {
        message: "Error Unliking Post",
      },
      {
        status: 500,
      }
    );
  }
};
