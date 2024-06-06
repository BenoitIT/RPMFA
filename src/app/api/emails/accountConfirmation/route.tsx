import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/app/(components)/emailTemplates/accountConfirmation";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const emailServer=process.env.NEXT_RESEND_APP_DOMAIN!;

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const APPURL = process.env.NEXT_APP_URL!;
  const { data, error } = await resend.emails.send({
    from: emailServer,
    to: body.email,
    subject: "Confirm your account",
    react: EmailTemplate({
      firstName: body.firstName,
      token: body.token,
      appUrl:APPURL
    }),
    html: `<a href="${APPURL}/confirm/${body.token}"> click this here to confirm your account </a>`,
  });

  if (error) {
    return NextResponse.json({ error: error });
  }
  return NextResponse.json({ status: 200, data });
};
