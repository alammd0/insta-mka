import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { title } from "process";
import { createNotification } from "@/app/lib/notifications";

const prisma = new PrismaClient();

interface loggeduser {
  id: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const user = (await getLoggedinUser()) as loggeduser;

    if (!user || !user) {
      return NextResponse.json(
        {
          message: "User Unathurized..",
        },
        {
          status: 404,
        }
      );
    }

    const body = await req.json();
    const { postId, comment } = body;

    // find post
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
      });
    }

    // create comments
    const response = await prisma.comment.create({
      data: {
        comment: comment,
        userId: user.id,
        postId: postId,
      },
    });

    await createNotification({
      type: "comment",
      message: comment,
      senderId: user.id,
      receiverId: post.userId,
      postId,
    });

    // return response
    return NextResponse.json(
      {
        mesaage: "create-comment",
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
        message: "Create Comment Any error",
      },
      {
        status: 503,
      }
    );
  }
};
