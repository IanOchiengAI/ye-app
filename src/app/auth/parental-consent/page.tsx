'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../auth.module.css';

interface SignupData {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    age: number;
}

export default function ParentalConsentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        guardianName: '',
        guardianEmail: '',
        guardianPhone: '',
        relationship: '',
        consent: false,
        dataProcessing: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'form' | 'verification' | 'success'>('form');
    const { signUp, clearMockData } = useAuth();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.guardianName.trim()) {
            newErrors.guardianName = 'Guardian name is required';
        }

        if (!formData.guardianEmail.trim()) {
            newErrors.guardianEmail = 'Guardian email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guardianEmail)) {
            newErrors.guardianEmail = 'Please enter a valid email';
        }

        if (!formData.relationship) {
            newErrors.relationship = 'Please select your relationship';
        }

        if (!formData.consent) {
            newErrors.consent = 'Guardian consent is required';
        }

        if (!formData.dataProcessing) {
            newErrors.dataProcessing = 'Data processing agreement is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Get stored signup data
            const signupDataStr = sessionStorage.getItem('signupData');
            if (!signupDataStr) {
                router.push('/auth/signup');
                return;
            }

            const signupData: SignupData = JSON.parse(signupDataStr);

            // In production, this would:
            // 1. Create the user account
            // 2. Send verification email to guardian
            // 3. Store consent record

            console.log('Creating account with parental consent:', {
                user: signupData,
                guardian: formData,
            });

            // Show verification step
            setStep('verification');

            // Simulate email sent and verification
            setTimeout(async () => {
                try {
                    await signUp(
                        signupData.email,
                        signupData.password,
                        signupData.fullName,
                        signupData.age,
                        'mentee'
                    );
                    setStep('success');
                } catch (error: any) {
                    console.error('Auto-signup error:', error);

                    // IF account exists (likely retrying), just proceed for demo
                    if (error.message && error.message.includes('exists')) {
                        console.log('Account exists, proceeding as success for demo.');
                        setStep('success');
                        return;
                    }

                    setErrors({ general: (error as Error).message || 'Failed to finalize account creation.' });
                    setStep('form');
                    setLoading(false);
                }
            }, 2500);

        } catch (error) {
            console.error('Consent error:', error);
            setErrors({ general: 'Something went wrong. Please try again.' });
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Verification pending screen
    if (step === 'verification') {
        return (
            <div className={styles.authPage}>
                <div className={styles.authContainer}>
                    <div className={styles.centeredContent}>
                        <div className={styles.verificationCard}>
                            <div className={styles.iconLarge}>📧</div>
                            <h2>Verification Email Sent!</h2>
                            <p>
                                We&apos;ve sent a verification link to <strong>{formData.guardianEmail}</strong>.
                            </p>
                            <p className={styles.subtext}>
                                Your guardian needs to click the link in the email to verify their consent.
                                This usually takes just a minute!
                            </p>
                            <div className="loader"></div>
                            <p className={styles.waitingText}>Waiting for verification...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Success screen
    if (step === 'success') {
        return (
            <div className={styles.authPage}>
                <div className={styles.authContainer}>
                    <div className={styles.centeredContent}>
                        <div className={styles.successCard}>
                            <div className={styles.iconLarge}>🎉</div>
                            <h2>You&apos;re All Set!</h2>
                            <p>
                                Your guardian has approved your account. Welcome to Youth Educated!
                            </p>
                            <p className={styles.subtext}>
                                Let&apos;s set up your profile and find the perfect mentor for you.
                            </p>
                            <Link href="/onboarding" className="btn btn-primary btn-lg">
                                Start Your Journey
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                {/* Left Panel - Info */}
                <div className={styles.brandPanel}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🎓</span>
                        <span>Youth Educated</span>
                    </Link>
                    <div className={styles.brandContent}>
                        <h1>Almost There! 🙌</h1>
                        <p>
                            Since you&apos;re under 18, we need your parent or guardian to give their okay.
                            Don&apos;t worry – this is to keep you safe!
                        </p>
                        <div className={styles.safetyInfo}>
                            <h3>🔒 Why We Ask</h3>
                            <ul>
                                <li>To ensure a safe learning environment</li>
                                <li>To protect your personal information</li>
                                <li>To comply with child safety laws</li>
                                <li>To give parents visibility into your journey</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formHeader}>
                        <h2>Parent/Guardian Consent</h2>
                        <p>Please provide your parent or guardian&apos;s information below.</p>
                    </div>

                    {errors.general && (
                        <div className="alert alert-error">
                            {errors.general}
                            {errors.general.includes('exists') && (
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
                        {/* Guardian Name */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardianName">
                                Guardian&apos;s Full Name
                            </label>
                            <input
                                id="guardianName"
                                type="text"
                                className={`form-input ${errors.guardianName ? 'form-input-error' : ''}`}
                                placeholder="Enter guardian's full name"
                                value={formData.guardianName}
                                onChange={(e) => handleInputChange('guardianName', e.target.value)}
                            />
                            {errors.guardianName && <p className="form-error">{errors.guardianName}</p>}
                        </div>

                        {/* Relationship */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="relationship">Relationship to You</label>
                            <select
                                id="relationship"
                                className={`form-input form-select ${errors.relationship ? 'form-input-error' : ''}`}
                                value={formData.relationship}
                                onChange={(e) => handleInputChange('relationship', e.target.value)}
                            >
                                <option value="">Select relationship</option>
                                <option value="parent">Parent</option>
                                <option value="guardian">Legal Guardian</option>
                                <option value="grandparent">Grandparent</option>
                                <option value="aunt_uncle">Aunt/Uncle</option>
                                <option value="sibling">Adult Sibling (18+)</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.relationship && <p className="form-error">{errors.relationship}</p>}
                        </div>

                        {/* Guardian Email */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardianEmail">
                                Guardian&apos;s Email Address
                            </label>
                            <input
                                id="guardianEmail"
                                type="email"
                                className={`form-input ${errors.guardianEmail ? 'form-input-error' : ''}`}
                                placeholder="guardian@example.com"
                                value={formData.guardianEmail}
                                onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                            />
                            {errors.guardianEmail && <p className="form-error">{errors.guardianEmail}</p>}
                            <p className={styles.inputHint}>
                                We&apos;ll send a verification link to this email.
                            </p>
                            <div className={styles.demoNotice}>
                                <span className={styles.demoBadge}>DEMO MODE</span>
                                <p>Email verification is simulated. No real email will be sent.</p>
                            </div>
                        </div>

                        {/* Guardian Phone (Optional) */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardianPhone">
                                Guardian&apos;s Phone Number <span className={styles.optional}>(Optional)</span>
                            </label>
                            <input
                                id="guardianPhone"
                                type="tel"
                                className="form-input"
                                placeholder="+254 712 345 678"
                                value={formData.guardianPhone}
                                onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                            />
                        </div>

                        {/* Consent Checkbox */}
                        <div className={styles.consentSection}>
                            <div className="form-group">
                                <label className={`form-check ${errors.consent ? styles.checkError : ''}`}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={formData.consent}
                                        onChange={(e) => handleInputChange('consent', e.target.checked)}
                                    />
                                    <span className="form-check-label">
                                        I confirm that the guardian listed above has given permission for this minor
                                        to create an account on Youth Educated.
                                    </span>
                                </label>
                                {errors.consent && <p className="form-error">{errors.consent}</p>}
                            </div>

                            <div className="form-group">
                                <label className={`form-check ${errors.dataProcessing ? styles.checkError : ''}`}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={formData.dataProcessing}
                                        onChange={(e) => handleInputChange('dataProcessing', e.target.checked)}
                                    />
                                    <span className="form-check-label">
                                        I understand that Youth Educated will process this minor&apos;s data in accordance
                                        with the <Link href="/privacy">Privacy Policy</Link> and <Link href="/safeguarding">Safeguarding Policy</Link>.
                                    </span>
                                </label>
                                {errors.dataProcessing && <p className="form-error">{errors.dataProcessing}</p>}
                            </div>
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
                                    Sending Verification...
                                </>
                            ) : (
                                'Send Verification Email'
                            )}
                        </button>
                    </form>

                    <div className={styles.backLink}>
                        <Link href="/auth/signup">← Back to Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
