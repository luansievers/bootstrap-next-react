import { auth } from '@/auth'
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
        </div>
    )
}
