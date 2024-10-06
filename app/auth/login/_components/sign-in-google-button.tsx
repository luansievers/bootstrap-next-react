'use client'

import { Button } from '@/components/ui/button'

import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { AFTER_LOGIN_REDIRECT } from '@/routes'
import { useTransition } from 'react'

export default function SignInGoogleButton() {
    const [isPending, starTransition] = useTransition()
    const onClick = () => {
        starTransition(async () => {
            await signIn('google', {
                callbackUrl: AFTER_LOGIN_REDIRECT,
            })
        })
    }

    return (
        <Button
            variant="secondary"
            type="button"
            onClick={() => onClick()}
            disabled={isPending}
        >
            {isPending ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.google className="mr-2 h-4 w-4" />
            )}{' '}
            Google
        </Button>
    )
}
