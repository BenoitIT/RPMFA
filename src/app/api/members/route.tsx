import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async () => {
  try {
    const members = await prisma.facility.findMany({
      where: {
        status: "approved",
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({ status: 200, members });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};


