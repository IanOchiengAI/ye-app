'use client';

import Link from 'next/link';

export default function SchoolDashboardPlaceholder() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header */}
            <header style={{
                background: 'white',
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/" style={{
                        color: '#1A1A5E',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1.25rem'
                    }}>
                        ← Back
                    </Link>
                    <span style={{
                        background: '#1A1A5E',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }}>
                        ADMIN
                    </span>
                </div>
                <div style={{
                    background: '#FFD700',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    color: '#1A1A5E',
                    fontSize: '0.875rem'
                }}>
                    Coming Q3 2026
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: '3rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{
                        color: '#1A1A5E',
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        fontWeight: '800'
                    }}>
                        School Administrator Dashboard
                    </h1>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1.125rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Empower your institution with real-time insights into student progress,
                        engagement metrics, and life-skills development across your entire school.
                    </p>
                </div>

                {/* Feature Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {[
                        { icon: '📊', title: 'Live Analytics', desc: 'Track student engagement, completion rates, and skill development in real-time.' },
                        { icon: '👥', title: 'Student Management', desc: 'Manage cohorts, assign mentors, and monitor individual progress paths.' },
                        { icon: '📈', title: 'Impact Reports', desc: 'Generate detailed reports for stakeholders, MOEST compliance, and funding proposals.' },
                        { icon: '🔔', title: 'Smart Alerts', desc: 'Receive notifications when students need support or achieve milestones.' },
                    ].map((feature, i) => (
                        <div key={i} style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                            <h3 style={{ color: '#1A1A5E', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Mock Dashboard Preview */}
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid #f1f5f9'
                    }}>
                        <h3 style={{ color: '#1A1A5E', margin: 0 }}>Dashboard Preview</h3>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Demo Data</span>
                    </div>

                    {/* Mock Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        {[
                            { label: 'Total Students', value: '1,247', change: '+12%' },
                            { label: 'Active Today', value: '856', change: '+8%' },
                            { label: 'Modules Completed', value: '4,521', change: '+23%' },
                            { label: 'Avg. Score', value: '78%', change: '+5%' },
                        ].map((stat, i) => (
                            <div key={i} style={{
                                background: '#f8fafc',
                                padding: '1.25rem',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{stat.label}</div>
                                <div style={{ color: '#1A1A5E', fontSize: '1.75rem', fontWeight: '800' }}>{stat.value}</div>
                                <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>{stat.change}</div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1A1A5E 0%, #302b63 100%)',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Interested in bringing Youth Educated to your school?</h4>
                        <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>Join 50+ Kenyan schools already on our waitlist.</p>
                        <button style={{
                            background: '#FFD700',
                            color: '#1A1A5E',
                            border: 'none',
                            padding: '0.875rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}>
                            Join the Waitlist
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
