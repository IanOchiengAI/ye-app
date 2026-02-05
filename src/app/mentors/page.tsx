'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './mentors.module.css';
import { MENTORS } from '@/lib/data/mentors';

const categories = ['All', 'Technology', 'Finance', 'Entrepreneurship', 'Leadership', 'Marketing'];

export default function MentorsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [requestSent, setRequestSent] = useState<string | null>(null);
    const [isPremiumMode, setIsPremiumMode] = useState(false);

    const filteredMentors = MENTORS.filter(mentor => {
        const matchesCategory = selectedCategory === 'All' || mentor.expertise.includes(selectedCategory);
        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleRequestMentor = (id: string) => {
        // Mock API call
        setTimeout(() => {
            setRequestSent(id);
            // In real app, we would write to Firestore 'requests' collection
        }, 500);
    };

    return (
        <div className={styles.mentorsPage}>
            {/* Header */}
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backBtn}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <h1>Find a Mentor</h1>
                <div className={styles.headerRight}>
                    <button className={styles.filterBtn}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className={styles.main}>
                {/* Search & Filter */}
                <section className={styles.searchSection}>
                    <div className={styles.searchControls}>
                        <div className={styles.searchBar}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name or role..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className={styles.premiumToggleWrapper}>
                            <label className={styles.toggleLabel}>
                                <span className={styles.toggleText}>💎 Premium Mode</span>
                                <div
                                    className={`${styles.toggleSwitch} ${isPremiumMode ? styles.active : ''}`}
                                    onClick={() => setIsPremiumMode(!isPremiumMode)}
                                >
                                    <div className={styles.toggleSlider}></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className={styles.categories}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.catBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Mentors List */}
                <div className={styles.mentorsGrid}>
                    {filteredMentors.map(mentor => (
                        <div key={mentor.id} className={`${styles.mentorCard} ${isPremiumMode ? styles.premiumCard : ''}`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.mentorAvatar}>
                                    <img
                                        src={mentor.imageUrl}
                                        alt={mentor.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {isPremiumMode && (
                                        <div className={styles.verifiedBadge}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                {mentor.available ? (
                                    <span className={styles.statusAvailable}>Available</span>
                                ) : (
                                    <span className={styles.statusBusy}>Fully Booked</span>
                                )}
                            </div>

                            <div className={styles.cardContent}>
                                <h3>
                                    Meet {mentor.name.split(' ')[0]}
                                    {isPremiumMode && <span className={styles.premiumStar}>⭐</span>}
                                </h3>
                                <p className={styles.role}>{mentor.role} @ {mentor.company}</p>

                                <div className={styles.storySection}>
                                    <h4>My Story</h4>
                                    <p className={styles.bio}>{mentor.bio}</p>
                                </div>

                                <div className={styles.funFactSection}>
                                    <h4>Fun Fact</h4>
                                    <p>{mentor.funFact}</p>
                                </div>

                                <div className={styles.tags}>
                                    {mentor.expertise.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                {isPremiumMode ? (
                                    <div className={styles.premiumActions}>
                                        <button className={styles.videoBtn}>
                                            📹 Video Call
                                        </button>
                                        <button className={styles.bookBtn}>
                                            📅 Book Now
                                        </button>
                                    </div>
                                ) : (
                                    requestSent === mentor.id ? (
                                        <button className={`${styles.requestBtn} ${styles.sent}`} disabled>
                                            Request Sent ✓
                                        </button>
                                    ) : (
                                        <button
                                            className={styles.requestBtn}
                                            disabled={!mentor.available}
                                            onClick={() => handleRequestMentor(mentor.id)}
                                        >
                                            {mentor.available ? 'Request Mentorship' : 'Unavailable'}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredMentors.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No mentors found matching your criteria.</p>
                            <button className={styles.clearBtn} onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
