'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import styles from './page.module.css';

// Real Unsplash image URLs for African students/education context
const IMAGES = {
    hero: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80',
    students: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    mentorship: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    learning: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    graduate: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    community: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
};

// Testimonials data
const testimonials = [
    {
        name: 'Wanjiku M.',
        role: 'Form 4 Student, Nairobi',
        quote: 'Youth Educated helped me understand financial literacy in a way my school never did. I now have a savings plan for university!',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
    },
    {
        name: 'Kamau O.',
        role: 'Recent Graduate, Mombasa',
        quote: 'The mentorship program connected me with a software engineer at Safaricom. She helped me land my first internship!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    },
    {
        name: 'Achieng L.',
        role: 'University Student, Kisumu',
        quote: 'Rafiki AI understood my stress about KCSE results and gave me real advice. It felt like talking to a wise older sibling.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
];

// Impact stats
const stats = [
    { number: '15,000+', label: 'Students Empowered' },
    { number: '500+', label: 'Mentors Connected' },
    { number: '50,000+', label: 'Learning Hours' },
    { number: '47', label: 'Counties Reached' },
];

export default function Home() {
    const { user, loading } = useAuth();
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.landing}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                🇰🇪 Empowering Kenyan Youth Since 2020 — Join 15,000+ Students Today!
            </div>

            {/* Header */}
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        Youth<span className={styles.logoAccent}>Educated</span>
                    </Link>

                    <div className={styles.navLinks}>
                        <Link href="#impact" className={styles.navLink}>Our Impact</Link>
                        <Link href="#features" className={styles.navLink}>Features</Link>
                        <Link href="#testimonials" className={styles.navLink}>Stories</Link>
                        <Link href="#mentors" className={styles.navLink}>Mentors</Link>
                    </div>

                    <div className={styles.authButtons}>
                        {loading ? (
                            <span>...</span>
                        ) : user ? (
                            <Link href="/dashboard" className="btn btn-primary">
                                My Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/login" className={styles.loginLink}>Log In</Link>
                                <Link href="/auth/signup" className="btn btn-primary">
                                    Get Started Free
                                </Link>
                            </>
                        )}
                    </div>

                    <button className={styles.mobileMenuBtn} aria-label="Menu">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>✨ The Home of Kenyan Excellence</span>
                    <h1 className={styles.heroTitle}>
                        Ready to Become <span className={styles.highlight}>Unstoppable?</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        Stop guessing your future. Master high-income life skills, grab certified credentials, and get mentored by Kenya&apos;s industry giants. Your dream career starts here.
                    </p>
                    <div className={styles.heroCta}>
                        <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ background: 'linear-gradient(90deg, #FFD700, #FFA500)', border: 'none', color: '#0f0c29', fontWeight: 800 }}>
                            Join the Movement →
                        </Link>
                        <Link href="#features" className={styles.secondaryCta}>
                            <span>See our magic</span> ✨
                        </Link>
                    </div>
                    <div className={styles.heroStats}>
                        <div><strong>4.9/5</strong> Star Rating</div>
                        <div><strong>Free</strong> Forever</div>
                        <div><strong>Offline</strong> Mode</div>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <Image
                        src={IMAGES.hero}
                        alt="Kenyan students celebrating success"
                        width={600}
                        height={500}
                        priority
                        style={{ borderRadius: '24px', objectFit: 'cover' }}
                    />
                </div>
            </section>

            {/* Trusted By Section */}
            <section className={styles.trustedBy}>
                <p>Powering the next generation with</p>
                <div className={styles.partnerLogos}>
                    <span className={styles.partnerLogo}>SAFARICOM</span>
                    <span className={styles.partnerLogo}>EQUITY GROUP</span>
                    <span className={styles.partnerLogo}>USAID KENYA</span>
                    <span className={styles.partnerLogo}>KCB BANK</span>
                    <span className={styles.partnerLogo}>UNICEF</span>
                </div>
            </section>

            {/* Impact Stats */}
            <section className={styles.statsSection} id="impact">
                <div className={styles.statsGrid}>
                    {stats.map((stat, idx) => (
                        <div key={idx} className={styles.statCard}>
                            <div className={styles.statNumber}>{stat.number}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection} id="features">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>Your Ultimate Toolkit</span>
                    <h2 className={styles.sectionTitle}>Built for Winners</h2>
                    <p className={styles.sectionSubtitle}>
                        We&apos;ve condensed years of life experience into a platform that makes success inevitable.
                    </p>
                </div>

                {/* Feature 1 */}
                <div className={styles.featureRow}>
                    <div className={styles.featureContent}>
                        <span className={styles.featureIcon}>⚡</span>
                        <h3>Skills That Pay the Bills</h3>
                        <p>
                            Don&apos;t just study — evolve. From mastering your first million to crushing public speaking, our modules are short, punchy, and life-changing.
                        </p>
                        <ul className={styles.featureList}>
                            <li>🔥 High-impact financial literacy</li>
                            <li>🔥 Modern career pathfinding</li>
                            <li>🔥 Mental health for high-performers</li>
                        </ul>
                        <Link href="/modules" className="btn btn-outline" style={{ color: '#FFD700', borderColor: '#FFD700' }}>Start Learning Now</Link>
                    </div>
                    <div className={styles.featureImage}>
                        <Image src={IMAGES.learning} alt="High quality learning platform" width={500} height={350} style={{ borderRadius: '16px', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Feature 2 */}
                <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
                    <div className={styles.featureContent}>
                        <span className={styles.featureIcon}>👑</span>
                        <h3>Access to the Inner Circle</h3>
                        <p>
                            Who you know matters. Get direct access to the leaders driving Kenya&apos;s economy. Real talk, real advice, real results.
                        </p>
                        <ul className={styles.featureList}>
                            <li>💎 1-on-1 VIP Mentorship</li>
                            <li>💎 Insider industry tips</li>
                            <li>💎 Networking like a pro</li>
                        </ul>
                        <Link href="/mentors" className="btn btn-outline" style={{ color: '#00d4ff', borderColor: '#00d4ff' }}>Meet Your Mentor</Link>
                    </div>
                    <div className={styles.featureImage}>
                        <Image src={IMAGES.mentorship} alt="Mentor connection" width={500} height={350} style={{ borderRadius: '16px', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Feature 3 */}
                <div className={styles.featureRow}>
                    <div className={styles.featureContent}>
                        <span className={styles.featureIcon}>🧠</span>
                        <h3>Your Personal Study Guide</h3>
                        <p>
                            Rafiki isn't just a chatbot — it's a study partner that never gets tired. Stuck on a math problem or need advice in Sheng? Rafiki is here to help you understand, not just answer.
                        </p>
                        <ul className={styles.featureList}>
                            <li>🚀 clear explanations for difficult topics</li>
                            <li>🚀 Practice questions for KCSE</li>
                            <li>🚀 Multilingual Support (Swahili/Sheng)</li>
                        </ul>
                        <Link href="/ai-companion" className="btn btn-primary" style={{ background: '#1A1A5E', border: 'none' }}>Chat with Rafiki</Link>
                    </div>
                    <div className={styles.featureImage}>
                        <div className={styles.aiMockup}>
                            <div className={styles.aiHeader}><span>✨</span> Rafiki AI <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>ONLINE</span></div>
                            <div className={styles.aiMessage}>Sasa! Ready to crush your goals today? 🇰🇪</div>
                            <div className={styles.aiUserMessage}>I want to be a top CEO one day...</div>
                            <div className={styles.aiMessage}>That&apos;s the spirit! It starts with the right habits. Let&apos;s map out your path... 🚀</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className={styles.testimonialsSection} id="testimonials">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>Success Stories</span>
                    <h2 className={styles.sectionTitle}>Hear From Our Community</h2>
                </div>
                <div className={styles.testimonialsGrid}>
                    {testimonials.map((t, idx) => (
                        <div key={idx} className={styles.testimonialCard}>
                            <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                            <div className={styles.testimonialAuthor}>
                                <Image src={t.avatar} alt={t.name} width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <div className={styles.authorName}>{t.name}</div>
                                    <div className={styles.authorRole}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2>Ready to Transform Your Future?</h2>
                    <p>Join thousands of Kenyan youth who are building the skills, connections, and confidence to succeed.</p>
                    <Link href="/auth/signup" className="btn btn-lg" style={{ background: 'var(--color-yellow)', color: 'var(--color-primary)' }}>
                        Start Your Journey — It&apos;s Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <Link href="/" className={styles.logo}>
                            Youth<span className={styles.logoAccent}>Educated</span>
                        </Link>
                        <p>It Starts With You(th)</p>
                        <p>© {currentYear} Youth Educated Kenya. All rights reserved.</p>
                    </div>
                    <div className={styles.footerLinks}>
                        <div>
                            <h4>Platform</h4>
                            <Link href="/modules">Courses</Link>
                            <Link href="/mentors">Mentors</Link>
                            <Link href="/ai-companion">Rafiki AI</Link>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <Link href="/about">About Us</Link>
                            <Link href="/careers">Careers</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>Made with ❤️ in Nairobi for Africa&apos;s next generation.</p>
                </div>
            </footer>
        </div>
    );
}
