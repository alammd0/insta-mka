import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { title } from "process";

const prisma = new PrismaClient();

interface loggeduser { 
    id : string
}

export const POST = async (req: NextRequest)  => {
    try {
        const user = await getLoggedinUser() as loggeduser ; 

        if(!user || !user){
            return NextResponse.json({
                message : "User Unathurized.."
            },
        {
            status : 404
        })
        }

        const body = await req.json();
        const {postId, comment} = body;


        // create comments 
        const response = await prisma.comment.create({
            data: {
                comment: comment,
                userId: user.id,
                postId: postId
            }
        })

        // return response 
        return NextResponse.json({
            mesaage : "create-comment"
        }, {
            status : 200
        })


    }
    catch(err){

    }
}