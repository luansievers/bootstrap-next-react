'use server'

import { prisma } from '@/prisma'
import { RegisterUserSchema } from '@/schemas/user'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export const registerUser = async (
    values: z.infer<typeof RegisterUserSchema>
) => {
    const { success, data } = RegisterUserSchema.safeParse(values)
    if (!success) return { error: 'Invalid Fields!' }

    const { email, password, name } = data
    if (await prisma.user.findUnique({ where: { email } })) {
        return { error: 'Email is already registered' }
    }

    const hashedPassword = await hash(password, 10)
    await prisma.user.create({
        data: { name, email, password: hashedPassword },
    })

    // TODO: send verification token

    return { success: 'User Created' }
}
