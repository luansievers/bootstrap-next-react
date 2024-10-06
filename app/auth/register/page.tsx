import SignUpForm from './_components/sign-up-form'
import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'

export const metadata: Metadata = {
    title: 'Sign Up',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="sign-in"
            backButtonText="Sign in"
            backDescription="Already have an account?"
            description="Enter your information to create an account"
            title="Sign Up"
        >
            <SignUpForm />
        </AuthCard>
    )
}
