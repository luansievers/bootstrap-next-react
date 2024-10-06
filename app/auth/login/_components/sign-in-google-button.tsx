'use client'

import { Button } from '@/components/ui/button'

import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { AFTER_LOGIN_REDIRECT } from '@/routes'

export default function SignInGoogleButton() {
    const onClick = () => {
        signIn('google', {
            callbackUrl: AFTER_LOGIN_REDIRECT,
        })
    }

    return (
        <Button variant="secondary" type="button" onClick={() => onClick()}>
            <Icons.google className="mr-2 h-4 w-4" /> Google
        </Button>
    )
}
