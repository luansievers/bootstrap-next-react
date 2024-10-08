import { z } from 'zod'

/**
 * Common Fields Validation
 */

const emailSchema = z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email')

const passwordLoginSchema = z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')

const passwordSchema = passwordLoginSchema
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')

/**
 * Schemas
 */

export const LoginSchema = z.object({
    email: emailSchema,
    password: passwordLoginSchema,
})

export const RegisterUserSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required'),
    email: emailSchema,
    password: passwordSchema,
})

export const ResetPasswordSchema = z.object({
    email: emailSchema,
})

export const NewPasswordSchema = z.object({
    password: passwordSchema,
})
