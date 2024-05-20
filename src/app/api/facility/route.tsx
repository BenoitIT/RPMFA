import prisma from "@/prisma/client";
import schema from "./validationSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
          userId:payload.id
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
