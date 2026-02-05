'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PAYMENT_PLANS, initiateSTKPush } from '@/lib/mpesa';
import styles from './premium.module.css';

export default function PremiumPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleSubscribe = async (planId: string, price: number) => {
        if (price === 0) {
            alert('Basic plan is free!');
            return;
        }

        setSelectedPlan(planId);
        setStatus(null);
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan || !phoneNumber) return;

        setLoading(true);
        try {
            const plan = PAYMENT_PLANS.find(p => p.id === selectedPlan);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log(`Processing payment for ${plan?.name}: KES ${plan?.price}`);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className="container">
                    <Link href="/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
                    <h1>Invest in Your Future</h1>
                    <p>Unlock premium features or sponsor a student to access life-changing mentorship.</p>
                </div>
            </header>

            <div className="container">
                <div className={styles.plansGrid}>
                    {PAYMENT_PLANS.map(plan => (
                        <div key={plan.id} className={`${styles.planCard} ${selectedPlan === plan.id ? styles.selected : ''}`}>
                            <div className={styles.planHeader} style={{ borderColor: plan.color }}>
                                <h3 style={{ color: plan.color }}>{plan.name}</h3>
                                <div className={styles.price}>
                                    <span className={styles.currency}>KES</span>
                                    <span className={styles.amount}>{plan.price}</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                            </div>

                            <ul className={styles.features}>
                                {plan.features.map((feat, i) => (
                                    <li key={i}>✓ {feat}</li>
                                ))}
                            </ul>

                            <button
                                className={`btn ${plan.btnColor} btn-full`}
                                onClick={() => handleSubscribe(plan.id, plan.price)}
                            >
                                {plan.price === 0 ? 'Current Plan' : 'Select Plan'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Payment Modal / Section */}
                {selectedPlan && (
                    <div className={styles.paymentSection} id="payment">
                        <div className={styles.paymentForm}>
                            <h3>Complete Payment with M-Pesa</h3>
                            <p>Enter your M-Pesa phone number to pay <strong>KES {PAYMENT_PLANS.find(p => p.id === selectedPlan)?.price}</strong>.</p>

                            {status === 'success' ? (
                                <div className="alert alert-success">
                                    <h4>Payment Initiated!</h4>
                                    <p>Check your phone for the M-Pesa STK push to enter your PIN.</p>
                                    <button className="btn btn-primary mt-4" onClick={() => setStatus(null)}>Done</button>
                                </div>
                            ) : (
                                <form onSubmit={handlePayment}>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-input"
                                            placeholder="e.g. 0712 345 678"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-full btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : 'Pay with M-Pesa'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
