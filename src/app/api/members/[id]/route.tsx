import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const id = request.url.split("members/")[1];
    if (id) {
      const application = await prisma.facility.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });
      if (application) {
        return NextResponse.json({
          status: 200,
          application: application,
        });
      }
      return NextResponse.json({
        status: 200,
        application: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      application: null,
    });
  }
}
