import { Metadata } from 'next'
import AuthCard from '../_components/auth-card'
import SignInForm from './_components/sign-in-form'
import SignInGoogleButton from './_components/sign-in-google-button'

export const metadata: Metadata = {
    title: 'Sign In',
}

export default function Page() {
    return (
        <AuthCard
            backButtonHref="register"
            backButtonText="Sign Up"
            backDescription="Don't have an account?"
            description="Enter your email below to login to your account"
            title="Sign In"
        >
            <div className="grid gap-6">
                <SignInForm />
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
                <SignInGoogleButton />
            </div>
        </AuthCard>
    )
}
