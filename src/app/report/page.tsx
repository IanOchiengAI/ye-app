'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './report.module.css';

export default function ReportPage() {
    const [reportType, setReportType] = useState('concern');
    const [description, setDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className={styles.centeredContent}>
                <div className={styles.successCard}>
                    <span className={styles.iconLarge}>🛡️</span>
                    <h2>Report Received</h2>
                    <p>Thank you for speaking up. Your report has been submitted securely and will be reviewed by our safeguarding team immediately.</p>
                    <p className={styles.subtext}>If this is an emergency, please call the Child Helpline at <strong>116</strong>.</p>
                    <Link href="/dashboard" className="btn btn-primary mt-6">Return to Dashboard</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>← Back</Link>
                <h1>Safeguarding Report</h1>
                <p>Your safety is our top priority. Use this form to report any concerns, incidents, or inappropriate behavior.</p>
            </header>

            <main className={styles.main}>
                <div className={styles.warningBox}>
                    <span className={styles.warningIcon}>⚠️</span>
                    <div>
                        <strong>Emergency?</strong>
                        <p>If you or someone else is in immediate danger, please call 116 (Child Helpline) or 999 directly.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="form-group">
                        <label className="form-label">What do you want to report?</label>
                        <div className={styles.typeGrid}>
                            {['Safety Concern', 'Bullying', 'Inappropriate Content', 'Mentor Issue', 'Other'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    className={`${styles.typeBtn} ${reportType === type ? styles.active : ''}`}
                                    onClick={() => setReportType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-input form-textarea"
                            rows={6}
                            placeholder="Please describe what happened in as much detail as you feel comfortable giving..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-check">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                            <span className="form-check-label">Submit anonymously (we won&apos;t attach your name to this report)</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-error btn-full btn-lg"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </main>
        </div>
    );
}
