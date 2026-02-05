'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './premium.module.css';

export default function PremiumPage() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('/api/payments/stkpush', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone,
                    amount: 15,
                    accountRef: 'PremiumDaily'
                })
            });

            const data = await response.json();

            if (data.success) {
                setStatus({
                    type: 'success',
                    message: 'Check your phone! A PIN prompt has been sent. After you enter your PIN, your account will be upgraded.'
                });
            } else {
                setStatus({
                    type: 'error',
                    message: data.error || 'Something went wrong. Please try again.'
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to initiate payment. Check your connection.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.premiumPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Unlock Premium</h1>
                    <p className={styles.subtitle}>Supercharge your growth with AI Rafiki and expert mentors.</p>
                </header>

                <div className={styles.pricingCard}>
                    <div className={styles.price}>
                        <span className={styles.priceCurrency}>KES</span> 15
                        <span className={styles.pricePeriod}>/ day</span>
                    </div>
                    <p>Pay-as-you-go. No commitments.</p>

                    <ul className={styles.features}>
                        <li className={styles.featureItem}>
                            <span className={styles.checkIcon}>✓</span> Unlimited AI Companion messages
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.checkIcon}>✓</span> Voice Mode with Rafiki
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.checkIcon}>✓</span> Full Leaderboard Rankings
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.checkIcon}>✓</span> Verified Digital Certificates
                        </li>
                    </ul>

                    <form className={styles.paymentForm} onSubmit={handlePayment}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>M-Pesa Phone Number</label>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="07XXXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className={styles.payBtn} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="loading-spinner"></span> Sending STK Push...
                                </>
                            ) : 'Pay KES 15 via M-Pesa'}
                        </button>
                    </form>

                    {status && (
                        <div className={`${styles.statusMessage} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                            {status.message}
                        </div>
                    )}
                </div>

                <Link href="/dashboard" className={styles.backLink}>
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
