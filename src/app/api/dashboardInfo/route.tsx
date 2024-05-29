import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const revalidate = 0;
export const GET = async () => {
  try {
    const pendingApplications = await prisma.facility.findMany({
      where: {
        status: "pending",
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
      },
      include: {
        user: true,
      },
    });
    const rejectedApplications = await prisma.facility.findMany({
      where: {
        status: "rejected",
      },
      include: {
        user: true,
      },
    });
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
    });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
