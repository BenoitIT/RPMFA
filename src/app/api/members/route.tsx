import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const yearParam = Number(searchParams.get("year")!);
  try {
    const members = await prisma.facility.findMany({
      where: {
        status: "approved",
        createdAt: {
          lte: new Date(`${yearParam}-12-31T23:59:59.999Z`)
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
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
