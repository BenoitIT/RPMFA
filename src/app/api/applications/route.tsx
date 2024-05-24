import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  try {
    const prisma=new PrismaClient();
    const applications = await prisma.facility.findMany({
      where: {
        status: "pending",
      },
      include: {
        user: true,
      },
    });
    const response = NextResponse.json({ status: 200, applications });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Expires', '0');

    return response;
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};


