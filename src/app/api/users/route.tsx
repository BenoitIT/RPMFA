import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./validationSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
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
    },
  });
  const token = jwt.sign(user, process.env.NEXT_JWT_SECRETE!);
  return NextResponse.json({
    message: "Your account is created successfully",
    status: 201,
    user,
    token,
  });
};

export const GET = async () => {
  const users = await prisma.user.findMany({});
  return NextResponse.json({ status: 200, users });
};
