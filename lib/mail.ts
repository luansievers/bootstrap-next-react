import PasswordResetEmailTemplate from '@/components/email/password-reset-email-template'
import VerificationEmailTemplate from '@/components/email/verification-email-template'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `http://localhost:3000/auth/verification?token=${token}`

    const response = await resend.emails.send({
        from: 'Bootstrap <onboarding@resend.dev>',
        to: email,
        subject: 'Confirm your email',
        react: VerificationEmailTemplate({ confirmationLink }),
    })

    // TODO: store information about email sent
    console.log(response)
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const passwordResetLink = `http://localhost:3000/auth/new-password?token=${token}`

    const response = await resend.emails.send({
        from: 'Bootstrap <onboarding@resend.dev>',
        to: email,
        subject: 'Reset your password',
        react: PasswordResetEmailTemplate({ passwordResetLink }),
    })

    // TODO: store information about email sent
    console.log(response)
}
