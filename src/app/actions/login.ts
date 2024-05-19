'use server'

import * as z from 'zod';

import { LoginSchema } from '../schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { toast } from 'react-toastify';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid email or password' };
    }
    const { email, password } = validatedFields.data;
    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error?.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" };
                default:
                    return { error: "An error occurred" };
            }
        }
        console.log(error);
    }
}