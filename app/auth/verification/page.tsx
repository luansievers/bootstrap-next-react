import { Metadata } from 'next'
import VerificationCard from './_components/verification-card'

export const metadata: Metadata = {
    title: 'Verification',
}

export default function Page() {
    return <VerificationCard />
}
