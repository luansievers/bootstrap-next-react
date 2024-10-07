'use server'

import { prisma } from '@/prisma'

export const verify = async (token: string) => {
    const existingToken = await prisma.verificationToken.findUnique({
        where: { token },
    })

    if (!existingToken) {
        return { error: 'Token does not exist!' }
    }

    const isExpired = new Date(existingToken.expiresAt) < new Date()

    if (isExpired) {
        return { error: 'Token has expired!' }
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

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
        },
    })

    await prisma.verificationToken.update({
        where: { id: existingToken.id },
        data: {
            usedAt: new Date(),
        },
    })

    return { success: 'Email Verified!' }
}
