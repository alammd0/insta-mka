import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { createNotification } from "@/app/lib/notifications";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
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

    await prisma.follow.deleteMany({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    await createNotification({
      type: "follow",
      message: "Unfollow you",
      senderId: followerId,
      receiverId: followingId,
    });

    // send Response
    return NextResponse.json(
      {
        message: "Unfollowed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Unfollow error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
