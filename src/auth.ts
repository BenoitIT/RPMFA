import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/client";
import authConfig from "@/auth.config";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ token, session}) {
            console.log({sessionToken: token, 
                session
            });
            if(token.sub && session.user){
            session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token  }){
            if(!token.sub)return token;
            const existingUser = await prisma.user.findUnique({
                where: {
                  id: Number(token.sub),
                },
              });
            if(existingUser){
                token.name = existingUser.firstName + " " + existingUser.lastName;
                token.email = existingUser.email;
                token.image = existingUser.profileImage;
                token.id = existingUser.id;
            }
            token.customField = "customField";
            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt"},
    ...authConfig,
});