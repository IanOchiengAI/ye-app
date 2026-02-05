'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './modules.module.css';
import { CORE_MODULES } from '@/lib/data/modules';
import { Module } from '@/lib/types';
import CelebrationAnimation from '@/components/ui/CelebrationAnimation';
import Toast from '@/components/ui/Toast';

// Kid-friendly educational images featuring African students learning
const MODULE_IMAGES: Record<string, string> = {
    '1': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', // African students in classroom
    '2': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80', // Students discussing together
    '3': 'https://images.unsplash.com/photo-1529390079861-591f6cbf67a0?auto=format&fit=crop&w=400&q=80', // African children outdoors happy
    '4': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80', // Books and studying
    '5': 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=400&q=80', // Laptop/tech learning
};

// SVG Icons
const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

const PlayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const CheckIcon = () => (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

export default function ModulesPage() {
    // Mock user progress logic
    // In real app, fetch from UserContext
    const completedModuleIds: string[] = [];
    const currentModuleId = '1';

    // Celebration State
    const [showCelebration, setShowCelebration] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSimulateComplete = () => {
        setShowCelebration(true);
        setTimeout(() => setShowToast(true), 1000);
    };

    const getModuleStatus = (module: Module) => {
        if (completedModuleIds.includes(module.id)) return 'completed';
        if (module.id === currentModuleId) return 'in-progress';
        if (module.order <= 5) return 'available'; // Temporary unlock logic
        return 'locked';
    };

    const modulesWithStatus = CORE_MODULES.map(m => ({
        ...m,
        status: getModuleStatus(m),
        progress: m.id === currentModuleId ? 35 : 0, // Mock progress
        imageUrl: MODULE_IMAGES[m.id] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
    }));

    const completedCount = modulesWithStatus.filter(m => m.status === 'completed').length;
    const totalProgress = Math.round(modulesWithStatus.reduce((sum, m) => sum + m.progress, 0) / CORE_MODULES.length);

    return (
        <div className={styles.modulesPage}>
            {/* Header */}
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backBtn}>
                    <BackIcon />
                </Link>
                <div className={styles.headerContent}>
                    <h1>Build Your Life Skills, One Step at a Time</h1>
                    <p className={styles.headerSubtitle}>Master essential skills for success</p>
                </div>
                <div className={styles.headerSpacer}>
                    <button
                        onClick={handleSimulateComplete}
                        className="btn btn-primary text-xs"
                        style={{ background: 'var(--color-success)', border: 'none' }}
                    >
                        Demo: Finish Module
                    </button>
                </div>
            </header>

            {/* Celebration Components */}
            <CelebrationAnimation
                isActive={showCelebration}
                onComplete={() => setShowCelebration(false)}
            />
            <Toast
                message="Nice work! ✨ Keep the momentum going."
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

            <main className={styles.main}>
                {/* Progress Overview */}
                <section className={styles.overviewSection}>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewStats}>
                            <div className={styles.overviewStat}>
                                <span className={styles.overviewNumber}>{completedCount}</span>
                                <span className={styles.overviewLabel}>Completed</span>
                            </div>
                            <div className={styles.overviewDivider} />
                            <div className={styles.overviewStat}>
                                <span className={styles.overviewNumber}>{CORE_MODULES.length - completedCount}</span>
                                <span className={styles.overviewLabel}>Remaining</span>
                            </div>
                            <div className={styles.overviewDivider} />
                            <div className={styles.overviewStat}>
                                <span className={styles.overviewNumber}>{totalProgress}%</span>
                                <span className={styles.overviewLabel}>Progress</span>
                            </div>
                        </div>
                        <div className={styles.overviewProgress}>
                            <div
                                className={styles.overviewProgressFill}
                                style={{ width: `${totalProgress}%` }}
                            />
                        </div>
                    </div>
                </section>

                {/* In Progress */}
                {modulesWithStatus.some(m => m.status === 'in-progress') && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Continue Learning</h2>
                        <div className={styles.modulesList}>
                            {modulesWithStatus.filter(m => m.status === 'in-progress').map(module => (
                                <Link
                                    key={module.id}
                                    href={`/modules/${module.id}`}
                                    className={`${styles.moduleCard} ${styles.inProgress}`}
                                >
                                    <div
                                        className={styles.moduleImage}
                                        style={{ backgroundImage: `url(${module.imageUrl})` }}
                                    />
                                    <div className={styles.moduleContent}>
                                        <span className={styles.moduleCategory}>{module.category}</span>
                                        <h3>{module.title}</h3>
                                        <p>{module.description}</p>
                                        <div className={styles.moduleMeta}>
                                            <span><PlayIcon /> {module.video.duration}</span>
                                        </div>
                                        <div className={styles.moduleProgress}>
                                            <div
                                                className={styles.moduleProgressFill}
                                                style={{ width: `${module.progress}%` }}
                                            />
                                        </div>
                                        <span className={styles.moduleProgressText}>{module.progress}% complete</span>
                                    </div>
                                    <span className={styles.continueBtn}>
                                        Continue <ArrowRightIcon />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Available Modules */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Available Modules</h2>
                    <div className={styles.modulesGrid}>
                        {modulesWithStatus.filter(m => m.status === 'available' || m.status === 'completed').map(module => (
                            <Link
                                key={module.id}
                                href={`/modules/${module.id}`}
                                className={`${styles.moduleCard} ${styles.available}`}
                            >
                                {module.status === 'completed' && (
                                    <span className={styles.completedBadge}>
                                        <CheckIcon /> Completed
                                    </span>
                                )}
                                <div
                                    className={styles.moduleImage}
                                    style={{ backgroundImage: `url(${module.imageUrl})` }}
                                />
                                <div className={styles.moduleCardBody}>
                                    <span className={styles.moduleCategory}>{module.category}</span>
                                    <h3>{module.title}</h3>
                                    <p>{module.description}</p>
                                    <div className={styles.moduleMeta}>
                                        <span><PlayIcon /> {module.video.duration}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Locked Modules */}
                {modulesWithStatus.some(m => m.status === 'locked') && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Unlock More
                            <span className={styles.lockHint}>Complete previous modules to unlock</span>
                        </h2>
                        <div className={styles.modulesGrid}>
                            {modulesWithStatus.filter(m => m.status === 'locked').map(module => (
                                <div
                                    key={module.id}
                                    className={`${styles.moduleCard} ${styles.locked}`}
                                >
                                    <span className={styles.lockIcon}><LockIcon /></span>
                                    <div
                                        className={styles.moduleImage}
                                        style={{ backgroundImage: `url(${module.imageUrl})` }}
                                    />
                                    <div className={styles.moduleCardBody}>
                                        <span className={styles.moduleCategory}>{module.category}</span>
                                        <h3>{module.title}</h3>
                                        <p>{module.description}</p>
                                        <div className={styles.moduleMeta}>
                                            <span>Locked</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
