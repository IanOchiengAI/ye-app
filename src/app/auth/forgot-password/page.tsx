'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../auth.module.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            await resetPassword(email);
            setStatus('success');
        } catch (error: any) {
            console.error('Reset password error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to send reset email. Please try again.');
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                {/* Left Panel - Branding */}
                <div className={styles.brandPanel}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>Youth</span>
                        <span className={styles.logoAccent}>Educated</span>
                    </Link>
                    <div className={styles.brandContent}>
                        <h1>Recovery Mode 🔐</h1>
                        <p>Don&apos;t worry, it happens to the best of us.</p>
                        <p>We&apos;ll help you get back to learning in no time.</p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formHeader}>
                        <h2>Reset Password</h2>
                        <p>Enter your email to receive recovery instructions.</p>
                    </div>

                    {status === 'success' ? (
                        <div className={styles.successCard}>
                            <div className={styles.iconLarge}>📧</div>
                            <h3>Check Your Inbox</h3>
                            <p>We&apos;ve sent a password reset link to <strong>{email}</strong>.</p>
                            <p className={styles.subtext}>
                                Didn&apos;t receive it? Check your spam folder or try again in a few minutes.
                            </p>
                            <Link href="/auth/login" className="btn btn-primary btn-full">
                                Return to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {status === 'error' && (
                                <div className="alert alert-error">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`form-input ${status === 'error' ? 'form-input-error' : ''}`}
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-full btn-lg"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <span className="loader loader-sm"></span>
                                        Sending Link...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>

                            <div className={styles.backLink}>
                                <Link href="/auth/login">← Back to Login</Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
