

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
    return null as any;
})

 export const config = {
    matcher: ["/dashboard"],
}



