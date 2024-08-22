import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;

export const PUT = async (request: Request) => {
  const body = await request.json();
  try {
    const id = request.url.split("creds/")[1];
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (user && user.password == body.currentPassword) {
      await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          password: body.password,
        },
      });
      return NextResponse.json({ status: 200, user });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Current password must be correct",
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
