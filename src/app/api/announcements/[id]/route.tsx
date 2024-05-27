import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const PUT = async (request: NextRequest) => {
  const body = await request.json();
  try {
    const id = request.url.split("announcements/")[1];
    if (id) {
      const announcement = await prisma.announcement.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (announcement) {
        const updatedAnnouncement = await prisma.announcement.update({
          where: {
            id: Number(id),
          },
          data: {
            subject: body.subject,
            announcementbody: body.announcementbody,
          },
        });

        return NextResponse.json({
          status: 200,
          announcement: updatedAnnouncement,
          message: "Announcement is updated successfully!",
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

export async function GET(request: Request) {
  try {
    const id = request.url.split("announcements/")[1];
    if (id) {
      const announcement = await prisma.announcement.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (announcement) {
        return NextResponse.json({
          status: 200,
          announcement: announcement,
        });
      }
      return NextResponse.json({
        status: 200,
        announcement: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      announcement: null,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = request.url.split("announcements/")[1];
    if (id) {
      const announcement = await prisma.announcement.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (announcement) {
        const announcementToDelete = await prisma.announcement.delete({
          where: {
            id: Number(id),
          },
        });
        if (announcementToDelete) {
          return NextResponse.json({
            status: 200,
            message: "Announcement is deleted successfully!",
          });
        } else {
          return NextResponse.json({
            status: 400,
            message: "Could not delete this announcement!",
          });
        }
      }
      return NextResponse.json({
        status: 200,
        announcement: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      announcement: null,
    });
  }
}
