import prisma from "@/prisma/client";
import schema from "./validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { convertTimestamp } from "@/app/utilities/timeConverters";
import { extractYear } from "@/app/utilities/timeParser";
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
        message: "Receipt with this number has arleady registred",
        status: 400,
      });
    }
    const verifiedMembership = await prisma.facility.findFirst({
      where: {
        status: "approved",
        contributionChecked: true,
      },
    });
    if (verifiedMembership) {
      const checkInitialContributionInfo = await prisma.contribution.findFirst({
        where: {
          facilityId: body.facilityId,
          userId: body.userId,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      });
      if (
        checkInitialContributionInfo &&
        checkInitialContributionInfo.unpaidContribution > 0
      ) {
        let balanceExtraAmount: number = 0;
        let contributionBalance =
          checkInitialContributionInfo.unpaidContribution -
          body.contributionAmount;
        if (contributionBalance < 0) {
          balanceExtraAmount = Math.abs(contributionBalance);
          contributionBalance =
            balanceExtraAmount - verifiedMembership.defaultContribution;
        }
        const amountBalance =
          body.contributionAmount +
          checkInitialContributionInfo.contributionAmount;
        const contribution = await prisma.contribution.update({
          where: {
            id: checkInitialContributionInfo.id,
          },
          data: {
            contributionAmount: amountBalance,
            depositRecieptNumber: body.depositRecieptNumber,
            depositReciept: [
              ...checkInitialContributionInfo.depositReciept,
              ...body.depositReciept,
            ],
            unpaidContribution: contributionBalance,
          },
        });
        await prisma.notification.create({
          data: {
            notification: `New membership contribution has been raised!`,
            senderId: body.userId,
            reciverId: 1,
          },
        });
        return NextResponse.json({
          status: 201,
          data: contribution,
          message:
            "Your contribution is sent successfully and unpaid contribution balance is changed",
        });
      } else {
        let updatedUnPaidContributionBal: number;
        if (verifiedMembership.defaultContribution < body.contributionAmount) {
          updatedUnPaidContributionBal = 0;
        } else {
          updatedUnPaidContributionBal =
            verifiedMembership.defaultContribution - body.contributionAmount;
        }
        const contribution = await prisma.contribution.create({
          data: {
            contributionAmount: body.contributionAmount,
            depositRecieptNumber: body.depositRecieptNumber,
            facilityId: body.facilityId,
            depositReciept: body.depositReciept,
            YearOfContributionStart: body.YearOfContributionStart,
            userId: body.userId,
            unpaidContribution: updatedUnPaidContributionBal,
          },
        });
        await prisma.notification.create({
          data: {
            notification: `New membership contribution has been raised!`,
            senderId: body.userId,
            reciverId: 1,
          },
        });
        return NextResponse.json({
          status: 201,
          data: contribution,
          message: "Your contribution is sent successfully",
        });
      }
    }
    {
      return NextResponse.json({
        status: 400,
        data: null,
        message: "You have not yet been verified to start contributing",
      });
    }
  } catch (err) {
    console.log(err);
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
          amountPaid:
            "RWF" +
            " " +
            new Intl.NumberFormat("en-US").format(
              contribution?.contributionAmount
            ),
          image: contribution?.user?.profileImage,
          amountDue:
            "RWF" +
            " " +
            new Intl.NumberFormat("en-US").format(
              contribution?.unpaidContribution
            ),
          dueDate: convertTimestamp(contribution?.createdAt),
          status: contribution?.status,
          numberOfPeriod: contribution?.contributionPeriod,
          paymentYear: extractYear(contribution?.YearOfContributionStart),
        })),
      },
      {
        name: "Approved contributions",
        counts: approvedcontributions.length,
        data: approvedcontributions.map((contribution: any) => ({
          id: contribution?.id,
          facilityName: contribution?.facility?.facilityName,
          category: contribution?.facility?.facilityCategory,
          amountPaid:
            "RWF" +
            " " +
            new Intl.NumberFormat("en-US").format(
              contribution?.contributionAmount
            ),
          image: contribution?.user?.profileImage,
          amountDue:
            "RWF" +
            " " +
            new Intl.NumberFormat("en-US").format(
              contribution?.unpaidContribution
            ),
          dueDate: convertTimestamp(contribution?.createdAt),
          status: contribution?.status,
          numberOfPeriod: contribution?.contributionPeriod,
          paymentYear: extractYear(contribution?.YearOfContributionStart),
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
