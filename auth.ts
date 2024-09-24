import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './schemas/user'
import { compare } from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    providers: [
        Credentials({
            credentials: {
                username: { label: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                console.log(1)
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
