'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useMenteeProgress } from '@/hooks/useMenteeProgress';
import styles from './dashboard.module.css';

// Life Skills Paths - Focus on mentorship and personal development
const LIFE_SKILLS = [
    {
        id: '1',
        title: 'Money & Financial Literacy',
        category: 'Life Skills',
        thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80',
        lessons: 8,
        mentorTips: 12,
        progress: 45
    },
    {
        id: '2',
        title: 'Career Discovery',
        category: 'Future Ready',
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
        lessons: 6,
        mentorTips: 10,
        progress: 10
    },
    {
        id: '3',
        title: 'Communication & Confidence',
        category: 'Soft Skills',
        thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        lessons: 5,
        mentorTips: 8,
        progress: 0
    }
];

// SVG Icon Components
const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

const BookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

const MessageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const TrophyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
);

const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const GiftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"></polyline>
        <rect x="2" y="7" width="20" height="5"></rect>
        <line x1="12" y1="22" x2="12" y2="7"></line>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
);

const PlayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const FileIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

export default function DashboardPage() {
    const { profile, logOut } = useAuth();
    const router = useRouter();
    const { progress, loading: progressLoading } = useMenteeProgress();
    const [greeting, setGreeting] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const displayName = profile?.displayName?.split(' ')[0] || 'Student';

    return (
        <div className={styles.dashboardPage}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <Link href="/" className={styles.sidebarLogo}>
                    <span className={styles.logoMark}>YE</span>
                    <span className={styles.logoText}>Youth Educated</span>
                </Link>

                <nav className={styles.sidebarNav}>
                    <Link href="/dashboard" className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>
                        <HomeIcon /> Home
                    </Link>
                    <Link href="/modules" className={styles.sidebarItem}>
                        <GridIcon /> Categories
                    </Link>
                    <Link href="/modules" className={styles.sidebarItem}>
                        <BookIcon /> My Courses
                    </Link>
                    <Link href="/ai-companion" className={styles.sidebarItem}>
                        <MessageIcon /> Messages
                    </Link>
                    <Link href="/mentors" className={styles.sidebarItem}>
                        <UsersIcon /> Community
                    </Link>
                    <Link href="/leaderboard" className={styles.sidebarItem}>
                        <TrophyIcon /> Leaderboard
                    </Link>
                </nav>

                <div className={styles.sidebarBottom}>
                    <Link href="/calendar" className={styles.sidebarItem}>
                        <CalendarIcon /> Calendar
                        <span className={styles.liveBadge}>LIVE</span>
                    </Link>
                    <Link href="/settings" className={styles.sidebarItem}>
                        <SettingsIcon /> Settings
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={styles.mainContainer}>
                <header className={styles.header}>
                    <div className={styles.searchBar}>
                        <SearchIcon />
                        <input type="text" placeholder="Search life skills, mentors..." />
                        <kbd className={styles.searchShortcut}>⌘K</kbd>
                    </div>

                    <div className={styles.headerActions}>
                        <button className={styles.claimPoints}>
                            <GiftIcon />
                            Claim 50 Points
                        </button>
                        <button className={styles.notificationBtn}>
                            <BellIcon />
                            <span className={styles.notificationDot}></span>
                        </button>
                        <div className={styles.avatarWrapper}>
                            <button
                                className={styles.avatar}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                aria-label="User menu"
                            >
                                {displayName[0]}
                            </button>
                            {showUserMenu && (
                                <div className={styles.userDropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <strong>{profile?.displayName || 'User'}</strong>
                                        <span>{profile?.email}</span>
                                    </div>
                                    <Link href="/settings" className={styles.dropdownItem}>
                                        ⚙️ Settings
                                    </Link>
                                    <Link href="/premium/upgrade" className={styles.dropdownItem}>
                                        ✨ Upgrade to Premium
                                    </Link>
                                    <button
                                        className={`${styles.dropdownItem} ${styles.logoutItem}`}
                                        onClick={async () => {
                                            await logOut();
                                            router.push('/');
                                        }}
                                    >
                                        🚪 Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className={styles.content}>
                    <div className={styles.greetingSection}>
                        <h2>{greeting}, {displayName}</h2>
                        <p className={styles.greetingSubtext}>Here&apos;s your journey to becoming your best self.</p>
                    </div>

                    <div className={styles.topGrid}>
                        {/* Daily Growth Card */}
                        <div className={styles.dashboardCard}>
                            <h3 className={styles.cardTitle}>Today&apos;s Growth Goals</h3>
                            <div className={styles.challengeItem}>
                                <div className={`${styles.challengeCheck} ${styles.challengeDone}`}>
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                        <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className={styles.challengeText}>
                                    Practice one financial habit
                                    <span className={styles.xpBadge}>+10 XP</span>
                                </div>
                            </div>
                            <div className={styles.challengeItem}>
                                <div className={styles.challengeCheck}></div>
                                <div className={styles.challengeText}>Send a message to your mentor</div>
                            </div>
                            <Link href="/modules" className={styles.cardLink}>
                                View All Goals <ArrowRightIcon />
                            </Link>
                        </div>

                        {/* Growth Tracker Card */}
                        <div className={`${styles.dashboardCard} ${styles.scoreCard}`}>
                            <h3 className={styles.cardTitle}>Growth Score</h3>
                            <div className={styles.scoreRing}>
                                <svg viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1A1A5E" strokeWidth="3" strokeDasharray={`${progressLoading ? 0 : progress}, 100`} />
                                </svg>
                                <div className={styles.scoreValue}>{progressLoading ? '...' : `${progress}%`}</div>
                            </div>
                            <p className={styles.scoreMessage}>You&apos;re making great progress!</p>
                        </div>

                        {/* Mentor / Empty State Card */}
                        <div className={styles.dashboardCard}>
                            {profile?.role === 'mentee' && !profile?.assignedMentorId ? (
                                // Empty State: No Mentor Assigned
                                <div className="text-center p-4">
                                    <h3 className={styles.cardTitle}>Ready to find your guide?</h3>
                                    <p className="text-muted mb-4 text-sm">
                                        Connect with a professional who can help shape your future.
                                    </p>
                                    <Link href="/mentors" className="btn btn-primary btn-full">
                                        Find a Mentor Now
                                    </Link>
                                </div>
                            ) : (
                                // Active State: Mentor Assigned (Mock for now or if profile has mentor data)
                                <>
                                    <h3 className={styles.cardTitle}>Your Mentor</h3>
                                    <div className={styles.leaderboardItem}>
                                        <div className={styles.avatar} style={{ background: '#FF7A59' }}>SJ</div>
                                        <div className="flex-1 ml-3">
                                            <span className={styles.userName}>Sarah Juma</span>
                                            <span className="text-xs text-muted block">Software Engineer</span>
                                        </div>
                                    </div>
                                    <Link href="/ai-companion" className={styles.cardLink}>
                                        Chat Now <ArrowRightIcon />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Explore Banner */}
                        <div className={styles.exploreBanner}>
                            <div className={styles.exploreContent}>
                                <h3>Explore Courses</h3>
                                <p>Welcome to your dashboard—let&apos;s make progress today. Check your latest achievements and take on new challenges!</p>
                                <Link href="/modules" className={styles.exploreBtn}>
                                    Explore <ArrowRightIcon />
                                </Link>
                            </div>
                            <div className={styles.exploreGraphic}>
                                <svg viewBox="0 0 100 100" fill="none">
                                    <circle cx="50" cy="50" r="45" stroke="#FFD66B" strokeWidth="2" opacity="0.3" />
                                    <circle cx="50" cy="50" r="30" stroke="#FFD66B" strokeWidth="2" opacity="0.5" />
                                    <circle cx="50" cy="50" r="15" fill="#FFD66B" opacity="0.8" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className={styles.coursesHeader}>
                        <h3>My Growth Journey</h3>
                        <div className={styles.courseFilters}>
                            <button className={`${styles.filterBtn} ${styles.filterBtnActive}`}>All</button>
                            <button className={styles.filterBtn}>Ongoing</button>
                            <button className={styles.filterBtn}>Completed</button>
                        </div>
                    </div>

                    <div className={styles.coursesGrid}>
                        {LIFE_SKILLS.map(skill => (
                            <Link key={skill.id} href={`/modules/${skill.id}`} className={styles.courseItem}>
                                <div className={styles.courseThumb} style={{ backgroundImage: `url(${skill.thumbnail})` }}>
                                    <span className={styles.courseBadge}>{skill.category}</span>
                                </div>
                                <div className={styles.courseInfo}>
                                    <h4>{skill.title}</h4>
                                    <div className={styles.courseMeta}>
                                        <span><PlayIcon /> {skill.lessons} Lessons</span>
                                        <span><FileIcon /> {skill.mentorTips} Mentor Tips</span>
                                    </div>
                                    <div className={styles.courseProgress}>
                                        <div className={styles.progressFill} style={{ width: `${skill.progress}%` }}></div>
                                    </div>
                                    <div className={styles.progressLabel}>
                                        {skill.progress}% Complete
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
