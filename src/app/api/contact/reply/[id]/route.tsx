import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { EmailMessageTemplate } from "@/app/(components)/emailTemplates/messageReply";
import { Resend } from "resend";
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const id = request.url.split("reply/")[1];
    if (id) {
      const message = await prisma.messages.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (message) {
        const replyedMessage = await prisma.messages.update({
          where: {
            id: Number(id),
          },
          data: {
            response: body.response,
            responded: true,
          },
        });
        const sendingAnemail = await resend.emails.send({
          from: "rpmfa@rpmfa.org",
          to: body.email,
          subject: "Message from RPMFA",
          react: EmailMessageTemplate({
            message: body.message,
          }),
          text: "Thank you for you message to us",
        });
        console.log(sendingAnemail);
        return NextResponse.json({
          status: 200,
          data: replyedMessage,
          message: "Your response has been sent",
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
