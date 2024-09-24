import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './schemas/user'
import { compare } from 'bcryptjs'
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession['user']
    }

    interface User {
        role: UserRole
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
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
    },
    providers: [
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
        signIn: '/sign-in',
        newUser: '/sign-up',
        // error: '/error',
    },
})
