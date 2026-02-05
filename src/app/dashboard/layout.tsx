'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-bg)'
            }}>
                <div className="loader"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {children}

            {/* AI Companion Floating Action Button (FAB) */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 1000,
                    animation: 'float 3s ease-in-out infinite'
                }}
            >
                <button
                    onClick={() => router.push('/ai-companion')}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#FFD700', // Yellow
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    title="Talk to Rafiki"
                >
                    ✨
                </button>
            </div>
        </div>
    );
}
