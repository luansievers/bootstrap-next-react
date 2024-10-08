import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'
import NewPasswordForm from './_components/new-password-form'

export const metadata: Metadata = {
    title: 'Password Reset',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="login"
            backButtonText="Login"
            backDescription="Back to"
            description="Enter a new password"
            title="Password Reset"
        >
            <div className="grid gap-6">
                <NewPasswordForm />
            </div>
        </AuthCard>
    )
}
