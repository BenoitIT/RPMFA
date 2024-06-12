import { EmailContApproveTemplate } from "@/app/(components)/emailTemplates/contributionApprove";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
export const revalidate=0;
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
export async function GET(request: Request) {
  try {
    const id = request.url.split("contribution/")[1];
    if (id) {
      const contribution = await prisma.contribution.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
          facility: true,
        },
      });
      if (contribution) {
        return NextResponse.json({
          status: 200,
          contribution: contribution,
        });
      }
      return NextResponse.json({
        status: 200,
        contribution: null,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
      contribution: null,
    });
  }
}
export const PUT = async (request: NextRequest) => {
  try {
    const id = request.url.split("contribution/")[1];
    if (id) {
      const contribution = await prisma.contribution.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });
      if (contribution) {
        const updatedcontribution = await prisma.contribution.update({
          where: {
            id: Number(id),
          },
          data: {
            status: "approved",
          },
        });
        await resend.emails.send({
          from: "rpmfa@rpmfa.org",
          to: contribution.user.email,
          subject: "Your membership contribution is approved",
          react: EmailContApproveTemplate({
            firstName: contribution.user.firstName,
          }),
          text:"",
        });
        return NextResponse.json({
          status: 200,
          contribution: updatedcontribution,
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
