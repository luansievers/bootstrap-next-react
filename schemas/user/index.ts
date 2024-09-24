import { z } from 'zod'

const emailSchema = z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email')

const passwordSchema = z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')

export const LoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export const RegisterUserSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required'),
    email: emailSchema,
    password: passwordSchema
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
})
