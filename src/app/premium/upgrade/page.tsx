'use client';

import Link from 'next/link';
import styles from './upgrade.module.css';

export default function PremiumUpgradePage() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <Link href="/settings" className={styles.backLink}>← Back to Settings</Link>
                <div>
                    <h1>Free vs. Premium</h1>
                    <p>Invest in your future. Sponsor a peer. Change Kenya.</p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Free Tier */}
                    <div className={`${styles.card} ${styles.freeCard}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.tierLabel}>FREE</span>
                            <h2>Starter Plan</h2>
                            <span className={styles.price}>KES 0<small>/forever</small></span>
                        </div>
                        <p className={styles.tierDesc}>
                            Get started on your journey to success with essential tools and resources.
                        </p>
                        <ul className={styles.features}>
                            <li>
                                <span className={styles.checkBlue}>✓</span>
                                5 Core Life-Skills Lessons
                            </li>
                            <li>
                                <span className={styles.checkBlue}>✓</span>
                                1 Mentor Chat / Month
                            </li>
                            <li>
                                <span className={styles.checkBlue}>✓</span>
                                Access to Group Challenges
                            </li>
                            <li>
                                <span className={styles.checkBlue}>✓</span>
                                Basic Progress Tracking
                            </li>
                            <li>
                                <span className={styles.checkBlue}>✓</span>
                                Community Forum Access
                            </li>
                        </ul>
                        <div className={styles.currentPlan}>Your Current Plan</div>
                    </div>

                    {/* Premium Tier */}
                    <div className={`${styles.card} ${styles.premiumCard}`}>
                        <div className={styles.badge}>✨ Most Popular</div>
                        <div className={styles.cardHeader}>
                            <span className={styles.tierLabelPremium}>PREMIUM</span>
                            <h2>Learner Pro</h2>
                            <span className={styles.price}>KES 499<small>/month</small></span>
                        </div>
                        <p className={styles.tierDesc}>
                            Unlock your full potential with unlimited access and personalized guidance.
                        </p>
                        <ul className={styles.features}>
                            <li>
                                <span className={styles.checkCoral}>✨</span>
                                <strong>Unlimited</strong> Mentor Access
                            </li>
                            <li>
                                <span className={styles.checkCoral}>✨</span>
                                Personalized AI Companion (Rafiki)
                            </li>
                            <li>
                                <span className={styles.checkCoral}>✨</span>
                                Verified Completion Certificates
                            </li>
                            <li>
                                <span className={styles.checkCoral}>✨</span>
                                Exclusive Camp & Workshop Discounts
                            </li>
                            <li>
                                <span className={styles.checkCoral}>✨</span>
                                Parent Dashboard Access
                            </li>
                            <li>
                                <span className={styles.checkCoral}>✨</span>
                                Priority Support & Matching
                            </li>
                        </ul>
                        <button className={styles.upgradeBtn}>
                            Upgrade Now — Impact Yourself & Another Student
                        </button>
                        <p className={styles.impactNote}>
                            🤝 <strong>Every subscription sponsors one free user.</strong>
                        </p>
                    </div>
                </div>

                {/* Social Proof */}
                <div className={styles.socialProof}>
                    <h3>Join 2,500+ Premium Learners</h3>
                    <div className={styles.testimonials}>
                        <div className={styles.testimonial}>
                            <p>&ldquo;The unlimited mentor access changed my life. I got an internship at Safaricom!&rdquo;</p>
                            <span>— Faith M., Nairobi</span>
                        </div>
                        <div className={styles.testimonial}>
                            <p>&ldquo;Knowing my subscription helps another student makes me proud to pay.&rdquo;</p>
                            <span>— Brian O., Kisumu</span>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className={styles.faq}>
                    <h3>Frequently Asked Questions</h3>
                    <div className={styles.faqGrid}>
                        <div className={styles.faqItem}>
                            <h4>How does the sponsorship work?</h4>
                            <p>For every premium subscription, we provide one student from an underserved community with free access to all premium features.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>Can I pay via M-Pesa?</h4>
                            <p>Yes! We accept M-Pesa, bank cards, and mobile money. Payment is easy and secure.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>Can I cancel anytime?</h4>
                            <p>Absolutely. No lock-in contracts. Cancel anytime from your settings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
