import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
import schema from "../../../facility/validationSchema";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: Request) => {
  const userId = req.url.split("user/")[1];
  try {
    const prisma = new PrismaClient();
    const applications = await prisma.facility.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,
      },
    });
    const response = NextResponse.json({ status: 200, applications });
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
export const PUT = async (request: NextRequest) => {
  try {
    const id = request.url.split("user/")[1];
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
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
            facilityName: body.facilityName,
            facilityCategory: body.facilityCategory,
            province: body.province,
            district: body.district,
            tinNumber: body.tinNumber,
            sector: body.sector,
            plotNumber: body.plotNumber,
            cell: body.cell,
            documents: body.documents,
            status:"pending"
          },
        });

        return NextResponse.json({
          status: 200,
          application: updatedApplication,
          message: "Application records are updated successfully!",
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
