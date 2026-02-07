import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/components.css';
import { AuthProvider } from '@/contexts/AuthContext';
import SWRegistration from '@/components/SWRegistration';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
    title: {
        default: 'Youth Educated - From Student to Professional in 30 Days',
        template: '%s | Youth Educated',
    },
    description: 'Join 15,000+ Kenyan students learning financial literacy, career planning, and professional skills. Get mentored by industry leaders from Safaricom, Equity Bank, and USAID. Free forever.',
    keywords: [
        'youth education Kenya',
        'life skills training',
        'financial literacy Kenya',
        'career mentorship',
        'KCSE preparation',
        'Safaricom mentors',
        'Kenyan students',
        'professional development',
        'soft skills training',
        'AI tutor Kenya',
    ],
    authors: [{ name: 'Youth Educated Team' }],
    creator: 'Youth Educated',
    publisher: 'Youth Educated',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    manifest: '/manifest.json',
    openGraph: {
        type: 'website',
        locale: 'en_KE',
        url: 'https://youth-educated.vercel.app',
        siteName: 'Youth Educated',
        title: 'Youth Educated - From Student to Professional in 30 Days',
        description: 'Join 15,000+ Kenyan students gaining real-world skills for careers and life. Mentored by Safaricom, Equity, and USAID professionals.',
        images: [
            {
                url: '/og-image.jpg', // You'll need to create this image
                width: 1200,
                height: 630,
                alt: 'Youth Educated - Life Skills for African Youth',
            },
        ],
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Youth Educated - From Student to Professional in 30 Days',
        description: 'Join 15,000+ Kenyan students gaining real-world skills for careers and life.',
        images: ['/og-image.jpg'],
        creator: '@YouthEducated', // Update with actual Twitter handle
    },
    alternates: {
        canonical: 'https://youth-educated.vercel.app',
    },
};

export const viewport: Viewport = {
    themeColor: '#1E1B4B',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

// Force dynamic rendering to prevent SSR/prerender errors with AuthProvider
export const dynamic = 'force-dynamic';

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
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Lato:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />

                {/* Google Analytics */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <>
                        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                        page_path: window.location.pathname,
                                    });
                                `,
                            }}
                        />
                    </>
                )}
            </head>
            <body>
                <ErrorBoundary>
                    <GoogleAnalytics />
                    <AuthProvider>
                        <SWRegistration />
                        {children}
                    </AuthProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
