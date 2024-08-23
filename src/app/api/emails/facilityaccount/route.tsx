import { NextRequest, NextResponse } from "next/server";
import { EmailFacilityCreationTemplate } from "@/app/(components)/emailTemplates/faciltyAccountCreation";
import { Resend } from "resend";
import prisma from "@/prisma/client";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const APPURL = process.env.NEXT_APP_URL!;
export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();

  const userId = body.userId;
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  if (isUserExist) {
    const userEmail = isUserExist?.email;
    const { data, error } = await resend.emails.send({
      from: "rpmfa@rpmfa.org",
      to: userEmail,
      subject: "Health facility registration",
      react: EmailFacilityCreationTemplate({
        firstName: body.username,
        email: userEmail,
        appUrl: APPURL,
      }),
      html: ``,
    });

    if (error) {
      return NextResponse.json({ error: error });
    }
    return NextResponse.json({ status: 200, data });
  }
};
