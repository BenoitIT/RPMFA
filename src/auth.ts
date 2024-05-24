import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/client";
import authConfig from "@/auth.config";

export const { handlers: { GET, POST }, auth, signIn, signOut, } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }: any) {
      if (!token.sub) return token;
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(token.sub) },
      });
      if (existingUser) {
        token.name = {
          first: existingUser.firstName,
          last: existingUser.lastName,
          role: existingUser.userType,
        };
        token.role = existingUser.userType;
        token.email = existingUser.email;
        token.image = "https://ui-avatars.com/api/?name=" + token.name;
        token.id = existingUser.id;
        token.role = existingUser.userType;
        token.sub
        token
      }
      token.customField = "customField";
      const isAdmin = token.role === "admin";
      token.redirectUrl = isAdmin ? "/dashboard" : "/getstarted";
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});