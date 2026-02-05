'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../auth.module.css';

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        age: '',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const { signUp } = useAuth();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (authMethod === 'email') {
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
        } else {
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/\s/g, ''))) {
                newErrors.phone = 'Please enter a valid phone number';
            }
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 100) {
            newErrors.age = 'Age must be between 13 and 100';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Check if user needs parental consent
            const age = parseInt(formData.age);

            if (age < 18) {
                // Store form data in session and redirect to parental consent
                sessionStorage.setItem('signupData', JSON.stringify({
                    ...formData,
                    age,
                }));
                router.push('/auth/parental-consent');
            } else {
                // Proceed with signup
                await signUp(formData.email, formData.password, formData.fullName, age, 'mentee');
                router.push('/onboarding');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ general: 'Failed to create account. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
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
                        <h1>It Starts With You(th)</h1>
                        <p>Join us in empowering young people with essential life skills through Conversation, Choice, and Change.</p>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span>✓</span> Educated Futures Programme
                            </div>
                            <div className={styles.feature}>
                                <span>✓</span> Brothers Keepers Programme
                            </div>
                            <div className={styles.feature}>
                                <span>✓</span> Life skills modules
                            </div>
                            <div className={styles.feature}>
                                <span>✓</span> Mentorship support
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formHeader}>
                        <h2>Create Your Account</h2>
                        <p>Already have an account? <Link href="/auth/login">Log in</Link></p>
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
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Full Name */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                            />
                            {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                        </div>

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
                                />
                                {errors.phone && <p className="form-error">{errors.phone}</p>}
                            </div>
                        )}

                        {/* Age */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="age">Your Age</label>
                            <input
                                id="age"
                                type="number"
                                className={`form-input ${errors.age ? 'form-input-error' : ''}`}
                                placeholder="16"
                                min="13"
                                max="100"
                                value={formData.age}
                                onChange={(e) => handleInputChange('age', e.target.value)}
                            />
                            {errors.age && <p className="form-error">{errors.age}</p>}
                            {parseInt(formData.age) > 0 && parseInt(formData.age) < 18 && (
                                <p className={styles.ageNotice}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    Since you&apos;re under 18, we&apos;ll need your parent or guardian&apos;s consent.
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            {errors.password && <p className="form-error">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            />
                            {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                        </div>

                        {/* Terms Agreement */}
                        <div className="form-group">
                            <label className={`form-check ${errors.agreeToTerms ? styles.checkError : ''}`}>
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                />
                                <span className="form-check-label">
                                    I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                                </span>
                            </label>
                            {errors.agreeToTerms && <p className="form-error">{errors.agreeToTerms}</p>}
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
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className={styles.footerText}>
                        <p>By signing up, you agree to receive updates about Youth Educated.</p>
                        <p style={{ marginTop: '1rem' }}>
                            Want to guide others? <Link href="/auth/mentor-signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Apply to be a Mentor</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
