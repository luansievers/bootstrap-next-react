import EmailTemplate from '@/components/email/verification-email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`

    const response = await resend.emails.send({
        from: 'Bootstrap <onboarding@resend.dev>',
        to: email,
        subject: 'Confirm your email',
        react: EmailTemplate({ confirmationLink }),
    })

    // TODO: store information about email sent
    console.log(response)
}
