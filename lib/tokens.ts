import { prisma } from '@/prisma'
import { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()

    // Expires in one hour
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await prisma.verificationToken.findFirst({
        where: { email },
    })

    // If there is a existing token, lets delete it
    if (existingToken) {
        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    })

    return verificationToken
}

export const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4()

    // Expires in one hour
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await prisma.passwordResetToken.findFirst({
        where: { email },
    })

    // If there is a existing token, lets delete it
    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: { id: existingToken.id },
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    })

    return passwordResetToken
}
