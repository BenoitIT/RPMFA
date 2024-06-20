import prisma from "@/prisma/client";
import schema from "./validationSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const revalidate = 0;
export const POST = async (request: NextRequest) => {
  const headers = request.headers;
  const token = headers.get("Authorization")?.split(" ")[1];
  try {
    if (token) {
      const payload: any = jwt.decode(token);
      const body = await request.json();
      const validation = schema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
      }
      let defaultContributionAmount: number;
      if (body.facilityCategory == "General clinic") {
        defaultContributionAmount = 600000;
      } else if (body.facilityCategory == "Polyclinic") {
        defaultContributionAmount = 900000;
      } else if (body.facilityCategory == "Specialized Clinic") {
        defaultContributionAmount = 720000;
      } else if (body.facilityCategory == "Hospital") {
        defaultContributionAmount = 1200000;
      } else {
        defaultContributionAmount = 0;
      }
      const facility = await prisma.facility.create({
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
          userId: payload.id,
          defaultContribution: defaultContributionAmount,
        },
      });
      await prisma.notification.create({
        data: {
          notification: `New application has been sent from ${body.facilityName}!`,
          senderId: payload.id,
          reciverId: 1,
        },
      });
      return NextResponse.json({
        status: 201,
        data: facility,
        message: "Your facility is registered successfully",
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
