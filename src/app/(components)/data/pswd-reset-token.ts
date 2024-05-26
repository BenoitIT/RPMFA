import prisma from "@/prisma/client";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const pswdResetToken = await prisma.passwordResetToken.findUnique({
            where:{ token }
        });
        return pswdResetToken;
    }catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const pswdResetEmail = await prisma.passwordResetToken.findFirst({
            where:{ email }
        });
        return pswdResetEmail;
    }catch (error) {
        return null;
    }
}
