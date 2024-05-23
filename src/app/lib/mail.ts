import { Resend } from "resend";


const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
export const sendPasswordResetEmail = async(
    email:string,
    token: string,
) => {
    const resetLink = `${process.env.NEXT_APP_URL}/auth/reset_password?token=${token}`;
       
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Reset your password",
        html: `
        <h1>Reset your password</h1>
        <p>We heard that you lost your password. Sorry about that!</p>
        <p>But don’t worry! You can use the following link to reset your password:</p>
        <a href="${resetLink}">Reset your password</a>
        <p>If you don’t use this link within 1 hour, it will expire.</p>
        `,
    });
    


}