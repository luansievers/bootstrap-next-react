import { auth } from '@/auth'
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
} from './routes'
import { NextResponse } from 'next/server'

export default auth((request) => {
    // console.log('ROUTE:', request.nextUrl.pathname)
    // console.log('IS LOGGED IN:', isLoggedIn)

    const { nextUrl } = request
    const isLoggedIn = !!request.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    // TODO: Check Roles

    // Allow public routes always
    if (isApiAuthRoute) {
        // returning empty it mean we will allow the acess
        return
    }

    // Authentication routes should only be accessible for non authenticated users
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
            )
        }
        return
    }

    // Non authenticated users that try to access a route that is not public
    // should be redirected to authentication page
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL('/sign-in', nextUrl))
    }

    return
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
