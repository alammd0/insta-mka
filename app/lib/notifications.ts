import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function createNotification({
  type,
  message,
  senderId,
  receiverId,
  postId,
}: {
  type: "like" | "comment" | "follow";
  message: string;
  senderId: string;
  receiverId: string;
  postId?: string;
}) {
  if (senderId === receiverId) return; 

  return await prisma.notification.create({
    data: {
      type,
      message,
      senderId,
      receiverId,
      postId,
    },
  });
}