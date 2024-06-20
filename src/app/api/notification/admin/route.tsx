import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async () => {
  try {
    const data = await prisma.notification.findMany({
      where: {
        reciverId: 1,
      },
    });
    return NextResponse.json({ status: 200, data });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
