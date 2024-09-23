import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            // authorize: async (credentials) => {
            //     const { email, password } = await signInSchema.parseAsync(
            //         credentials
            //     )
            //     console.log(credentials, email, password)
            //     return null
            // },
            // authorize(credentials, request) {

            // },
            // authorize: async (credentials) => {
            //     try {
            //         const { email, password } = await signInSchema.parseAsync(
            //             credentials
            //         )
            //         const user = await prisma.user.findFirst({
            //             where: {
            //                 email,
            //             },
            //         })

            //         if (!user) {
            //             throw new Error('User not found.')
            //         }

            //         const passwordCorrect = await compare(
            //             password,
            //             user.password
            //         )

            //         // return user object with their profile data
            //         return user
            //     } catch (error) {
            //         if (error instanceof ZodError) {
            //             // Return `null` to indicate that the credentials are invalid
            //             return null
            //         }
            //     }
            // },
        }),
    ],
    // pages: {
    //     signIn: '/sign-in',
    //     newUser: '/sign-up',
    //     error: '/error',
    // },
})
