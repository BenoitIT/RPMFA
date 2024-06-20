import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const PUT = async (request: NextRequest) => {
  try {
    const id = request.url.split("certificate/")[1];
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
      if (member) {
        const updatedmember = await prisma.facility.update({
          where: {
            id: Number(id),
          },
          data: {
            membershipCertificate: body.certificate,
          },
        });
        const notification=await prisma.notification.create({
          data: {
            notification: "Your membership certificate is ready!",
            senderId: 1,
            reciverId: member.user.id,
          },
        });
        return NextResponse.json({
          status: 200,
          data: updatedmember,
          message: `Membership certificate is successfully ${updatedmember.facilityName} ${updatedmember.facilityCategory}`,
          notification
        });
      } else {
        return NextResponse.json({
          status: 400,
          message: "unable to send certificate",
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

export const GET = async (request: Request) => {
  try {
    const id = request.url.split("certificate/")[1];
    const memberShipCertificates = await prisma.facility.findMany({
      where: {
        userId: Number(id),
        status: "approved",
      },
    });
    if (memberShipCertificates) {
      return NextResponse.json({
        status: 200,
        data: memberShipCertificates,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
