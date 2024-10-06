'use client'

import { useSearchParams } from 'next/navigation'
import AuthCard from '../../_components/auth-card'
import { Alert, AlertDescription } from '@/components/ui/alert'

enum Error {
    AccessDenied = 'AccessDenied',
    AdapterError = 'AdapterError',
    CallbackRouteError = 'CallbackRouteError',
    ErrorPageLoop = 'ErrorPageLoop',
    EventError = 'EventError',
    InvalidCallbackUrl = 'InvalidCallbackUrl',
    CredentialsSignin = 'CredentialsSignin',
    InvalidEndpoints = 'InvalidEndpoints',
    InvalidCheck = 'InvalidCheck',
    JWTSessionError = 'JWTSessionError',
    MissingAdapter = 'MissingAdapter',
    MissingAdapterMethods = 'MissingAdapterMethods',
    MissingAuthorize = 'MissingAuthorize',
    MissingSecret = 'MissingSecret',
    OAuthAccountNotLinked = 'OAuthAccountNotLinked',
    OAuthCallbackError = 'OAuthCallbackError',
    OAuthProfileParseError = 'OAuthProfileParseError',
    SessionTokenError = 'SessionTokenError',
    OAuthSignInError = 'OAuthSignInError',
    EmailSignInError = 'EmailSignInError',
    SignOutError = 'SignOutError',
    UnknownAction = 'UnknownAction',
    UnsupportedStrategy = 'UnsupportedStrategy',
    InvalidProvider = 'InvalidProvider',
    UntrustedHost = 'UntrustedHost',
    Verification = 'Verification',
    MissingCSRF = 'MissingCSRF',
    AccountNotLinked = 'AccountNotLinked',
    DuplicateConditionalUI = 'DuplicateConditionalUI',
    MissingWebAuthnAutocomplete = 'MissingWebAuthnAutocomplete',
    WebAuthnVerificationError = 'WebAuthnVerificationError',
    ExperimentalFeatureNotEnabled = 'ExperimentalFeatureNotEnabled',
}

const errorMap = {
    [Error.AccessDenied]: 'Access Denied',
    [Error.AdapterError]: 'Adapter Error',
    [Error.CallbackRouteError]: 'Callback Route Error',
    [Error.ErrorPageLoop]: 'Error Page Loop',
    [Error.EventError]: 'Event Error',
    [Error.InvalidCallbackUrl]: 'Invalid Callback URL',
    [Error.CredentialsSignin]: 'Invalid Credentials',
    [Error.InvalidEndpoints]: 'Invalid Endpoints',
    [Error.InvalidCheck]: 'Invalid Check',
    [Error.JWTSessionError]: 'JWT Session Error',
    [Error.MissingAdapter]: 'Missing Adapter',
    [Error.MissingAdapterMethods]: 'Missing Adapter Methods',
    [Error.MissingAuthorize]: 'Missing Authorize',
    [Error.MissingSecret]: 'Missing Secret',
    [Error.OAuthAccountNotLinked]: 'OAuth Account Not Linked',
    [Error.OAuthCallbackError]: 'OAuth Callback Error',
    [Error.OAuthProfileParseError]: 'OAuth Profile Parse Error',
    [Error.SessionTokenError]: 'Session Token Error',
    [Error.OAuthSignInError]: 'OAuth Sign In Error',
    [Error.EmailSignInError]: 'Email Sign In Error',
    [Error.SignOutError]: 'Sign Out Error',
    [Error.UnknownAction]: 'Unknown Action',
    [Error.UnsupportedStrategy]: 'Unsupported Strategy',
    [Error.InvalidProvider]: 'Invalid Provider',
    [Error.UntrustedHost]: 'Untrusted Host',
    [Error.Verification]: 'Verification Error',
    [Error.MissingCSRF]: 'Missing CSRF',
    [Error.AccountNotLinked]: 'Account Not Linked',
    [Error.DuplicateConditionalUI]: 'Duplicate Conditional UI',
    [Error.MissingWebAuthnAutocomplete]: 'Missing WebAuthn Autocomplete',
    [Error.WebAuthnVerificationError]: 'WebAuthn Verification Error',
    [Error.ExperimentalFeatureNotEnabled]: 'Experimental Feature Not Enabled',
}

export default function ErrorCard() {
    const search = useSearchParams()
    const error = search.get('error') as Error
    return (
        <AuthCard
            backButtonHref="sign-in"
            backButtonText="sign In"
            backDescription="Back to "
            description="Oops, something went wrong!"
            title="🔪 Error"
        >
            <Alert>
                <AlertDescription>
                    {errorMap[error] ||
                        'Please contact us if this error persists.'}
                </AlertDescription>
            </Alert>
        </AuthCard>
    )
}
