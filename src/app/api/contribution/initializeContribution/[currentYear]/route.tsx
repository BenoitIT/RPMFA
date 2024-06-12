import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const currentYear = request.url.split("initializeContribution/")[1];
    if (currentYear) {
      const contributionYear = await prisma.contributingYearsMonitor.findFirst({
        where: {
          year: Number(currentYear),
        },
      });
      if (contributionYear) {
        return NextResponse.json({
          status: 200,
          currentYear: contributionYear,
        });
      }
      return NextResponse.json({
        status: 200,
        currentYear: null,
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
