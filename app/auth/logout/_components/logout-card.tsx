'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { signOut } from 'next-auth/react'

export default function LogoutCard() {
    const router = useRouter()

    const [seconds, setSeconds] = useState(5)

    useEffect(() => {
        const interval = setInterval(async () => {
            if (seconds <= 0) {
                await signOut()
            } else {
                setSeconds((prev) => prev - 1)
            }
        }, 1000)

        // Cleanup the interval on component unmount
        return () => clearInterval(interval)
    }, [seconds])

    return (
        <Card className="mx-auto max-w-xs w-full text-center">
            <CardHeader>
                <CardTitle className="text-xl">
                    Leaving already? {seconds}
                </CardTitle>
                <CardDescription>See you later 🥸 </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => router.back()} className="w-full">
                    Cancel
                </Button>
            </CardContent>
        </Card>
    )
}
