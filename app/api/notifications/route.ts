import { PrismaClient } from "@/app/generated/prisma";
import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface LoggedInUser {
  id: string;
}

export async function GET(req: NextRequest) {
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

    const notification = await prisma.notification.findMany({
      where: {
        receiverId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sender: {
            select : {
                name : true,
                username : true,
                createdAt : true
            }
        },
      },
    });

    return NextResponse.json(
      {
        message: "all notification are..",
        data: notification,
      },
      {
        status: 200,
      }
    );

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Notification Fetch Error",
      },
      {
        status: 502,
      }
    );
  }
}
