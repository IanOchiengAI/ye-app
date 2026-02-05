'use client';

import { memo } from 'react';
import styles from '@/app/ai-companion/ai-companion.module.css';
import Link from 'next/link';

interface PremiumUpsellProps {
    messagesRemaining: number;
    onClose: () => void;
    onUnlockTrial?: () => void;
}

/**
 * Premium Upsell Modal for AI Companion
 * 
 * This component showcases the value proposition of Rafiki Premium:
 * - Unlimited AI conversations
 * - Personalized career guidance
 * - Priority mentor matching
 * - Offline access
 * 
 * Designed to convert free users at natural friction points.
 */
const PremiumUpsellModal = memo(function PremiumUpsellModal({
    messagesRemaining,
    onClose,
    onUnlockTrial
}: PremiumUpsellProps) {
    return (
        <div className={styles.upgradeOverlay}>
            <div className={styles.upgradeModal}>
                <div className={styles.upgradeHeader}>
                    <span className={styles.upgradeIcon}>🚀</span>
                    <h2>Unlock Rafiki Premium</h2>
                    <p className={styles.upgradeSubtitle}>
                        Your personal AI mentor, available 24/7
                    </p>
                </div>

                <div className={styles.upgradeProblem}>
                    {messagesRemaining <= 0 ? (
                        <p>You&apos;ve used all your free messages for today. Come back tomorrow or upgrade now!</p>
                    ) : (
                        <p>You have <strong>{messagesRemaining}</strong> free messages remaining today.</p>
                    )}
                </div>

                <div className={styles.upgradeFeatures}>
                    <h3>Premium Benefits:</h3>
                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>💬</span>
                            <div>
                                <strong>Unlimited Conversations</strong>
                                <p>Chat with Rafiki anytime, no daily limits</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>🎯</span>
                            <div>
                                <strong>Personalized Career Path</strong>
                                <p>AI-powered career recommendations based on your skills</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>🤝</span>
                            <div>
                                <strong>Priority Mentor Matching</strong>
                                <p>Connect faster with Safaricom, Equity & USAID mentors</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>📴</span>
                            <div>
                                <strong>Offline Access</strong>
                                <p>Save conversations & access tips without internet</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>🎙️</span>
                            <div>
                                <strong>Voice Conversations</strong>
                                <p>Speak naturally in English or Kiswahili</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>📊</span>
                            <div>
                                <strong>Progress Analytics</strong>
                                <p>Track your learning journey with insights</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.upgradeProof}>
                    <p>⭐ Trusted by <strong>8,000+ premium students</strong> across Kenya</p>
                    <p>&quot;Rafiki helped me choose my KCSE subjects wisely. Now I&apos;m studying Computer Science at UoN!&quot; — James, Nairobi</p>
                </div>

                <div className={styles.upgradePricing}>
                    <div className={styles.priceTag}>
                        <span className={styles.oldPrice}>KES 1,000</span>
                        <span className={styles.currentPrice}>KES 500<span>/month</span></span>
                    </div>
                    <p className={styles.priceNote}>50% off for students • Cancel anytime</p>
                </div>

                <div className={styles.upgradeActions}>
                    <Link href="/premium" className={`btn btn-primary btn-lg ${styles.upgradeCta}`}>
                        <span>Upgrade to Premium</span>
                        <span className={styles.ctaArrow}>→</span>
                    </Link>

                    {onUnlockTrial && (
                        <button
                            className={styles.trialBtn}
                            onClick={onUnlockTrial}
                        >
                            ⚡ Try Premium Free (7 Days)
                        </button>
                    )}

                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                    >
                        Maybe later
                    </button>
                </div>

                <p className={styles.upgradeGuarantee}>
                    💳 Pay via M-Pesa • 🔒 Secure • 30-day money-back guarantee
                </p>
            </div>
        </div>
    );
});

export default PremiumUpsellModal;
