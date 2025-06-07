import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    console.log("Post id:", postId);

    if (!postId) {
      return NextResponse.json(
        {
          message: "Post Id is not valid.",
        },
        {
          status: 400,
        }
      );
    }

    // Find all comments related to this Post ID
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            profile : true
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "All comments retrieved successfully.",
        data: comments,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      {
        message: "Error while fetching all comments.",
      },
      {
        status: 500,
      }
    );
  }
}
