import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface isLoginData {
  id: string;
}

export async function GET(req: NextRequest) {
  try {
    const user = (await getLoggedinUser()) as isLoginData;

    // check user is login or not
    if (!user || !user.id) {
      return NextResponse.json(
        {
          mesaage: "User Not Autherized...",
        },
        {
          status: 404,
        }
      );
    }

    // now fetching user and also follow
    const following = await prisma.follow.findMany({
      where: {
        followerId: user.id,
      },

      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            profile: true,
          },
        },
      },
    });

    if (!following) {
      return NextResponse.json(
        {
          message: "No, Following found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Following found successfully..",
        data: following,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Followers fetching Isue..",
      },
      {
        status: 502,
      }
    );
  }
}
