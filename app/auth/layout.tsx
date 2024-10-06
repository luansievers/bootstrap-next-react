import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Authentication',
    description: 'Authentication forms built using the components.',
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="themes-wrapper bg-background w-full h-screen flex items-center justify-center px-4">
            {children}
        </div>
    )
}
