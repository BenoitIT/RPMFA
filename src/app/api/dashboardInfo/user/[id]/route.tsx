import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { convertTimestamp } from "@/app/utilities/timeConverters";
import { extractYear } from "@/app/utilities/timeParser";
export const revalidate = 0;
export const GET = async (request: Request) => {
  const id = request.url.split("user/")[1];
  try {
    const pendingContributions = await prisma.contribution.findMany({
      where: {
        status: "pending",
        userId: Number(id),
      },
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
        facility: true,
      },
    });
    const approvedContributions = await prisma.contribution.findMany({
      where: {
        status: "approved",
        userId: Number(id),
      },
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
        facility: true,
      },
    });
    const totalContributionDue = await prisma.contribution.findMany({
      where: {
        status: "pending",
        userId: Number(id),
      },
      orderBy: {
        id: "desc",
      },
    });
    const contributionDue = totalContributionDue[0]?.unpaidContribution || 0;
    const pendingContributionsValue = pendingContributions.reduce(
      (acc: any, value: any) => acc + value?.contributionAmount,
      0
    );
    const Approvedcontribution = approvedContributions.reduce(
      (acc: any, value: any) => acc + value?.contributionAmount,
      0
    );
    const latestContributionList = approvedContributions
      .slice(0, 5)
      .map((contribution: any) => ({
        id: contribution?.id,
        contributionAmount: contribution?.contributionAmount,
        depositReceiptNumber: contribution?.depositRecieptNumber,
        created_at: convertTimestamp(contribution?.createdAt),
        status: contribution?.status,
        amountDue:
          "RWF" +
          " " +
          new Intl.NumberFormat("en-US").format(
            contribution?.unpaidContribution
          ),
        unpaidContribution: contribution?.unpaidContribution,
        contributionPeriod: contribution?.contributionPeriod,
        paymentYear: extractYear(contribution?.YearOfContributionStart),
      }));
    const latestContributionListValue = latestContributionList.reduce(
      (acc: any, value: any) => acc + value?.contributionAmount,
      0
    );
    return NextResponse.json({
      status: 200,
      pendingContributionsValue,
      Approvedcontribution,
      latestContributionList,
      latestContributionListValue,
      contributionDue,
    });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
