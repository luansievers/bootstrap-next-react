import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Settings',
}

export default async function Page() {
    const session = await auth()
    return (
        <div>
            <h1>Settings Page</h1>
            <p>{JSON.stringify(session)}</p>
            <Button>
                <Link href={'/auth/logout'}>Sign Out</Link>
            </Button>
        </div>
    )
}
