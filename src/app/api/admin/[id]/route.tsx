import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const PUT = async (request: Request) => {
  try {
    const id = request.url.split("admin/")[1];
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        Facility: true,
      },
    });
    if (user && user.Facility.length < 1) {
      await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          userType: "admin",
          confirmed: true,
        },
      });
      return NextResponse.json({ status: 200, user });
    } else {
      return NextResponse.json({ status: 404, user });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
