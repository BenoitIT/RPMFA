'use server'

import * as z from 'zod';

import { LoginSchema } from '../schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
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
        return { success: 'Welcome back!' };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error?.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" };
                default:
                    return { error: "An error occurred" };
            }
        }
    }
}