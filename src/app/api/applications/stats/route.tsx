import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const GET = async () => {
  try {
    const pendingApplications = await prisma.facility.findMany({
      where: {
        status: "pending",
      },
      include: {
        user: true,
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
