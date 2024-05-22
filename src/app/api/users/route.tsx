import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import schema from "./validationSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
      },
    });
    const token = jwt.sign(user, process.env.NEXT_JWT_SECRETE!);
    sendEmail(user, token);
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

const sendEmail = async (user: any, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
    auth: {
      user: process.env.NEXT_APP_EMAIL,
      pass: process.env.NEXT_APP_EMAILPASS,
    },
  });
  const info = await transporter.sendMail({
    from: `"Kalisimbi technology solution" <${process.env.NEXT_APP_EMAIL}>`,
    to: `${user?.email}`,
    subject: "Email confirmation",
    text: `Hello ${user?.email}!`,
    html: `<main style="margin: 0.4 2em 1em 0.4; font-family: 'Roboto', sans-serif;">
    <h3>Hello ${user?.firstName},</h3>

    <p >
        kindly click the button below.
    </p>
    <a href="https://rpmfa.vercel.app/confirm/${token}" style="text-decoration:none;">
    <button style="
    display: inline-block;
    padding: 0.5em 3em;
    border: 0.16em solid #FFFFFF;
    margin: 0 0.3em 0.3em 0;
    box-sizing: border-box;
    text-decoration: none;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    border-radius:30px;
    color: white;
    text-align: center;
    transition: all 0.15s;
    background: blue;
  ">
        Confirm an email
    </button>
    </a>

    <p >
        Thanks, <br>
        RPMFA
    </p>
</main>`,
  });

  console.log("Message sent: %s", info.messageId);
};

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({});
    return NextResponse.json({ status: 200, users });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
