'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './settings.module.css';

export default function SettingsPage() {
    const { profile, logOut } = useAuth();

    // Fallback initials
    const initials = profile?.displayName
        ? profile.displayName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'USER';

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
                <h1>Settings & Profile</h1>
            </header>

            <div className={styles.content}>
                <div className={styles.profileCard}>
                    <div className={styles.avatarLarge}>
                        {initials}
                    </div>
                    <h2>{profile?.displayName || 'User'}</h2>
                    <p className={styles.email}>{profile?.email}</p>
                    <span className={styles.roleBadge}>{profile?.role || 'Mentee'}</span>
                </div>

                <div className={styles.menu}>
                    <div className={styles.menuSection}>
                        <h3>Subscription</h3>
                        <Link href="/premium/upgrade" className={styles.premiumMenuItem}>
                            <div className={styles.menuIcon}>✨</div>
                            <div className={styles.menuText}>
                                <span className={styles.menuTitle}>Upgrade to Premium</span>
                                <span className={styles.menuSubtitle}>Unlock AI Mentorship & more</span>
                            </div>
                            <div className={styles.menuArrow}>→</div>
                        </Link>
                    </div>

                    <div className={styles.menuSection}>
                        <h3>Account</h3>
                        <button className={styles.menuItem}>
                            Edit Profile
                        </button>
                        <button className={styles.menuItem}>
                            Notifications
                        </button>
                        <button className={styles.menuItem}>
                            Privacy & Security
                        </button>
                    </div>

                    <div className={styles.menuSection}>
                        <button
                            onClick={async () => {
                                await logOut();
                                window.location.href = '/';
                            }}
                            className={`${styles.menuItem} ${styles.logoutBtn}`}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
