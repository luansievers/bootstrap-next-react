import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'
import LoginForm from './_components/login-form'
import LoginGoogleButton from './_components/login-google-button'

export const metadata: Metadata = {
    title: 'Login',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="register"
            backButtonText="Register"
            backDescription="Don't have an account?"
            description="Enter your email below to login to your account"
            title="Login"
        >
            <div className="grid gap-6">
                <LoginForm />
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <LoginGoogleButton />
            </div>
        </AuthCard>
    )
}
