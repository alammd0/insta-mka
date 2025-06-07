import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        {
          message: "Username is required",
        },
        {
          status: 404,
        }
      );
    }

    // check exact is true or false
    const isExact = searchParams.get("exact") === "true";

    if (isExact) {
      const userDetails = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          name: true,
          username: true,
          phone: true,
          email: true,
          posts: true,
          followers: true,
          following: true,
          profile: true,
        },
      });

      if (!userDetails) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({ message: "User Found", data: userDetails }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // find users with similar usernames
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },

      select : {
        id: true,
        name: true,
        username: true,
        phone: true,
        email: true,
        posts: true,
        followers: true,
        following: true,
        profile: true,
      }
    });

    if( !users || users.length === 0) {
      return NextResponse.json(
        { message: "No users found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
        message: "Users Found",
        data: users,
    } , {
        status : 200,
    })


  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
