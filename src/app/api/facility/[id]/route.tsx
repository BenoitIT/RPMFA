import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const PUT = async (request: Request) => {
  try {
    const id = request.url.split("facility/")[1];
    const facility = await prisma.facility.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (facility ) {
      await prisma.facility.update({
        where: {
          id: Number(id),
        },
        data: {
          facilityCategory: "General clinic",
        },
      });
      return NextResponse.json({ status: 200, facility });
    } else {
      return NextResponse.json({ status: 404, facility });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
