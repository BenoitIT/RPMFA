import prisma from "@/prisma/client";
import schema from "./validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { convertTimestamp } from "@/app/utilities/timeConverters";
export const revalidate = 0;
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const isRecieptRegistered = await prisma.contribution.findFirst({
      where: {
        depositRecieptNumber: body.depositRecieptNumber,
      },
    });
    if (isRecieptRegistered) {
      return NextResponse.json({
        message: "Reciept with this number has arleady registred",
        status: 400,
      });
    }
    const contribution = await prisma.contribution.create({
      data: {
        contributionAmount: body.contributionAmount,
        depositRecieptNumber: body.depositRecieptNumber,
        facilityId: body.facilityId,
        depositReciept: body.depositReciept,
        userId: body.userId,
      },
    });
    return NextResponse.json({
      status: 201,
      data: contribution,
      message: "Your contribution is sent successfully",
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
    const pendingcontributions = await prisma.contribution.findMany({
      where: {
        status: "pending",
      },
      include: {
        user: true,
        facility: true,
      },
    });
    const approvedcontributions = await prisma.contribution.findMany({
      where: {
        status: "approved",
      },
      include: {
        user: true,
        facility: true,
      },
    });
    const contributions = [
      {
        name: "Pending contributions",
        counts: pendingcontributions.length,
        data: pendingcontributions.map((contribution: any) => ({
          id: contribution?.id,
          facilityName: contribution?.facility?.facilityName,
          category: contribution?.facility?.facilityCategory,
          amountPaid: contribution?.contributionAmount,
          image: contribution?.user?.profileImage,
          dueDate: convertTimestamp(contribution?.createdAt),
          status: contribution?.status,
        })),
      },
      {
        name: "Approved contributions",
        counts: approvedcontributions.length,
        data: approvedcontributions.map((contribution: any) => ({
          id: contribution?.id,
          facilityName: contribution?.facility?.facilityName,
          category: contribution?.facility?.facilityCategory,
          amountPaid: contribution?.contributionAmount,
          image: contribution?.user?.profileImage,
          dueDate: convertTimestamp(contribution?.createdAt),
          status: contribution?.status,
        })),
      },
    ];
    return NextResponse.json({ status: 200, contributions });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
