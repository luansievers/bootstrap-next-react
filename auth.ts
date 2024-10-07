import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { LoginSchema } from './schemas/user'
import { compare } from 'bcryptjs'
import { UserRole } from '@prisma/client'
// import { generateVerificationToken } from './lib/tokens'
import { AccessDenied } from '@auth/core/errors'
import { generateVerificationToken } from './lib/tokens'
import { sendVerificationEmail } from './lib/mail'

declare module 'next-auth' {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession['user']
    }

    interface User {
        role: UserRole
        emailVerified: Date | null
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    events: {
        // Automatically verify email for providers like Google
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            session.user.role = token.role as UserRole
            return session
        },
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') {
                return true
            }
            const verificationToken = await generateVerificationToken(
                user.email!
            )
            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
            )
            // TODO: Maybe redirect to verify page?
            throw new AccessDenied({
                cause: {
                    message: 'Confirmation email sent!',
                    type: 'VerificationEmailSent',
                },
            })
        },
    },
    providers: [
        Google,
        Credentials({
            credentials: {
                username: { label: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const { success, data } = LoginSchema.safeParse(credentials)

                if (!success) return null

                const { email, password } = data
                const user = await prisma.user.findUnique({ where: { email } })

                if (!user?.password) return null

                return (await compare(password, user.password)) ? user : null
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
        error: '/auth/error',
        signOut: '/auth/logout',
        // verifyRequest: '/auth/verify-request',
    },
})
