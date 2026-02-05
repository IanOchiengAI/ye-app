'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../dashboard.module.css'; // Reusing dashboard styles for consistency

export default function MentorDashboard() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!loading && (!user || profile?.role !== 'mentor')) {
            router.push('/dashboard'); // Redirect if not a mentor
        }
    }, [user, profile, loading, router]);

    if (loading || !profile) {
        return <div className="loader-container"><div className="loader"></div></div>;
    }

    // Mock data for mentor dashboard
    const upcomingSessions = [
        { id: 1, mentee: 'Kevin M.', time: 'Today, 4:00 PM', topic: 'Career Guidance', status: 'confirmed' },
        { id: 2, mentee: 'Sarah W.', time: 'Tomorrow, 2:00 PM', topic: 'University Application', status: 'pending' },
    ];

    return (
        <div className={styles.dashboardPage}>
            {/* Mentor Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/" className={styles.logo}>
                        <span>🎓</span>
                    </Link>
                    <div className={styles.headerTitle}>
                        <h1>Mentor Dashboard</h1>
                        <span className={styles.badge}>Beta</span>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.avatarBtn}>
                        {profile.displayName?.charAt(0) || 'M'}
                    </button>
                </div>
            </header>

            <main className={styles.main}>
                {/* Welcome Section */}
                <section className={styles.welcomeSection}>
                    <div className={styles.welcomeText}>
                        <p className={styles.greeting}>Habari, {profile.displayName}!</p>
                        <h2>Thank you for guiding the youth.</h2>
                    </div>
                </section>

                {/* Dynamic Status Alert */}
                {profile.status === 'pending' && (
                    <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
                        <h4>⏳ Profile Status: Pending Approval</h4>
                        <p>Thanks for signing up! Our team is verifying your profile details ({profile.profession}). You&apos;ll be notified once you&apos;re approved to accept mentees.</p>
                    </div>
                )}

                {profile.status === 'rejected' && (
                    <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
                        <h4>Application Update</h4>
                        <p>Thank you for your interest. Unfortunately, we cannot proceed with your application at this time.</p>
                    </div>
                )}

                {/* Quick Stats - Only show if active */}
                {profile.status === 'active' && (
                    <section className={styles.progressSection}>
                        <div className={styles.progressCard} style={{ justifyContent: 'space-around' }}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>3</span>
                                <span className={styles.statLabel}>Active Mentees</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>12</span>
                                <span className={styles.statLabel}>Sessions Held</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>15h</span>
                                <span className={styles.statLabel}>Hours Gifted</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* Upcoming Sessions - Only show if active */}
                {profile.status === 'active' && (
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Upcoming Sessions</h3>
                            <Link href="/dashboard/mentor/sessions" className={styles.seeAll}>See Calendar</Link>
                        </div>
                        {upcomingSessions.length > 0 ? (
                            <div className={styles.goalsList}>
                                {upcomingSessions.map(session => (
                                    <div key={session.id} className={styles.goalCard}>
                                        <div className={styles.goalInfo}>
                                            <p className={styles.goalTitle}>Meeting with {session.mentee}</p>
                                            <p className={styles.goalProgress} style={{ background: 'none', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                {session.time} • {session.topic}
                                            </p>
                                        </div>
                                        <span className={`badge ${session.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                            {session.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No upcoming sessions.</p>
                        )}
                    </section>
                )}

                {/* Quick Actions */}
                <section className={styles.quickActions}>
                    <Link href="/dashboard/mentor/profile" className={styles.actionCard}>
                        <span className={styles.actionIcon}>👤</span>
                        <span className={styles.actionLabel}>Edit Profile</span>
                    </Link>
                    <Link href="/dashboard/mentor/requests" className={styles.actionCard}>
                        <span className={styles.actionIcon}>📩</span>
                        <span className={styles.actionLabel}>Requests</span>
                    </Link>
                    <Link href="/dashboard/mentor/resources" className={styles.actionCard}>
                        <span className={styles.actionIcon}>📚</span>
                        <span className={styles.actionLabel}>Resources</span>
                    </Link>
                    <Link href="/settings" className={styles.actionCard}>
                        <span className={styles.actionIcon}>⚙️</span>
                        <span className={styles.actionLabel}>Settings</span>
                    </Link>
                </section>
            </main>

            {/* Mentor Bottom Nav */}
            <nav className={styles.bottomNav}>
                <Link href="/dashboard/mentor" className={`${styles.navItem} ${styles.active}`}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    <span>Home</span>
                </Link>
                <Link href="/dashboard/mentor/sessions" className={styles.navItem}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Sessions</span>
                </Link>
                <Link href="/dashboard/mentor/profile" className={styles.navItem}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Profile</span>
                </Link>
            </nav>
        </div>
    );
}
