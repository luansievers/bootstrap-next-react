import SignInForm from './_components/sign-in-form'
import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'

export const metadata: Metadata = {
    title: 'Sign In',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="sign-up"
            backButtonText="Sign Up"
            backDescription="Don't have an account?"
            description="Enter your email below to login to your account"
            title="Sign In"
        >
            <SignInForm />
        </AuthCard>
    )
}
