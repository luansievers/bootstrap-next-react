'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

interface AuthCardProps {
    backButtonHref: string
    backButtonText: string
    backDescription: string
    children: React.ReactNode
    description: string
    title: string
}

export default function AuthCard({
    backButtonHref,
    backButtonText,
    backDescription,
    children,
    description,
    title,
}: AuthCardProps) {
    return (
        <Card className="mx-auto max-w-sm w-full">
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
                <div className="mt-4 text-center text-sm">
                    {backDescription}{' '}
                    <Link href={backButtonHref} className="underline">
                        {backButtonText}
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
