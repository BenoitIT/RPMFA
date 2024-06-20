import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET(request: Request) {
  try {
    const id = request.url.split("notification/")[1];
    if (id) {
      const data = await prisma.notification.findMany({
        where: {
          reciverId: Number(id),
        },
      });
      if (data) {
        return NextResponse.json({
          status: 200,
          data: data,
        });
      }
      return NextResponse.json({
        status: 200,
        data: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      data: null,
    });
  }
}
export async function DELETE(request: Request) {
  try {
    const id = request.url.split("notification/")[1];
    if (id) {
      const data = await prisma.notification.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (data) {
        const deletion = await prisma.notification.delete({
          where: {
            id: Number(id),
          },
        });
        if (deletion) {
          return NextResponse.json({
            status: 200,
            data: data,
          });
        }
      }
      return NextResponse.json({
        status: 200,
        data: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      data: null,
    });
  }
}
