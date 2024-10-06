import { Metadata } from 'next'
import ErrorCard from './_components/error-card'

export const metadata: Metadata = {
    title: 'Error',
}

export default function Page() {
    return <ErrorCard />
}
