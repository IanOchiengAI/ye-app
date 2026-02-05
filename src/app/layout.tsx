import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/components.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
    title: 'Youth Educated - Mentorship & Life Skills for African Youth',
    description: 'Access human mentorship, life-skills curriculum, and AI-powered guidance. Empowering the next generation of African leaders.',
    manifest: '/manifest.json',
    keywords: ['youth', 'education', 'mentorship', 'life skills', 'Kenya', 'Africa'],
    authors: [{ name: 'Youth Educated' }],
    openGraph: {
        title: 'Youth Educated',
        description: 'Mentorship & Life Skills for African Youth',
        type: 'website',
        locale: 'en_KE',
    },
};

export const viewport: Viewport = {
    themeColor: '#1E1B4B',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Lato:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            </head>
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
