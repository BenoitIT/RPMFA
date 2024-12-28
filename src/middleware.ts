"use client"
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes";
import { toast } from "react-toastify";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedin = !!req.auth;
    const { pathname } = req.nextUrl;
    const user: any = req.auth?.user?.name
    const userRole = user?.role;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl?.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl?.pathname);
    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (isLoggedin) {
            if (userRole === "admin") {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return Response.redirect(new URL("/member/dashboard", nextUrl));
        }
        return null;
    }

    if (pathname.startsWith('/dashboard') && userRole !== 'admin') {
        toast.error('You are not authorized to access this page');
        return Response.redirect(new URL('/', req.url));
    }
    return null as any;
})

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!authHeader) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Authentication required",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    try {
      const token = authHeader.split(" ")[1];
      const isValidToken = await verifyToken(token);
      if (!isValidToken) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: "Invalid token",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      return NextResponse.next();
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Invalid token format",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
  return NextResponse.redirect(new URL("/home", request.url));
}
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRETE);
    console.log("token",token)
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload ? true : false;
  } catch (error) {
    return false;
  }
}

export const config = {
  matcher: [
    "/api/applications/",
    "/api/contribution/",
    "/api/members/",
    "/api/facility/",
    "/api/dashboardInfo",
  ],
};