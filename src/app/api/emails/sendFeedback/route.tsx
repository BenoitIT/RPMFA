import { EmailTemplate } from "@/app/(components)/emailTemplates/feedbackGeneration";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const emailServer=process.env.NEXT_RESEND_APP_DOMAIN!;

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data, error } = await resend.emails.send({
    from: "rpmfa@rpmfa.org",
    to: body.email,
    subject: "RPMFA application feedback",
    react: EmailTemplate({
      firstName: body.firstName,
      subject: body.subject,
      message: body.message,
    }),
    text: "Your application has been responded with some feeback, review your documents",
  });

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data);
};
