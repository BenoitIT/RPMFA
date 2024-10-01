import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const revalidate = 0;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const yearParam = Number(searchParams.get("year")!);

  try {
    const pendingApplications = await prisma.facility.findMany({
      where: {
        status: "pending",
        createdAt: {
          gte: new Date(`${yearParam}-01-01T00:00:00.000Z`),
          lt: new Date(`${yearParam + 1}-01-01T00:00:00.000Z`),
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    const approvedApplications = await prisma.facility.findMany({
      where: {
        status: "approved",
        createdAt: {
          gte: new Date(`${yearParam}-01-01T00:00:00.000Z`),
          lt: new Date(`${yearParam + 1}-01-01T00:00:00.000Z`),
        },
      },
      include: {
        user: true,
      },
    });

    const rejectedApplications = await prisma.facility.findMany({
      where: {
        status: "rejected",
        createdAt: {
          gte: new Date(`${yearParam}-01-01T00:00:00.000Z`),
          lt: new Date(`${yearParam + 1}-01-01T00:00:00.000Z`),
        },
      },
      include: {
        user: true,
      },
    });

    const settledFacilities = await prisma.contribution.findMany({
      where: {
        status: "approved",
        YearOfContributionStart: {
          gte: new Date(`${yearParam}-01-01T00:00:00.000Z`),
          lt: new Date(`${yearParam + 1}-01-01T00:00:00.000Z`),
        },
      },
      include: {
        facility: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalSettledAmount = settledFacilities.reduce((acc, contrib) => {
      return (acc += contrib.contributionAmount);
    }, 0);

    const uniqueFacilitiesMap = new Map();
    for (const contribution of settledFacilities) {
      const facilityId = contribution?.facility?.id;


      if (!uniqueFacilitiesMap.has(facilityId)) {
        uniqueFacilitiesMap.set(facilityId, contribution);
      }
    }

    const settleContributionCount = uniqueFacilitiesMap.size;

    const members = approvedApplications.length;
    const application = pendingApplications.length;
    const rejections = rejectedApplications.length;

    const latestMembers = approvedApplications
      .slice(0, 6)
      .map((application: any) => ({
        id: application?.id,
        facilityName: application?.facilityName?.toLowerCase(),
        category: application?.facilityCategory,
        email: application?.user?.email,
        phone: application?.user?.phone,
        status: application?.status,
      }));

    return NextResponse.json({
      status: 200,
      members,
      application,
      rejections,
      latestMembers,
      settleContributionCount, 
      totalSettled: totalSettledAmount, 
    });

  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
