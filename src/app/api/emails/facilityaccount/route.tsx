import { NextRequest, NextResponse } from "next/server";
import { EmailFacilityCreationTemplate } from "@/app/(components)/emailTemplates/faciltyAccountCreation";
import { Resend } from "resend";
import prisma from "@/prisma/client";
export const runtime = "edge";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();

  const userId = body.userId;
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (isUserExist) {
    const userEmail = isUserExist?.email;
    const { data, error } = await resend.emails.send({
      from: "rpmfa@rpmfa.org",
      to: body.email,
      subject: "Health facility registration",
      react: EmailFacilityCreationTemplate({
        firstName: body.firstName,
        email: userEmail,
      }),
      html: ``,
    });

    if (error) {
      return NextResponse.json({ error: error });
    }
    return NextResponse.json({ status: 200, data });
  }
};
