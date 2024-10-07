'use client'

import { verify } from '@/actions/verification-token'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { PacmanLoader } from 'react-spinners'

export default function VerificationCard() {
    const router = useRouter()

    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    if (!token) {
        toast({
            title: 'Error',
            description: 'Missing token!',
        })
        router.push('/login')
    }

    useEffect(() => {
        verify(token!)
            .then((data) => {
                toast({
                    title: data.success ? 'Success' : 'Error',
                    description: data.success || data.error,
                })
            })
            .catch(() => {
                toast({
                    title: 'Error',
                    description: 'Oops, something went wrong!',
                })
            })
            .finally(() => {
                router.push('/login')
            })
    }, [router, token])

    return (
        <Card className="mx-auto max-w-xs w-full text-center">
            <CardHeader>
                <CardTitle className="text-xl">Wait a second...</CardTitle>
                <CardDescription>Validating request! 🥸 </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center w-full justify-center">
                    <PacmanLoader color="#f5e050" />
                </div>
                <div className="mt-10 text-center text-sm">
                    Back to{' '}
                    <Link href="login" className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
