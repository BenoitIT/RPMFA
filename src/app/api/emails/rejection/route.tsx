import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/app/(components)/emailTemplates/rejectApplication";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const emailServer=process.env.NEXT_RESEND_APP_DOMAIN!;
export const POST= async (req:NextRequest) => {
  const body = await req.json();
  const { data, error } = await resend.emails.send({
    from: emailServer,
    to: body.email,
    subject: "Application has been rejected!",
    react: EmailTemplate({
      firstName: body.firstName,
      subject: "Application has been rejected!",
      message: body.message,
    }),
    text: "Your application has been rejected",
  });

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data);
};
