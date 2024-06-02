import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const id = request.url.split("contribution/")[1];
    if (id) {
      const contribution = await prisma.contribution.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
          facility: true,
        },
      });
      if (contribution) {
        return NextResponse.json({
          status: 200,
          contribution: contribution,
        });
      }
      return NextResponse.json({
        status: 200,
        contribution: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      contribution: null,
    });
  }
}
export const PUT = async (request: NextRequest) => {
  try {
    const id = request.url.split("contribution/")[1];
    if (id) {
      const contribution = await prisma.contribution.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });
      if (contribution) {
        const updatedcontribution = await prisma.contribution.update({
          where: {
            id: Number(id),
          },
          data: {
            status: "approved",
          },
        });

        return NextResponse.json({
          status: 200,
          contribution: updatedcontribution,
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
