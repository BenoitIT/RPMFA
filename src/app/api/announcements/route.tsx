import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./validationSchema";
export const revalidate = 0;
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const isUserExist = await prisma.announcement.findUnique({
      where: {
        subject: body.subject,
      },
    });
    if (isUserExist) {
      return NextResponse.json({
        message: "The announcement subject is arleady exist",
        status: 400,
      });
    }
    const announcement = await prisma.announcement.create({
      data: {
        subject: body.subject,
        announcementbody: body.announcementbody,
      },
    });

    return NextResponse.json({
      message: "New announcement is created successfully",
      status: 201,
      announcement,
    });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};

export const GET = async () => {
  try {
    const announcements = await prisma.announcement.findMany({});
    return NextResponse.json({ status: 200, announcements });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
