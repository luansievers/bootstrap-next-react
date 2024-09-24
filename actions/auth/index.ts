'use server'

import { signIn, signOut } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas/user'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid Fields!' }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' }
                default:
                    return { error: 'Something went wrong' }
            }
        }

        throw error
    }
}

export const logout = async () => {
    try {
        await signOut()
    } catch (error) {
        throw error
    }
}
