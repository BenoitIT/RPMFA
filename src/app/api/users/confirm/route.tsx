import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";

export const PUT = async (request: NextRequest) => {
  const headers = request.headers;
  const token = headers.get("Authorization")?.split(" ")[1];

  try {
    if (token) {
      const payload: any = jwt.decode(token);
      if (!payload) return NextResponse.json({message:"Could not confirm this account"});
      const user = await prisma.user.update({
        where: {
          id: payload?.id,
        },
        data: {
          confirmed: true,
        },
      });
      return NextResponse.json({ status: 200, user });
    }
    else{
      return NextResponse.json(
        { message: "User not found or unable to update" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "User not found or unable to update" },
      { status: 404 }
    );
  }
};
