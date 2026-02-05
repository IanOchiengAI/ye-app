import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Types for our dashboard data
export interface Badge {
    id: number;
    name: string;
    icon: string;
    earned: boolean;
}

export interface Goal {
    id: number;
    title: string;
    progress: number;
}

export interface MenteeProgress {
    progress: number;
    completedModules: number;
    totalModules: number;
    badges: Badge[];
    currentGoals: Goal[];
    loading: boolean;
    error: string | null;
}

export function useMenteeProgress() {
    const { user } = useAuth();
    const [data, setData] = useState<MenteeProgress>({
        progress: 0,
        completedModules: 0,
        totalModules: 10,
        badges: [],
        currentGoals: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        // In a real app, this would fetch from Firestore using user.uid
        // For now, we simulate an API call that returns the structure we need

        if (!user) {
            setData(prev => ({ ...prev, loading: false }));
            return;
        }

        const fetchProgress = async () => {
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock data - eventually retrieve from db.users.doc(uid).collection('progress')
                setData({
                    progress: 35,
                    completedModules: 2,
                    totalModules: 10,
                    badges: [
                        { id: 1, name: 'First Steps', icon: '🎯', earned: true },
                        { id: 2, name: 'Quick Learner', icon: '⚡', earned: true },
                        { id: 3, name: 'Goal Setter', icon: '🏆', earned: false },
                    ],
                    currentGoals: [
                        { id: 1, title: 'Complete Financial Literacy module', progress: 60 },
                        { id: 2, title: 'Connect with a mentor', progress: 0 },
                    ],
                    loading: false,
                    error: null
                });
            } catch (err) {
                console.error("Error fetching progress:", err);
                setData(prev => ({ ...prev, loading: false, error: 'Failed to load progress' }));
            }
        };

        fetchProgress();
    }, [user]);

    return data;
}
