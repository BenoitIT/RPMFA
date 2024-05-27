import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const PUT = async (request: NextRequest) => {
  try {
    const id = request.url.split("reject/")[1];
    if (id) {
      const application = await prisma.facility.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });
      if (application) {
        const updatedApplication = await prisma.facility.update({
          where: {
            id: Number(id),
          },
          data: {
            status: "rejected",
          },
        });

        return NextResponse.json({
          status: 200,
          application: updatedApplication,
        });
      }
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
