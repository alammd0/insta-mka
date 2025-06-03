// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@/app/generated/prisma";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const username = searchParams.get("username");

//     if (!username) {
//       return NextResponse.json(
//         {
//           message: "User Not Found...",
//         },
//         { status: 404 }
//       );
//     }

//     const userDetails = await prisma.user.findUnique({
//       where: { username },
//       select: {
//         id: true,
//         name: true,
//         username: true,
//         posts: true,
//         followers: true,
//         following: true,
//         profile: true,
//       },
//     });

//     if (!userDetails) {
//       return NextResponse.json({
//         message: "User not Found After call database...",
//       });
//     }

//     return NextResponse.json(
//       {
//         message: "User Found",
//         data: userDetails,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       {
//         message: "Error While Fetching User Data...",
//       },
//       {
//         status: 503,
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = await params;

    if (!username) {
      return NextResponse.json(
        {
          message: "User Not Found...",
        },
        { status: 404 }
      );
    }

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
        {
          message: "User not Found After DB call...",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User Found",
        data: userDetails,
      },

      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error While Fetching User Data...",
      },
      { status: 503 }
    );
  }
}
