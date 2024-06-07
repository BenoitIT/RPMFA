import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./validationSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (isUserExist) {
      return NextResponse.json({
        message: "User with that email arleady exist",
        status: 400,
      });
    }
    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashedPassword,
        email: body.email,
        phone:body.phone,
        title:body.title
      },
    });
    const token = jwt.sign(user, process.env.NEXT_JWT_SECRETE!);
    return NextResponse.json({
      message: "Your account is created successfully",
      status: 201,
      user,
      token,
    });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Facility: true,
      },
    });
    return NextResponse.json({ status: 200, users });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
