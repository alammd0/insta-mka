import { NextRequest } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

export async function GET(req: NextRequest) {
    try{

        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        if (!username) {
            return new Response(JSON.stringify({ error: "Username is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const prisma = new PrismaClient();
        const userDetails = await prisma.user.findMany({
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
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "User Found", data: userDetails }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    }
    catch (error){
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}