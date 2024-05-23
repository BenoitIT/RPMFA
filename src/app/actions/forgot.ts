"use server"

import * as z from "zod";

import { ForgotSchema } from "../schemas";
import prisma from "@/prisma/client";
import { sendPasswordResetEmail } from "../lib/mail";
import { generatePasswordResetToken } from "../lib/tokens";

export const forgot = async (values: z.infer<typeof ForgotSchema>) => {

    const validation = ForgotSchema.safeParse(values);

    if (!validation.success) {
        return { error: validation.error.errors[0].message };
    }

    const { email } = validation.data;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return { error: "User with that email does not exist" };
    }

    const resetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        resetToken.email,
        resetToken.token
    );

    return { message: "Check your email for password reset link" };
}