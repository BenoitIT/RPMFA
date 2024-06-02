import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (request: Request) => {
  try {
    const id = request.url.split("user/")[1];
    const prisma = new PrismaClient();
    const contributions = await prisma.contribution.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        user: true,
        facility: true,
      },
    });
    const response = NextResponse.json({ status: 200, contributions });
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
