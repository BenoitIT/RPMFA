import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const id = request.url.split("edit/")[1];
    if (id) {
      const contribution = await prisma.contribution.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });
      if (
        contribution &&
        contribution.contributionAmount > contribution.unpaidContribution
      ) {
        const updatedcontribution = await prisma.contribution.update({
          where: {
            id: Number(id),
          },
          data: {
            contributionAmount: body.contributionAmount,
            depositRecieptNumber: body.depositRecieptNumber,
            depositReciept: body.depositReciept,
          },
        });

        return NextResponse.json({
          status: 200,
          contribution: updatedcontribution,
          message: "Contribution Info are updated successfully.",
        });
      } else {
        return NextResponse.json({
          status: 403,
          contribution: null,
          message:
            "This can not happen.Kindly clear unpaid contribution amount first!",
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
