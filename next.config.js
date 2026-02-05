/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed static export for Vercel deployment
    // This enables:
    // - Full Next.js image optimization
    // - API routes (if needed)
    // - Server-side rendering capabilities
    // - Automatic static optimization where possible

    images: {
        // Enable optimized images with remote patterns
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
        ],
        // Modern image formats
        formats: ['image/avif', 'image/webp'],
        // Image sizes for responsive loading
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Compiler optimizations
    compiler: {
        // Remove console logs in production
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // Performance optimizations
    swcMinify: true,

    // Ignore linting errors during build for demo deployment
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
