"use server"

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { ResetPasswordSchema } from '../schemas';
import prisma from '@/prisma/client';

export const reset = async (values: z.infer<typeof ResetPasswordSchema> ,
    token?: string | null) => {
        if (!token) {
            return { error: 'Missing token!' };
        }
        const validatedFields = ResetPasswordSchema.safeParse(values);
        if (!validatedFields.success) {
            return { error: 'Invalid password' };
        }
        const { password } = validatedFields.data;
        const existingToken = await prisma.passwordResetToken.findFirst({
            where: {
                token
            }
        });
        if (!existingToken) {
            return { error: 'Invalid token!' };
        }
        const hasExpired = new Date() > existingToken.expires;
        if (hasExpired) {
            return { error: 'Token has expired!' };
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: existingToken.email
            }
        });

        if (!existingUser) {
            return { error: 'User not found!' };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                password: hashedPassword
            }
        });

        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        });

        return { message: 'Password reset successfully!' };
    }