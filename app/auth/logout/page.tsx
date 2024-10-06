import { Metadata } from 'next'
import LogoutCard from './_components/logout-card'

export const metadata: Metadata = {
    title: 'Logout',
}

export default function Page() {
    return <LogoutCard />
}
