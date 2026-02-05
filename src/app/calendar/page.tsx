'use client';

import Link from 'next/link';

export default function CalendarPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            padding: '2rem'
        }}>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem',
                gap: '1rem'
            }}>
                <Link href="/dashboard" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                <h1 style={{ fontSize: '1.5rem', color: '#1A1A5E', fontWeight: '800' }}>My Schedule</h1>
            </header>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Upcoming Events</h2>
                    <span style={{
                        background: '#e2e8f0',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#64748b'
                    }}>Oct 2026</span>
                </div>

                <div style={{ padding: '0' }}>
                    {[
                        { day: '12', month: 'OCT', title: 'Financial Literacy Workshop', time: '14:00 - 15:30', type: 'webinar' },
                        { day: '15', month: 'OCT', title: 'Mentor Session: Sarah Juma', time: '10:00 - 10:45', type: 'meeting' },
                        { day: '18', month: 'OCT', title: 'Module Deadline: Career Discovery', time: '23:59', type: 'deadline' },
                        { day: '22', month: 'OCT', title: 'Community AMA: Tech Careers', time: '16:00 - 17:00', type: 'event' },
                    ].map((event, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem 2rem',
                            borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                background: '#f8fafc',
                                padding: '0.5rem 1rem',
                                borderRadius: '12px',
                                minWidth: '70px'
                            }}>
                                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>{event.month}</span>
                                <span style={{ fontSize: '1.5rem', color: '#1A1A5E', fontWeight: '800' }}>{event.day}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#1e293b' }}>{event.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        🕒 {event.time}
                                    </span>
                                    <span style={{
                                        textTransform: 'capitalize',
                                        color: event.type === 'deadline' ? '#ef4444' : event.type === 'meeting' ? '#10b981' : '#3b82f6'
                                    }}>
                                        • {event.type}
                                    </span>
                                </div>
                            </div>
                            <button style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: 'white',
                                cursor: 'pointer',
                                fontWeight: '600',
                                color: '#64748b'
                            }}>
                                Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
