import prisma from "@/prisma/client";
import schema from "./validationSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const facility = await prisma.facility.create({
      data: {
        facilityName: body.facilityName,
        facilityCategory: body.facilityCategory,
        province: body.province,
        district: body.district,
        sector: body.sector,
        plotNumber: body.plotNumber,
        cell: body.cell,
        documents: body.documents,
      },
    });
    return NextResponse.json({
      status: 201,
      data: facility,
      message: "Your facility is registered successfully",
    });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
