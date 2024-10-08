import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'
import ResetPasswordForm from './_components/reset-password-form'

export const metadata: Metadata = {
    title: 'Password Reset',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="login"
            backButtonText="Login"
            backDescription="Back to"
            description="Enter your email below"
            title="Password Reset"
        >
            <div className="grid gap-6">
                <ResetPasswordForm />
            </div>
        </AuthCard>
    )
}
