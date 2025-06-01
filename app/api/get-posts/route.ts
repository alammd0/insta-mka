import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // find all post in db
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        description: true,
        image: true,
        location: true,
        likes: true,
        comments: true,
        createdAt: true,
        user: {
          select : {
            name : true,
            profile : true
          }
        }
      },
    });

    return NextResponse.json(
      {
        message: "All Post here...",
        data: posts,
      },
      {
        status: 200,
      }
    );
    
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "error fetching all post...",
      },
      {
        status: 200,
      }
    );
  }
}
