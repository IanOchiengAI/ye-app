'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../auth.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (authMethod === 'email') {
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
        } else {
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            }
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const { signIn, clearMockData } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            await signIn(formData.email, formData.password);
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            setErrors({
                general: error.message || 'Invalid email or password. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
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
                        <h1>Welcome Back!</h1>
                        <p>Continue making informed decisions through Conversation, Choice, and Change.</p>
                        <div className={styles.testimonial}>
                            <p>&ldquo;It Starts With You(th)&rdquo;</p>
                            <span>— Youth Educated</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formHeader}>
                        <h2>Log In to Your Account</h2>
                        <p>Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link></p>
                    </div>

                    {/* Auth Method Toggle */}
                    <div className={styles.authToggle}>
                        <button
                            type="button"
                            className={`${styles.toggleBtn} ${authMethod === 'email' ? styles.active : ''}`}
                            onClick={() => setAuthMethod('email')}
                        >
                            Email
                        </button>
                        <button
                            type="button"
                            className={`${styles.toggleBtn} ${authMethod === 'phone' ? styles.active : ''}`}
                            onClick={() => setAuthMethod('phone')}
                        >
                            Phone
                        </button>
                    </div>

                    {errors.general && (
                        <div className="alert alert-error">
                            {errors.general}
                            {(errors.general.includes('mock') || errors.general.includes('exists')) && (
                                <button
                                    onClick={() => clearMockData()}
                                    className={styles.devResetBtn}
                                >
                                    Developer: Click to force-clear all mock accounts
                                </button>
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Email or Phone */}
                        {authMethod === 'email' ? (
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    autoComplete="email"
                                />
                                {errors.email && <p className="form-error">{errors.email}</p>}
                            </div>
                        ) : (
                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                                    placeholder="+254 712 345 678"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    autoComplete="tel"
                                />
                                {errors.phone && <p className="form-error">{errors.phone}</p>}
                            </div>
                        )}

                        {/* Password */}
                        <div className="form-group">
                            <div className={styles.passwordHeader}>
                                <label className="form-label" htmlFor="password">Password</label>
                                <Link href="/auth/forgot-password" className={styles.forgotLink}>
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                autoComplete="current-password"
                            />
                            {errors.password && <p className="form-error">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="form-group">
                            <label className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                />
                                <span className="form-check-label">Remember me on this device</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loader loader-sm"></span>
                                    Logging in...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button type="button" className={`btn btn-outline ${styles.socialBtn}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className={styles.footerText}>
                        <p>Protected by industry-standard security.</p>
                        <p className={styles.footerLinkContainer}>
                            Interested in mentorship? <Link href="/auth/mentor-signup" className={styles.footerLink}>Apply here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
