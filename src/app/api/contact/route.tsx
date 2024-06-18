import { NextRequest, NextResponse } from "next/server";
import schema from "./validation";
import prisma from "@/prisma/client";
export const revalidate = 0;
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const contact = await prisma.messages.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        subject: body.subject,
        email: body.email,
        message: body.message,
      },
    });
    if (contact) {
      return NextResponse.json({
        status: 201,
        message:
          "Your message has been delivered.Expect to hear from us very soon!",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Could not receive your message!. something went wrong",
      });
    }
  } catch (err) {
    return;
  }
};

export const GET = async () => {
  try {
    const messages = await prisma.messages.findMany({});
    return NextResponse.json({
      status: 200,
      data: messages,
    });
  } catch (err) {
    return;
  }
};
