

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req;
    return null as any;
})

 export const config = {
    matcher: ["/dashboard"],
}



