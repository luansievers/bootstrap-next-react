'use server'

import { sendPasswordResetEmail } from '@/lib/mail'
import { generateResetPasswordToken } from '@/lib/tokens'
import { prisma } from '@/prisma'
import { NewPasswordSchema, ResetPasswordSchema } from '@/schemas/user'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export const resetPasswordRequest = async (
    values: z.infer<typeof ResetPasswordSchema>
) => {
    const validatedFields = ResetPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid Fields!' }
    }

    const { email } = validatedFields.data

    /**
     * Filters only users that have passwords
     */
    const existingUser = await prisma.user.findUnique({
        where: { email: email, password: { not: null } },
    })

    if (!existingUser) {
        return { error: 'Email does not exist!' }
    }

    const passwordResetToken = await generateResetPasswordToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: 'Reset email sent!' }
}

export const saveNewPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: 'Token is missing' }
    }

    const validatedFields = NewPasswordSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid Fields!' }
    }

    const { password } = validatedFields.data

    const existingToken = await prisma.passwordResetToken.findUnique({
        where: { token },
    })

    if (!existingToken) {
        return { error: 'Token does not exist!' }
    }

    const isExpired = new Date(existingToken.expiresAt) < new Date()

    if (isExpired) {
        return { error: 'Token has expired! Please start the proccess again.' }
    }

    if (existingToken.usedAt) {
        return { error: 'Token has been used!' }
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: existingToken.email },
    })

    if (!existingUser) {
        return { error: 'Email does not exist!' }
    }

    const hashedPassword = await hash(password, 10)
    await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    })

    await prisma.passwordResetToken.update({
        where: { id: existingToken.id },
        data: {
            usedAt: new Date(),
        },
    })

    return { success: 'Password updated!' }
}
