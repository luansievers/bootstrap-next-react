import { prisma } from '@/prisma'
import { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()

    // Expires in one hour
    const expires = new Date(new Date().getTime() + 3600 * 1000)

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
            expires,
        },
    })

    return verificationToken
}
