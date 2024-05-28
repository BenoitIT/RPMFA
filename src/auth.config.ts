import prisma from "./prisma/client";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { LoginSchema } from './app/schemas';


const authConfig: NextAuthConfig = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await prisma.user.findUnique({
                        where: {
                            email
                        }
                    });
                    if (!user ||!user.password) {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) {
                        return {
                            id: user.id.toString(),
                            email: user.email,
                            userType: user.userType,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: user.password,
                            profileImage: user.profileImage,
                            confirmed: user.confirmed
                        };
                    }
                }
                return null;
            }
        })
    ]
};

export default authConfig;
