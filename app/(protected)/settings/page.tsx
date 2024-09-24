import { logout } from '@/actions/auth'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Settings',
}

export default async function Page() {
    const session = await auth()
    return (
        <div>
            <h1>Settings Page</h1>
            <p>{JSON.stringify(session)}</p>
            <form action={logout}>
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    )
}
