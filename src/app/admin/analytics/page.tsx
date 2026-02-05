'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './analytics.module.css';

// Using mock data for MVP
const KEY_METRICS = [
    { id: 1, label: 'Active Users', value: '1,245', change: '+12%', trend: 'up' },
    { id: 2, label: 'Modules Completed', value: '856', change: '+24%', trend: 'up' },
    { id: 3, label: 'Mentor Sessions', value: '342', change: '+8%', trend: 'up' },
    { id: 4, label: 'Completion Rate', value: '78%', change: '-2%', trend: 'down' },
];

const ENGAGEMENT_DATA = [
    { day: 'Mon', logins: 120, modules: 45 },
    { day: 'Tue', logins: 145, modules: 52 },
    { day: 'Wed', logins: 132, modules: 49 },
    { day: 'Thu', logins: 156, modules: 60 },
    { day: 'Fri', logins: 189, modules: 75 },
    { day: 'Sat', logins: 210, modules: 90 },
    { day: 'Sun', logins: 178, modules: 65 },
];

const SCHOOL_PERFORMANCE = [
    { name: 'Alliance High', students: 450, avgProgress: 85 },
    { name: 'Kenya High', students: 380, avgProgress: 82 },
    { name: 'Starehe Boys', students: 410, avgProgress: 79 },
    { name: 'Moi Girls', students: 320, avgProgress: 75 },
];

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('week');

    // Simple bar chart visualization
    const maxVal = Math.max(...ENGAGEMENT_DATA.map(d => Math.max(d.logins, d.modules)));

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <Link href="/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
                    <h1>Platform Analytics</h1>
                    <p>Overview of student engagement and platform growth.</p>
                </div>
                <div className={styles.controls}>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="form-select"
                    >
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="year">Last 12 Months</option>
                    </select>
                    <button className="btn btn-primary btn-sm">Export Report</button>
                </div>
            </header>

            {/* Key Metrics Grid */}
            <div className={styles.metricsGrid}>
                {KEY_METRICS.map(metric => (
                    <div key={metric.id} className={styles.metricCard}>
                        <span className={styles.metricLabel}>{metric.label}</span>
                        <div className={styles.metricValue}>
                            {metric.value}
                            <span className={`${styles.trend} ${metric.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                                {metric.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.dashboardGrid}>
                {/* Engagement Chart */}
                <section className={styles.chartCard}>
                    <h3>User Engagement</h3>
                    <div className={styles.chartContainer}>
                        <div className={styles.chartBars}>
                            {ENGAGEMENT_DATA.map((day, i) => (
                                <div key={i} className={styles.barGroup}>
                                    <div
                                        className={styles.barLogin}
                                        style={{ height: `${(day.logins / maxVal) * 100}%` }}
                                        title={`Logins: ${day.logins}`}
                                    ></div>
                                    <div
                                        className={styles.barModule}
                                        style={{ height: `${(day.modules / maxVal) * 100}%` }}
                                        title={`Modules: ${day.modules}`}
                                    ></div>
                                    <span className={styles.barLabel}>{day.day}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.legend}>
                            <span className={styles.legendItem}><i className={styles.dotLogin}></i> Logins</span>
                            <span className={styles.legendItem}><i className={styles.dotModule}></i> Modules</span>
                        </div>
                    </div>
                </section>

                {/* School Performance */}
                <section className={styles.chartCard}>
                    <h3>Top Schools Performance</h3>
                    <div className={styles.schoolList}>
                        {SCHOOL_PERFORMANCE.map((school, i) => (
                            <div key={i} className={styles.schoolItem}>
                                <div className={styles.schoolInfo}>
                                    <span className={styles.schoolName}>{school.name}</span>
                                    <span className={styles.schoolStudents}>{school.students} Students</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{
                                            width: `${school.avgProgress}%`,
                                            backgroundColor: school.avgProgress > 80 ? 'var(--color-success)' : 'var(--color-primary)'
                                        }}
                                    ></div>
                                </div>
                                <span className={styles.progressVal}>{school.avgProgress}% Avg</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
