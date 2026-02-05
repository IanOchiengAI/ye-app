'use client';

import Link from 'next/link';
import styles from './calendar.module.css';

export default function CalendarPage() {
    return (
        <div className={styles.calendarPage}>
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                <h1 className={styles.pageTitle}>My Schedule</h1>
            </header>

            <div className={styles.container}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Upcoming Events</h2>
                    <span className={styles.dateBadge}>Oct 2026</span>
                </div>

                <div className={styles.eventList}>
                    {[
                        { day: '12', month: 'OCT', title: 'Financial Literacy Workshop', time: '14:00 - 15:30', type: 'webinar' },
                        { day: '15', month: 'OCT', title: 'Mentor Session: Sarah Juma', time: '10:00 - 10:45', type: 'meeting' },
                        { day: '18', month: 'OCT', title: 'Module Deadline: Career Discovery', time: '23:59', type: 'deadline' },
                        { day: '22', month: 'OCT', title: 'Community AMA: Tech Careers', time: '16:00 - 17:00', type: 'event' },
                    ].map((event, i) => (
                        <div key={i} className={styles.eventItem}>
                            <div className={styles.dateBox}>
                                <span className={styles.month}>{event.month}</span>
                                <span className={styles.day}>{event.day}</span>
                            </div>
                            <div className={styles.eventContent}>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <div className={styles.eventMeta}>
                                    <span className={styles.time}>
                                        🕒 {event.time}
                                    </span>
                                    <span className={`
                                        ${styles.type}
                                        ${event.type === 'deadline' ? styles.typeDeadline :
                                            event.type === 'meeting' ? styles.typeMeeting :
                                                event.type === 'webinar' ? styles.typeWebinar : styles.typeEvent}
                                    `}>
                                        • {event.type}
                                    </span>
                                </div>
                            </div>
                            <button className={styles.detailsBtn}>
                                Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
