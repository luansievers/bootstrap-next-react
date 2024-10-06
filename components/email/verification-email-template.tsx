import * as React from 'react'

interface Props {
    confirmationLink: string
}

export const VerificationEmailTemplate: React.FC<Readonly<Props>> = ({
    confirmationLink,
}) => (
    <p>
        Click <a href={confirmationLink}>here</a> to confirm email.
    </p>
)

export default VerificationEmailTemplate
