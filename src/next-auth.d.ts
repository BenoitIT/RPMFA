import NextAuth, {type DefaultSession} from "next-auth";
export type ExtendedUSer =  DefaultSession["user"] & {
    role: 'admin' | 'member'
}
declare module "next-auth" {
    interface Session {
        user:ExtendedUSer
    }

}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt"{
    interface JWT {
        role?: "admin" | "member"
    }
}