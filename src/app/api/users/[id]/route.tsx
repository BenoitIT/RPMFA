import prisma from "@/prisma/client";
import {  NextResponse } from "next/server";
import schema from "./validationSchema";
export const revalidate = 0;
export const GET = async (request: Request) => {
  try {
    const id = request.url.split("users/")[1];
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (user) {
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
export const PUT = async (request: Request) => {
  const body = await request.json();
  const validation = schema.safeParse(body);
  try {
    const id = request.url.split("users/")[1];
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (user) {
      if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
      }
      await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          profileImage: body.image,
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
