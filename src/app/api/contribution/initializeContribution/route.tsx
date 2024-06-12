import { EmailContributionTemplate } from "@/app/(components)/emailTemplates/contributionPayment";
import { extractYear } from "@/app/utilities/timeParser";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
export const POST = async () => {
  const currentYear = new Date().getFullYear();

  const currentContribution = await prisma.contributingYearsMonitor.findFirst({
    where: {
      year: currentYear,
    },
    orderBy: {
      id: "desc",
    },
    take: 1,
  });
  if (!currentContribution?.id || !currentContribution?.initialized) {
    const contributingFacilities = await prisma.facility.findMany({
      where: {
        contributionChecked: true,
      },
      include: {
        user: true,
      },
    });
    contributingFacilities.map(async (facility: any) => {
      const facilityContribution = await prisma.contribution.findFirst({
        where: {
          facilityId: facility?.id,
        },
        include: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      });
      if (
        facilityContribution?.unpaidContribution &&
        facilityContribution?.unpaidContribution > 0 &&
        extractYear(facilityContribution?.YearOfContributionStart) < currentYear
      ) {
        const updatedUnpaidContributionAtStartOfYear =
          facilityContribution?.unpaidContribution +
          facility?.defaultContribution;
        const numberOfContributionPeriod =
          facilityContribution?.contributionPeriod + 1;
        await resend.emails.send({
          from: "rpmfa@rpmfa.org",
          to: facilityContribution.user.email,
          subject: "RPMFA application feedback",
          react: EmailContributionTemplate({
            subject: currentYear,
          }),
          text: "",
        });
        await prisma.contribution.update({
          where: {
            facilityId: facility?.id,
            depositRecieptNumber: facilityContribution.depositRecieptNumber,
          },
          data: {
            unpaidContribution: updatedUnpaidContributionAtStartOfYear,
            contributionPeriod: numberOfContributionPeriod,
          },
        });
      } else if (
        extractYear(facilityContribution?.YearOfContributionStart) < currentYear
      ) {
        await resend.emails.send({
          from: "rpmfa@rpmfa.org",
          to: facility.user.email,
          subject: "RPMFA application feedback",
          react: EmailContributionTemplate({
            subject: currentYear,
          }),
          text: "",
        });
        await prisma.contribution.create({
          data: {
            contributionAmount: 0,
            depositRecieptNumber: Date.now() + "00000" + facility?.id,
            facilityId: facility?.id,
            depositReciept: ["xxxxxxxxx"],
            userId: facility?.userId,
            unpaidContribution: facility?.defaultContribution,
          },
        });
      } else {
        const isCovered = true;
      }
    });
    await prisma.contributingYearsMonitor.create({
      data: {
        year: currentYear,
        initialized: true,
      },
    });
    return NextResponse.json({
      status: 200,
      message: `${currentYear}'s contributions are initialized for each member`,
    });
  } else {
    return NextResponse.json({
      status: 200,
      message: `${currentYear}'s contributions have been recently initialized`,
    });
  }
};
