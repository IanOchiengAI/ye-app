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

            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/images/logo.png"
                            alt="Youth Educated Logo"
                            width={180}
                            height={60}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>

                    <div className={styles.navLinks}>
                        <Link href="#rafiki" className={styles.navLink}>🦁 Rafiki AI</Link>
                        <Link href="#impact" className={styles.navLink}>Our Impact</Link>
                        <Link href="#features" className={styles.navLink}>Features</Link>
                        <Link href="#testimonials" className={styles.navLink}>Stories</Link>
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
                    <span className={styles.heroBadge}>✨ Trusted by 15,000+ Kenyan Students</span>
                    <h1 className={styles.heroTitle}>
                        From Student to <span className={styles.highlight}>Professional in 30 Days</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        Meet Rafiki, your AI study buddy who speaks Kiswahili! Join 15,000+ Kenyan students learning financial literacy, career planning, and professional skills—with 24/7 AI support and mentors from Safaricom, Equity, and beyond.
                    </p>
                    <div className={styles.heroCta}>
                        <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ background: 'linear-gradient(90deg, #FFD700, #FFA500)', border: 'none', color: '#0f0c29', fontWeight: 800 }}>
                            Start Learning Free →
                        </Link>
                        <Link href="#features" className={styles.secondaryCta}>
                            <span>Watch 2-Min Demo</span> ▶
                        </Link>
                    </div>
                    <div className={styles.heroStats}>
                        <div><strong>4.9/5</strong> Student Rating</div>
                        <div><strong>100%</strong> Free Access</div>
                        <div><strong>Offline</strong> Ready</div>
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

            {/* Meet Rafiki - Dedicated AI Section */}
            <section className={styles.rafikiSection} id="rafiki">
                <div className={styles.rafikiContent}>
                    <div className={styles.rafikiInfo}>
                        <span className={styles.rafikiLabel}>🤖 AI-Powered Learning</span>
                        <h2 className={styles.rafikiTitle}>
                            Meet <span className={styles.rafikiName}>Rafiki</span> 🦁
                        </h2>
                        <p className={styles.rafikiSubtitle}>
                            Your 24/7 AI Study Buddy Who Gets Kenya
                        </p>
                        <p className={styles.rafikiDescription}>
                            Stuck on CBC homework? Need KCSE prep tips? Wondering about careers in Kenya?
                            Rafiki speaks your language—literally. Chat in English, Kiswahili, or even Sheng!
                        </p>

                        <ul className={styles.rafikiFeatures}>
                            <li><span>📚</span> Understands CBC Curriculum & KCSE</li>
                            <li><span>🗣️</span> Speaks English, Kiswahili & Sheng</li>
                            <li><span>💼</span> Career advice for Kenyan job market</li>
                            <li><span>🧠</span> Mental wellness & study tips</li>
                            <li><span>📴</span> Works offline when internet is down</li>
                            <li><span>🆓</span> Free for all students</li>
                        </ul>

                        <div className={styles.rafikiCta}>
                            <Link href="/ai-companion" className="btn btn-primary btn-lg" style={{ background: 'linear-gradient(135deg, #1A1A5E 0%, #3B3B9E 100%)', border: 'none' }}>
                                Chat with Rafiki Now →
                            </Link>
                            <span className={styles.rafikiNote}>No signup required • Instant answers</span>
                        </div>
                    </div>

                    <div className={styles.rafikiDemo}>
                        <div className={styles.rafikiMascot}>
                            <div className={styles.mascotEmoji}>🦁</div>
                            <div className={styles.mascotGlow}></div>
                        </div>
                        <div className={styles.rafikiChat}>
                            <div className={styles.chatBubbleAi}>
                                <span className={styles.chatAvatar}>✨</span>
                                <div>
                                    <strong>Rafiki</strong>
                                    <p>Habari! 👋 Mimi ni Rafiki, your AI companion. Ask me anything about school, careers, or life!</p>
                                </div>
                            </div>
                            <div className={styles.chatBubbleUser}>
                                How do I prepare for KCSE in Form 3?
                            </div>
                            <div className={styles.chatBubbleAi}>
                                <span className={styles.chatAvatar}>✨</span>
                                <div>
                                    <p>Great question! Start early—Form 3 topics are 60% of KCSE! Here&apos;s my top tips:</p>
                                    <p>📖 Focus on understanding, not cramming<br />
                                        📝 Practice past papers from last 5 years<br />
                                        👥 Form study groups for tough subjects</p>
                                </div>
                            </div>
                            <div className={styles.chatPrompts}>
                                <button>💰 Money tips</button>
                                <button>🎯 Career paths</button>
                                <button>📚 Study help</button>
                            </div>
                        </div>
                    </div>
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
                    <span className={styles.sectionBadge}>Your Learning Toolkit</span>
                    <h2 className={styles.sectionTitle}>Skills That Employers Value</h2>
                    <p className={styles.sectionSubtitle}>
                        We&apos;ve built a platform that transforms students into job-ready professionals through practical, real-world education.
                    </p>
                </div>

                {/* Feature 1 */}
                <div className={styles.featureRow}>
                    <div className={styles.featureContent}>
                        <span className={styles.featureIcon}>⚡</span>
                        <h3>Learn Skills Employers Actually Need</h3>
                        <p>
                            Don&apos;t just memorize—master practical abilities that translate to real career opportunities. From financial literacy to public speaking, our modules are designed for the Kenyan job market.
                        </p>
                        <ul className={styles.featureList}>
                            <li>💰 Build your first budget and savings plan</li>
                            <li>🎯 Discover career paths in Kenya&apos;s top industries</li>
                            <li>🧠 Develop confidence and mental resilience</li>
                        </ul>
                        <Link href="/modules" className="btn btn-outline" style={{ color: '#FFD700', borderColor: '#FFD700' }}>Explore Courses</Link>
                    </div>
                    <div className={styles.featureImage}>
                        <Image src={IMAGES.learning} alt="High quality learning platform" width={500} height={350} loading="lazy" style={{ borderRadius: '16px', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Feature 2 */}
                <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
                    <div className={styles.featureContent}>
                        <span className={styles.featureIcon}>👑</span>
                        <h3>Get Mentored by Industry Leaders</h3>
                        <p>
                            Who you know opens doors. Connect with professionals from Safaricom, Equity Bank, and other leading Kenyan companies for career guidance, industry insights, and networking.
                        </p>
                        <ul className={styles.featureList}>
                            <li>🤝 1-on-1 mentor matching based on your goals</li>
                            <li>💼 Insider tips on breaking into your dream field</li>
                            <li>🌟 Build connections that last beyond graduation</li>
                        </ul>
                        <Link href="/mentors" className="btn btn-outline" style={{ color: '#00d4ff', borderColor: '#00d4ff' }}>Find Your Mentor</Link>
                    </div>
                    <div className={styles.featureImage}>
                        <Image src={IMAGES.mentorship} alt="Mentor connection" width={500} height={350} loading="lazy" style={{ borderRadius: '16px', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Feature 3 */}
                <div className={styles.featureRow}>
                    <div className={styles.featureContent}>
                        <span className={styles.featureIcon}>🧠</span>
                        <h3>Your AI Study Partner, Rafiki</h3>
                        <p>
                            Stuck on homework or need career advice? Rafiki is your 24/7 AI tutor trained on the Kenyan curriculum and job market. Ask questions in English, Swahili, or Sheng—Rafiki gets you.
                        </p>
                        <ul className={styles.featureList}>
                            <li>📚 KCSE prep and CBC curriculum help</li>
                            <li>💭 Career guidance tailored to Kenya</li>
                            <li>🌍 Chat in your language (English/Swahili/Sheng)</li>
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
                    <h2>Ready to Build Your Future?</h2>
                    <p>Join 15,000+ Kenyan students who are gaining the skills, connections, and confidence to succeed in their careers.</p>
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
        </div >
    );
}
