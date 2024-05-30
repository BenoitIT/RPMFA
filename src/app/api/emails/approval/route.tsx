import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/app/(components)/emailTemplates/approveApplication";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export  const POST= async (req:NextRequest) => {
  const body = await req.json();
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: body.email,
    subject: "Application has been approved",
    react: EmailTemplate({
      firstName: body.firstName,
      subject: "Application has been approved!",
    }),
    text: " We are grad to let you know that your application has been approved.\nYou are now a member of RPMFA",
  });

  if (error) {
    return NextResponse.json(error);
  }
  return NextResponse.json(data);
};
