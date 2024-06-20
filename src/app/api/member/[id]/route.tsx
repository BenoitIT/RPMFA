import { extractYear } from "@/app/utilities/timeParser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const PUT = async (request: NextRequest) => {
  try {
    const prisma = new PrismaClient();
    const id = request.url.split("member/")[1];
    const body = await request.json();
    if (id) {
      const member = await prisma.facility.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });
      const memberContribution = await prisma.contribution.findFirst({
        where: {
          userId: Number(member?.userId),
        },
      });
      if (member) {
        const contributionExistanceDiff =
          extractYear(member.createdAt) - extractYear(body.joinedAt) + 1;
        const unPaidContribution =
          member.defaultContribution * contributionExistanceDiff;
        if (!memberContribution && unPaidContribution > 0) {
          const updatedContri = await prisma.contribution.create({
            data: {
              contributionAmount: 0,
              depositRecieptNumber:
                Date.now() + "fake" + member?.userId?.toString(),
              facilityId: member?.id,
              contributionPeriod: contributionExistanceDiff,
              depositReciept: ["xxxxxxx"],
              userId: member.userId,
              unpaidContribution: unPaidContribution,
            },
          });
          const updatedmember = await prisma.facility.update({
            where: {
              id: Number(id),
            },
            data: {
              joinedAt: body.joinedAt,
              contributionChecked: true,
            },
          });
          await prisma.notification.create({
            data: {
              notification: `You can start contributing from now!`,
              senderId: 1,
              reciverId: member.user.id,
            },
          });
          return NextResponse.json({
            status: 200,
            application: updatedmember,
            contribution: updatedContri,
            message: "Membership is completely confirmed",
          });
        } else {
          return NextResponse.json({
            status: 400,
            message: "Unable to confirm this member",
          });
        }
      }
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
