'use server'
import { prisma } from '@/prisma'
import { RegisterUserSchema } from '@/schemas/user'
import { hash } from 'bcrypt'
import { z } from 'zod'

export const registerUser = async (
    values: z.infer<typeof RegisterUserSchema>
) => {
    const validatedFields = RegisterUserSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid Fields!' }
    }

    const { email, password, name } = validatedFields.data

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (existingUser) {
        return { error: 'Email is already registered' }
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    // TODO: send verification token

    return { success: 'User Created' }
}
