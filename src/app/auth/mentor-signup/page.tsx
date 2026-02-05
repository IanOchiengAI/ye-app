'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';
import { useAuth } from '@/contexts/AuthContext';

export default function MentorSignUpPage() {
    const router = useRouter();
    const { signUp } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        profession: '',
        linkedin: '',
        expertise: [] as string[],
        bio: '',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.profession.trim()) newErrors.profession = 'Profession is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            // 1. Create the base account
            // We'll set a default age of 21 for mentors if not collected, or 18+ requirement
            await signUp(formData.email, formData.password, formData.fullName, 25, 'mentor');

            // 2. Update with mentor specific details
            // The user object is now created in AuthContext, we just need to add the extra fields
            // referencing (but NOT importing) the context logic, we can rely on the fact 
            // that 'user' is now set in the context state, but we might need to wait or just fire-and-forget
            // or better yet, use a specialized function if we had one.
            // Since we don't have direct access to 'db' here without importing, and correct separation of concerns...
            // We should arguably extend 'signUp' or use 'updateUserProfile'.

            // However, `signUp` in AuthContext doesn't return the User object easily to use here without a refactor,
            // but `signUp` waits for `setDoc`.

            // Ideally we'd call: 
            // await updateUserProfile({ 
            //    profession: formData.profession,
            //    linkedin: formData.linkedin,
            //    bio: formData.bio,
            //    status: 'pending'
            // });
            // BUT `updateUserProfile` requires `user` to be set in context, which might not have propagated yet
            // in the same render cycle if `signUp` just finished.

            // Workaround: We will redirect to a setup page OR assume success for MVP.
            // Actually, let's fix this properly. 
            // We will import `db` and `doc` and `updateDoc` mostly for this one-off, 
            // OR use the `updateUserProfile` if we trust the await.

        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ general: 'Failed to create account. Please try again.' });
            setLoading(false);
            return;
        }

        // We do the update in a separate try/catch block or just assume it works for the flow 
        // because we can't easily wait for the context update in the same closure without complex logic.
        // FOR MVP: We will assume AuthContext's signUp sets the 'user' state fast enough or we just manual update firestore.

        try {
            const { auth, db } = await import('@/lib/firebase');
            const { doc, setDoc } = await import('firebase/firestore');

            if (auth.currentUser) {
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    profession: formData.profession,
                    linkedin: formData.linkedin,
                    bio: formData.bio,
                    status: 'pending',
                    expertise: formData.expertise
                }, { merge: true });
            }

            router.push('/dashboard/mentor?new=true'); // Redirect with a flag to show "Application Received"
        } catch (err) {
            console.error("Error saving mentor details", err);
            // Even if this fails, the account is created.
            router.push('/dashboard/mentor');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
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
                        <h1>Become a Mentor</h1>
                        <p>Share your experience and guide the next generation of African leaders.</p>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span>✓</span> Give back to the community
                            </div>
                            <div className={styles.feature}>
                                <span>✓</span> Flexible time commitment
                            </div>
                            <div className={styles.feature}>
                                <span>✓</span> Shape future careers
                            </div>
                            <div className={styles.feature}>
                                <span>✓</span> Join a network of professionals
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formHeader}>
                        <h2>Mentor Registration</h2>
                        <p>Already have an account? <Link href="/auth/login">Log in</Link></p>
                    </div>

                    {errors.general && <div className="alert alert-error">{errors.general}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                                placeholder="e.g. Dr. Jane K."
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                            />
                            {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            {errors.email && <p className="form-error">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Profession / Job Title</label>
                            <input
                                type="text"
                                className={`form-input ${errors.profession ? 'form-input-error' : ''}`}
                                placeholder="e.g. Software Engineer"
                                value={formData.profession}
                                onChange={(e) => handleInputChange('profession', e.target.value)}
                            />
                            {errors.profession && <p className="form-error">{errors.profession}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">LinkedIn URL (Optional)</label>
                            <input
                                type="url"
                                className="form-input"
                                placeholder="https://linkedin.com/in/..."
                                value={formData.linkedin}
                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            {errors.password && <p className="form-error">{errors.password}</p>}
                        </div>

                        <div className="form-group">
                            <label className={`form-check ${errors.agreeToTerms ? styles.checkError : ''}`}>
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                />
                                <span className="form-check-label">
                                    I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/safeguarding">Safeguarding Policy</Link>
                                </span>
                            </label>
                            {errors.agreeToTerms && <p className="form-error">{errors.agreeToTerms}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Apply as Mentor'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
