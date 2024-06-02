import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const revalidate = 0;
export const GET = async (req:Request) => {
    const userId = req.url.split("user/")[1];
  try {
    const pendingApplications = await prisma.facility.findMany({
      where: {
        status: "pending",
        userId: Number(userId),
      },
      include: {
        user: true,
      },
    });
    const approvedApplications = await prisma.facility.findMany({
      where: {
        status: "approved",
        userId: Number(userId),
      },
      include: {
        user: true,
      },
    });
    const rejectedApplications = await prisma.facility.findMany({
      where: {
        status: "rejected",
        userId: Number(userId),
      },
      include: {
        user: true,
      },
    });
    const tabs = [
      {
        name: "New Applicants",
        counts: pendingApplications.length,
        data: pendingApplications.map((application: any) => ({
          id: application?.id,
          facilityName: application?.facilityName?.toLowerCase(),
          category: application?.facilityCategory,
          email: application?.user?.email,
          phone: application?.user?.phone,
          status: application?.status,
        })),
      },
      {
        name: "Approved Applicants",
        counts: approvedApplications.length,
        data: approvedApplications.map((application: any) => ({
          id: application?.id,
          facilityName: application?.facilityName?.toLowerCase(),
          category: application?.facilityCategory,
          email: application?.user?.email,
          phone: application?.user?.phone,
          status: application?.status,
        })),
      },
      {
        name: "Declined Applicants",
        counts: rejectedApplications.length,
        data: rejectedApplications.map((application: any) => ({
          id: application?.id,
          facilityName: application?.facilityName?.toLowerCase(),
          category: application?.facilityCategory,
          email: application?.user?.email,
          phone: application?.user?.phone,
          status: application?.status,
        })),
      },
    ];
    return NextResponse.json({ status: 200, tabs });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
