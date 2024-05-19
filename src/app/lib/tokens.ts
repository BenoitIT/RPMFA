// import { v4 as uuidv4 } from 'uuid';
import prisma from '@/prisma/client';
import jwt from 'jsonwebtoken';
// import 
import { getPasswordResetTokenByEmail } from '../(components)/data/pswd-reset-token';

export const generatePasswordResetToken = async (email: string) => {
     const token = jwt.sign({ email }, process.env.NEXT_JWT_SECRETE!, {
            expiresIn: '1h'
        });

     const expires = new Date(new Date().getTime() + 3600 * 1000);

     const existingToken  =  await getPasswordResetTokenByEmail(email);

     if(existingToken){
        await prisma.passwordResetToken.delete({
            where: { id: existingToken.id }
        });
     }

     const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
     });

     

    return passwordResetToken;
}