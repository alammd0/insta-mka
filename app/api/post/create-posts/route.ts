import { getLoggedinUser } from "@/app/lib/auth";
import { uploadMedia } from "@/app/utils/uploadtoCloudinary";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface LoggedInUser {
  id: string;
}

export async function POST(req: NextRequest) {
  try {

    const user = (await getLoggedinUser()) as LoggedInUser | null;

    console.log("User details : ", user);

    if (!user || !user.id) {
      return NextResponse.json(
        {
          message: "User not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    // fetch fromData here
    const formData = await req.formData();
    const title = formData.get("title") as string;
    console.log("title : ", title)
    const description = formData.get("description") as string;
    console.log("Description : ", description);
    const location = formData.get("location") as string;
    console.log("location", location)
    const file = formData.get("image") as File;
    console.log("Image", file)

    if (!title || !description || !location || !file) {
      return NextResponse.json(
        {
          message: "All Field Are Required..",
        },
        {
          status: 404,
        }
      );
    }

    console.log()

    // uploas image on clodinnary
    const imageUrl = await uploadMedia(file);
    console.log("Image Url : ", imageUrl);

    // create post ya reels
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        location,
        image: imageUrl,
        userId: user.id,
      },
    });

    console.log("Create Post.....", newPost);

    return NextResponse.json(
      {
        data: newPost,
        message: "Poast Create successfully",
      },

      {
        status: 200,
      }
      
    );
  } catch (err) {
    console.log(err);

    NextResponse.json(
      {
        message: "Error While Create Post And Reels..",
      },
      {
        status: 502,
      }
    );
  }
}
