import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not Found..",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "User Fetch successfully",
        data : user
      },
      {
        status: 200,
      }
    );

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "User Fetch failed",
      },
      {
        status: 503,
      }
    );
  }
}
