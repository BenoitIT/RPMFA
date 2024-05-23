import * as z from 'zod';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const LoginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const ForgotSchema = z.object({
    email: z.string().min(1, 'Email is required'),
});

export const ResetPasswordSchema = z.object({
    password: z.string().min(1, 'Password is required')
});

export const ResetPasswordSchemaForm = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirm_password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});