import { NextRequest } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const prisma = new PrismaClient();
  try {
    const username = await params.username;

    if (!username) {
      return new Response("Username required", { status: 400 });
    }

    const user = await prisma.user.findMany({
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

    if (!user || user.length === 0) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify({ data: user }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
