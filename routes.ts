/**
 * Array of routes that are acessible to the public
 * These rooutes don't require authentication
 *
 * For instance, landing pages and such...
 *
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/auth/verification']

/**
 * Array of routes that are used to authentication.
 * These routes will be redirect authenticated users to {DEFAULT_LOGIN_REDIRECT}
 *
 * @type {string[]}
 */
export const authRoutes: string[] = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
]

/**
 * The prefix for API authentication routes used by next-auth
 *
 * @type string
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * The default page to redirect after user obtain session
 *
 * @type string
 */
export const AFTER_LOGIN_REDIRECT: string = '/settings'

/**
 * The default page to redirect before user obtain session
 *
 * @type string
 */
export const BEFORE_LOGIN_REDIRECT: string = '/auth/login'
