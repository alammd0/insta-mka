import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { createNotification } from "@/app/lib/notifications";

const prisma = new PrismaClient();

interface LoggedInUser {
  id: string;
}

export const POST = async (req: NextRequest) => {
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

    console.log("Pst Id inside likes", postId);

    // find user details given post Id
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        user: true,
      },
    });

    // check this liked by this
    const checkLikePost = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: user.id,
      },
    });

    if (checkLikePost) {
      return NextResponse.json(
        {
          message: "User Already like this Project..",
        },
        {
          status: 400,
        }
      );
    }

    const response = await prisma?.like.create({
      data: { postId, userId: user.id },
    });

    if (!post?.user?.id) {
      return NextResponse.json(
        {
          message: "Post owner not found.",
        },
        {
          status: 400,
        }
      );
    }

    const notif = await createNotification({
      type: "like",
      message: "Like Your Posts",
      senderId: user.id,
      receiverId: post.user.id,
      postId,
      userId : user.id
    });

    console.log("Notification.. ", notif);



    return NextResponse.json(
      {
        message: "Like Create SuccessFully...",
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "error likes the post..",
      },
      { status: 503 }
    );
  }
};
