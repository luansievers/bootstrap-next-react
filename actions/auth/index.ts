'use server'

import { signIn } from '@/auth'
import { AFTER_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas/user'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { description: 'Invalid Fields!' }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: AFTER_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin')
                return { description: 'Invalid credentials' }
            if (
                error.type === 'AccessDenied' &&
                error.cause?.type === 'VerificationEmailSent'
            ) {
                return {
                    title: 'Please verify the email',
                    description: 'Confirmation email sent!',
                }
            }
            return { description: 'Something went wrong' }
        }
        throw error
    }
}
