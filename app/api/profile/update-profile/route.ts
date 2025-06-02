import { getLoggedinUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { uploadMedia } from "@/app/utils/uploadtoCloudinary";

const prisma = new PrismaClient();

interface LoggedInUser {
  id: string;
}

export const POST = async (req: NextRequest) => {
  try {
    // find use details
    const user = (await getLoggedinUser()) as LoggedInUser | null;

    if (!user || !user.id) {
      return NextResponse.json(
        {
          message: "User Unauthorized...",
        },
        {
          status: 404,
        }
      );
    }

    // find the data from req body
    const formData = await req.formData();

    const bio = formData.get("bio") as string;
    console.log("bio", bio);

    const pic = formData.get("avatar") as File;
    console.log("Profile - ", pic);

    if (!bio || !pic) {
      return NextResponse.json(
        {
          message: "Please fill All details",
        },
        {
          status: 404,
        }
      );
    }

    // upload image on cloundinary
    const uploadPic = await uploadMedia(pic);
    console.log("Upload profile pic : ", uploadPic);

    if (!uploadPic) {
      return NextResponse.json(
        {
          message: "Image url not found and failed please check",
        },
        {
          status: 404,
        }
      );
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    let updatedProfile;

    if (existingProfile) {
      updatedProfile = await prisma.profile.update({
        where: { userId: user.id },
        data: {
          bio: bio,
          avatar: uploadPic,
        },
      });
    } else {
      updatedProfile = await prisma.profile.create({
        data: {
          userId: user.id,
          bio: bio,
          avatar: uploadPic,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Profile Update successfully...",
        data: updatedProfile,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Error while updating Profile Pic",
      },
      {
        status: 502,
      }
    );
  }
};
