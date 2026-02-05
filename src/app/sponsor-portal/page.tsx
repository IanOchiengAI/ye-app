'use client';

import Link from 'next/link';

export default function SponsorPortalPlaceholder() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1A1A5E 0%, #302b63 50%, #24243e 100%)',
            color: 'white',
        }}>
            {/* Header */}
            <header style={{
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <Link href="/" style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    opacity: 0.9
                }}>
                    ← Back to Home
                </Link>
                <div style={{
                    background: '#FF7A59',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '0.875rem'
                }}>
                    Coming Q2 2026
                </div>
            </header>

            {/* Hero */}
            <main style={{ padding: '4rem 2rem' }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.875rem',
                            marginBottom: '1rem',
                            display: 'inline-block'
                        }}>
                            🤝 For Partners & Sponsors
                        </span>
                        <h1 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            fontWeight: '800',
                            lineHeight: '1.2'
                        }}>
                            Partner & Sponsor Portal
                        </h1>
                        <p style={{
                            opacity: 0.8,
                            fontSize: '1.25rem',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Track your impact. See real stories. Know exactly how your contribution
                            is transforming the lives of Kenyan youth.
                        </p>
                    </div>

                    {/* Impact Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '4rem'
                    }}>
                        {[
                            { value: '15,000+', label: 'Students Sponsored', icon: '🎓' },
                            { value: '50+', label: 'Partner Schools', icon: '🏫' },
                            { value: '89%', label: 'Completion Rate', icon: '📈' },
                            { value: '4.8★', label: 'Student Satisfaction', icon: '⭐' },
                        ].map((stat, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                padding: '2rem',
                                borderRadius: '16px',
                                textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFD700' }}>{stat.value}</div>
                                <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Features Preview */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {[
                            {
                                title: 'Real-Time Impact Dashboard',
                                desc: 'Watch your investment come alive. See students complete modules, achieve milestones, and grow their skills in real-time.',
                                color: '#FFD700'
                            },
                            {
                                title: 'Student Success Stories',
                                desc: 'Receive monthly stories from the students you sponsor. Read their dreams, challenges, and victories.',
                                color: '#FF7A59'
                            },
                            {
                                title: 'Transparent Reporting',
                                desc: 'Detailed quarterly reports showing exactly where funds go: mentor payments, content creation, and student support.',
                                color: '#4ECDC4'
                            },
                        ].map((feature, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '2rem',
                                borderRadius: '16px',
                                borderLeft: `4px solid ${feature.color}`,
                            }}>
                                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                                <p style={{ opacity: 0.75, lineHeight: '1.6', fontSize: '0.95rem' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '3rem',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                            Ready to Change Lives?
                        </h2>
                        <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                            Every KES 500 you invest sponsors one student monthly access to mentorship,
                            life-skills training, and a path to a brighter future.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button style={{
                                background: '#FFD700',
                                color: '#1A1A5E',
                                border: 'none',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}>
                                Become a Sponsor
                            </button>
                            <button style={{
                                background: 'transparent',
                                color: 'white',
                                border: '2px solid rgba(255,255,255,0.3)',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}>
                                Partner With Us
                            </button>
                        </div>
                        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', opacity: 0.6 }}>
                            Contact: partners@youtheducated.co.ke
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
