import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/', '/admin/', '/school-dashboard/'],
            },
        ],
        sitemap: 'https://youth-educated.vercel.app/sitemap.xml', // Update with your actual domain
    };
}
