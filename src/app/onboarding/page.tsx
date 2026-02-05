'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './onboarding.module.css';

interface OnboardingData {
    school: string;
    grade: string;
    interests: string[];
    goals: string[];
    mentorPreferences: string[];
}

const INTERESTS = [
    { id: 'career', label: 'Career Planning' },
    { id: 'finance', label: 'Financial Literacy' },
    { id: 'communication', label: 'Communication' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'tech', label: 'Technology' },
    { id: 'arts', label: 'Arts & Creativity' },
    { id: 'science', label: 'Science & Research' },
    { id: 'business', label: 'Entrepreneurship' },
    { id: 'relationships', label: 'Relationships' },
];

const GOALS = [
    { id: 'university', label: 'Get into university' },
    { id: 'skills', label: 'Learn new skills' },
    { id: 'career', label: 'Figure out my career path' },
    { id: 'mentor', label: 'Find a mentor' },
    { id: 'confidence', label: 'Build confidence' },
    { id: 'network', label: 'Meet new people' },
    { id: 'money', label: 'Learn to manage money' },
    { id: 'communicate', label: 'Communicate better' },
];

const MENTOR_PREFS = [
    { id: 'same_gender', label: 'Same gender as me' },
    { id: 'same_region', label: 'From my region' },
    { id: 'same_field', label: 'Works in my dream field' },
    { id: 'young', label: 'Young professional (20-30)' },
    { id: 'experienced', label: 'Experienced mentor (30+)' },
];

const SCHOOLS = [
    'Alliance High School',
    'Kenya High School',
    'Starehe Boys Centre',
    'Pangani Girls High School',
    'Nairobi School',
    'Moi Girls High School',
    'Lenana School',
    'Loreto Convent Msongari',
    'State House Girls',
    'Other',
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<OnboardingData>({
        school: '',
        grade: '',
        interests: [],
        goals: [],
        mentorPreferences: [],
    });
    const [loading, setLoading] = useState(false);

    const steps = [
        { title: 'About You' },
        { title: 'Your Interests' },
        { title: 'Your Goals' },
        { title: 'Mentor Match' },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            // Save onboarding data to Firestore
            console.log('Onboarding complete:', formData);
            // Navigate to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Onboarding error:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelection = (field: 'interests' | 'goals' | 'mentorPreferences', id: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(id)
                ? prev[field].filter(item => item !== id)
                : [...prev[field], id],
        }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0:
                return formData.school && formData.grade;
            case 1:
                return formData.interests.length >= 2;
            case 2:
                return formData.goals.length >= 1;
            case 3:
                return true;
            default:
                return false;
        }
    };

    return (
        <div className={styles.onboardingPage}>
            <div className={styles.container}>
                {/* Progress Header */}
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <span className={styles.logoMark}>YE</span>
                        <span>Youth Educated</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                    <div className={styles.stepIndicator}>
                        Step {currentStep + 1} of {steps.length}
                    </div>
                </div>

                {/* Step Content */}
                <div className={styles.content}>
                    {/* Step 0: About You */}
                    {currentStep === 0 && (
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>01</div>
                            <h1>Karibu! Welcome to Youth Educated.</h1>
                            <p className={styles.stepDescription}>
                                Your journey to build your future starts now. Tell us a bit about yourself so we can personalize your path.
                            </p>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>What school do you attend?</label>
                                <select
                                    className={styles.select}
                                    value={formData.school}
                                    onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                                >
                                    <option value="">Select your school</option>
                                    {SCHOOLS.map(school => (
                                        <option key={school} value={school}>{school}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>What grade/form are you in?</label>
                                <div className={styles.gradeButtons}>
                                    {['Form 1', 'Form 2', 'Form 3', 'Form 4', 'University', 'Graduate'].map(grade => (
                                        <button
                                            key={grade}
                                            type="button"
                                            className={`${styles.gradeBtn} ${formData.grade === grade ? styles.selected : ''}`}
                                            onClick={() => setFormData(prev => ({ ...prev, grade }))}
                                        >
                                            {grade}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Interests */}
                    {currentStep === 1 && (
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>02</div>
                            <h1>What Are You Interested In?</h1>
                            <p className={styles.stepDescription}>
                                Select at least 2 topics you&apos;d like to explore. This helps us recommend the right content for you.
                            </p>

                            <div className={styles.optionsGrid}>
                                {INTERESTS.map(interest => (
                                    <button
                                        key={interest.id}
                                        type="button"
                                        className={`${styles.optionCard} ${formData.interests.includes(interest.id) ? styles.selected : ''}`}
                                        onClick={() => toggleSelection('interests', interest.id)}
                                    >
                                        <span className={styles.optionLabel}>{interest.label}</span>
                                        {formData.interests.includes(interest.id) && (
                                            <span className={styles.checkmark}>
                                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                                    <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <p className={styles.selectionCount}>
                                {formData.interests.length} selected (minimum 2)
                            </p>
                        </div>
                    )}

                    {/* Step 2: Goals */}
                    {currentStep === 2 && (
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>03</div>
                            <h1>What do you want to build?</h1>
                            <p className={styles.stepDescription}>
                                Choose a few goals. We&apos;ll personalize your journey.
                            </p>

                            <div className={styles.optionsGrid}>
                                {[
                                    { id: 'career', label: 'Career Growth' },
                                    { id: 'grades', label: 'Better Grades' },
                                    { id: 'confidence', label: 'Confidence' },
                                    { id: 'leadership', label: 'Leadership Skills' },
                                    { id: 'financial', label: 'Financial Freedom' },
                                    { id: 'relationships', label: 'Healthy Relationships' },
                                ].map(goal => (
                                    <button
                                        key={goal.id}
                                        type="button"
                                        className={`${styles.optionCard} ${formData.goals.includes(goal.id) ? styles.selected : ''}`}
                                        onClick={() => toggleSelection('goals', goal.id)}
                                    >
                                        <span className={styles.optionLabel}>{goal.label}</span>
                                        {formData.goals.includes(goal.id) && (
                                            <span className={styles.checkmark}>
                                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                                    <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <p className={styles.selectionCount}>
                                {formData.goals.length} selected
                            </p>
                        </div>
                    )}

                    {/* Step 3: Mentor Preferences - Keeping this but refining copy slightly if needed */}
                    {currentStep === 3 && (
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>04</div>
                            <h1>You&apos;re all set! ✨</h1>
                            <p className={styles.stepDescription}>
                                We&apos;re so excited to have you in the Youth Educated family.
                            </p>

                            <div className={styles.readyCard}>
                                <h3>Ready to Start?</h3>
                                <p>We&apos;ve customized a learning path just for you. Your dashboard is waiting.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Footer */}
                <div className={styles.footer}>
                    {currentStep > 0 && (
                        <button
                            type="button"
                            className={styles.backBtn}
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    )}

                    {currentStep < steps.length - 1 ? (
                        <button
                            type="button"
                            className={`btn btn-primary btn-lg ${styles.nextBtn}`}
                            onClick={handleNext}
                            disabled={!canProceed()}
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={`btn btn-secondary btn-lg ${styles.nextBtn}`}
                            onClick={handleComplete}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loader loader-sm"></span>
                                    Setting up...
                                </>
                            ) : (
                                <>Get Started</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
