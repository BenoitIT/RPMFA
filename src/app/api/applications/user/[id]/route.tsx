import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
  const userId = req.url.split("user/")[1];
  try {
    const prisma = new PrismaClient();
    const applications = await prisma.facility.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,
      },
    });
    const response = NextResponse.json({ status: 200, applications });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Expires", "0");

    return response;
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
