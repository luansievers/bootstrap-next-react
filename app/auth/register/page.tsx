import RegisterForm from './_components/register-form'
import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'

export const metadata: Metadata = {
    title: 'Register',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="login"
            backButtonText="Login"
            backDescription="Already have an account?"
            description="Enter your information to create an account"
            title="Register"
        >
            <RegisterForm />
        </AuthCard>
    )
}
