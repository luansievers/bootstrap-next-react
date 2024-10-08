import * as React from 'react'

interface Props {
    passwordResetLink: string
}

export const PasswordResetEmailTemplate: React.FC<Readonly<Props>> = ({
    passwordResetLink,
}) => (
    <p>
        Click <a href={passwordResetLink}>here</a> to continue to the reset
        password page.
    </p>
)

export default PasswordResetEmailTemplate
