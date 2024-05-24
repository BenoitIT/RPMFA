

import NextAuth from "next-auth";
import authConfig from "@/auth.config";

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
    const user: any = req.auth?.user.name
    const userRole = user?.role;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (isLoggedin) {
            if (userRole === "admin") {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return Response.redirect(new URL("/addfacility", nextUrl));
        }
        return null;
    }
    if (!isPublicRoute && !isLoggedin) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    if (pathname.startsWith('/dashboard') && userRole !== 'admin') {
        toast.error('You are not authorized to access this page');
        return Response.redirect(new URL('/', req.url));
    }
    return null as any;
})

export const config = {
    matcher: ["/dashboard"],
}


