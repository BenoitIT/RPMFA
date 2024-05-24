import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";
export const PUT = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
      const application = await prisma.facility.findFirst({
        where: {
          id: parseInt(id),
          status: "pending",
        },
        include: {
          user: true,
        },
      });
      if (application) {
        const updatedApplication = await prisma.facility.update({
          where: {
            id: parseInt(id),
          },
          data: {
            status: "approved",
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
