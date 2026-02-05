'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './leaderboard.module.css';
import { useAuth } from '@/contexts/AuthContext';

// Mock Data
const MOCK_LEADERBOARD = [
    { id: 1, name: 'Kevin O.', school: 'Alliance High', points: 12500, growth: '+15%', badges: 12, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Sarah J.', school: 'Kenya High', points: 11800, growth: '+12%', badges: 10, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Brian K.', school: 'Mangu High', points: 11200, growth: '+8%', badges: 9, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Mercy W.', school: 'Precious Blood', points: 9800, growth: '+20%', badges: 8, avatar: null },
    { id: 5, name: 'John D.', school: 'Starehe Boys', points: 9500, growth: '+5%', badges: 7, avatar: null },
    { id: 6, name: 'Alice M.', school: 'Loreto Limuru', points: 9200, growth: '+10%', badges: 7, avatar: null },
    { id: 7, name: 'David O.', school: 'Maseno School', points: 8900, growth: '+7%', badges: 6, avatar: null },
    { id: 8, name: 'Faith N.', school: 'Moi Girls', points: 8500, growth: '+14%', badges: 6, avatar: null },
    { id: 9, name: 'James K.', school: 'Lenana School', points: 8100, growth: '+3%', badges: 5, avatar: null },
    { id: 10, name: 'Esther C.', school: 'Maryhill Girls', points: 7800, growth: '+9%', badges: 5, avatar: null },
];

export default function LeaderboardPage() {
    const { profile } = useAuth();

    // Toggle State: 'free' or 'premium'
    // Default to 'free' to show the locked state initially as requested, 
    // or 'premium' if the user is actually premium? 
    // The user asked for a toggle to demonstrate features.
    const [viewMode, setViewMode] = useState<'free' | 'premium'>('free');

    const topThree = MOCK_LEADERBOARD.slice(0, 3);
    const restOfList = MOCK_LEADERBOARD.slice(3);

    return (
        <div className={styles.leaderboardPage}>
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                <h1 className={styles.pageTitle}>Global Leaderboard</h1>
                <div className={styles.headerActions}>
                    {/* Placeholder for future actions */}
                </div>
            </header>

            <div className={styles.container}>
                {/* View Toggle */}
                <div className={styles.toggleContainer}>
                    <div
                        className={styles.toggleWrapper}
                        onClick={() => setViewMode(prev => prev === 'free' ? 'premium' : 'free')}
                    >
                        <div
                            className={styles.toggleSlider}
                            style={{
                                transform: viewMode === 'free' ? 'translateX(0)' : 'translateX(100%)',
                                width: '50%'
                            }}
                        />
                        <div className={`${styles.toggleOption} ${viewMode === 'free' ? styles.active : ''}`}>
                            Free View 🔒
                        </div>
                        <div className={`${styles.toggleOption} ${viewMode === 'premium' ? styles.active : ''}`}>
                            Premium View ✨
                        </div>
                    </div>
                </div>

                {/* Podium for Top 3 (Visible in both, but maybe less detailed in Free?) */}
                <div className={styles.podium}>
                    {/* Second Place */}
                    <div className={`${styles.podiumPlace} ${styles.secondPlace}`}>
                        <img src={topThree[1].avatar} alt={topThree[1].name} className={styles.podiumAvatar} />
                        <div className={styles.podiumStep}>2</div>
                        <div className={styles.podiumName}>{topThree[1].name}</div>
                        <div className={styles.podiumPoints}>{topThree[1].points.toLocaleString()} XP</div>
                    </div>

                    {/* First Place */}
                    <div className={`${styles.podiumPlace} ${styles.firstPlace}`}>
                        <div style={{ position: 'relative' }}>
                            <img src={topThree[0].avatar} alt={topThree[0].name} className={styles.podiumAvatar} />
                            <span style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem' }}>👑</span>
                        </div>
                        <div className={styles.podiumStep}>1</div>
                        <div className={styles.podiumName}>{topThree[0].name}</div>
                        <div className={styles.podiumPoints}>{topThree[0].points.toLocaleString()} XP</div>
                    </div>

                    {/* Third Place */}
                    <div className={`${styles.podiumPlace} ${styles.thirdPlace}`}>
                        <img src={topThree[2].avatar} alt={topThree[2].name} className={styles.podiumAvatar} />
                        <div className={styles.podiumStep}>3</div>
                        <div className={styles.podiumName}>{topThree[2].name}</div>
                        <div className={styles.podiumPoints}>{topThree[2].points.toLocaleString()} XP</div>
                    </div>
                </div>

                {/* The List Logic */}
                <div className={`${styles.list} ${viewMode === 'premium' ? styles.premiumMode : ''}`}>
                    {restOfList.map((user, index) => (
                        <div
                            key={user.id}
                            className={`
                                ${styles.listItem} 
                                ${viewMode === 'free' ? styles.blurred : ''}
                            `}
                        >
                            <div className={styles.rank}>{index + 4}</div>
                            <div className={styles.user}>
                                <div className={styles.avatarSmall}>
                                    {user.name.charAt(0)}
                                </div>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{user.name}</span>
                                    <span className={styles.userSchool}>{user.school}</span>
                                </div>
                            </div>

                            <div className={styles.stats}>
                                {/* Basic Stat (Visible to all usually, but blurred here in Free mode context) */}
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{user.points.toLocaleString()}</span>
                                    <span className={styles.statLabel}>XP</span>
                                </div>

                                {/* Premium Stats */}
                                {viewMode === 'premium' && (
                                    <>
                                        <div className={`${styles.statItem} ${styles.premiumStat}`}>
                                            <span className={styles.statValue} style={{ color: '#10b981' }}>{user.growth}</span>
                                            <span className={styles.statLabel}>Growth</span>
                                        </div>
                                        <div className={`${styles.statItem} ${styles.premiumStat}`}>
                                            <span className={styles.statValue}>{user.badges}</span>
                                            <span className={styles.statLabel}>Badges</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lock Overlay for Free Mode */}
                {viewMode === 'free' && (
                    <div className={styles.lockOverlay}>
                        <span className={styles.lockIcon}>🔒</span>
                        <h3 className={styles.lockTitle}>Unlock Full Rankings</h3>
                        <p className={styles.lockText}>
                            Free members see the Top 3. Upgrade to Premium to see your exact global ranking, compare schools, and track weekly growth.
                        </p>
                        <Link href="/premium" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                            Upgrade to Premium
                        </Link>
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', cursor: 'pointer' }} onClick={() => setViewMode('premium')}>
                            (Developer: Click Toggle above to test)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
