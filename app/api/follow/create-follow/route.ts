import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { createNotification } from "@/app/lib/notifications";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { followerId, followingId } = body;

    if (followerId === followingId) {
      return NextResponse.json(
        {
          message: "Can't Follow your self",
        },
        {
          status: 403,
        }
      );
    }

    // finde user given Id
    const followerUser = await prisma.user.findUnique({
      where: {
        id: followerId,
      },
    });

    console.log("User Found follow User - ", followerUser)

    const followingUser = await prisma.user.findUnique({
      where: {
        id: followingId,
      },
    });

    console.log("Following User - ", followingUser);

    if (!followerUser || !followingUser) {
      return NextResponse.json(
        {
          message: "User Not Found Given Id.",
        },
        {
          status: 404,
        }
      );
    }

    // create follow
    const newFollow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    // check if followed back (opsite direction)
    const isFollowBack = await prisma.follow.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    await createNotification({
      type: "follow",
      message: "started following you",
      senderId: followerId,
      receiverId: followingId,
    });

    // send Response
    return NextResponse.json(
      {
        message: "Follow Create sucessfully..",
        data: {
          folow: newFollow,
          followBack: !!isFollowBack,
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Error Create followers section...",
    });
  }
}
