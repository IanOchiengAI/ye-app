'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { getUserFriendlyError } from '@/utils/errorMessages';

// User profile type
export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role: 'mentee' | 'mentor' | 'admin';
    age?: number;
    school?: string;
    interests?: string[];
    onboardingComplete: boolean;
    parentalConsentVerified: boolean;
    createdAt: Date;
    // Subscription tier
    subscription?: 'free' | 'premium' | 'sponsor';
    assignedMentorId?: string;
    // Mentor specific fields
    status?: 'active' | 'pending' | 'rejected';
    profession?: string;
    linkedin?: string;
    bio?: string;
}

// Auth context type
interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    signUp: (email: string, password: string, displayName: string, age: number, role?: 'mentee' | 'mentor') => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
    clearMockData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Debounced localStorage persistence to reduce I/O
    const saveToStorage = useCallback((key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }, []);

    // Listen to auth state changes
    useEffect(() => {
        // Optimistic load from localStorage for instant UI (only on mount)
        const storedUser = localStorage.getItem('ye_user');
        const storedProfile = localStorage.getItem('ye_profile');

        if (storedUser && storedProfile) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const parsedProfile = JSON.parse(storedProfile);
                setUser(parsedUser);
                setProfile(parsedProfile);
            } catch (e) {
                console.error("Error parsing stored auth:", e);
                localStorage.removeItem('ye_user');
                localStorage.removeItem('ye_profile');
            }
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Update local storage with fresh user
                localStorage.setItem('ye_user', JSON.stringify(firebaseUser));
                setUser(firebaseUser);

                // Fetch user profile from Firestore
                try {
                    const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (profileDoc.exists()) {
                        const userProfile = profileDoc.data() as UserProfile;
                        setProfile(userProfile);
                        // Sync profile to local storage
                        localStorage.setItem('ye_profile', JSON.stringify(userProfile));
                    } else {
                        // Create basic profile if missing
                        const newProfile: UserProfile = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            role: 'mentee',
                            onboardingComplete: false,
                            parentalConsentVerified: false,
                            createdAt: new Date(),
                        };
                        setProfile(newProfile);
                        localStorage.setItem('ye_profile', JSON.stringify(newProfile));
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            } else {
                // Clear state and storage on logout
                setUser(null);
                setProfile(null);
                localStorage.removeItem('ye_user');
                localStorage.removeItem('ye_profile');
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign up new user
    const signUp = async (email: string, password: string, displayName: string, age: number, role: 'mentee' | 'mentor' = 'mentee') => {
        const isMockEnv = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

        try {
            setError(null);

            if (isMockEnv) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock Database persistence
                const mockAccountsJson = localStorage.getItem('ye_mock_accounts');
                // Filter out corrupted records to prevent crashes
                const mockAccounts = mockAccountsJson
                    ? JSON.parse(mockAccountsJson).filter((acc: any) => acc && acc.email)
                    : [];

                // Check if email already exists
                if (mockAccounts.some((acc: any) => acc.email.toLowerCase() === email.toLowerCase())) {
                    throw new Error('An account with this email already exists.');
                }

                const uid = 'mock-user-' + Date.now();
                const mockUser = {
                    uid,
                    email: email.toLowerCase(),
                    displayName,
                    photoURL: null,
                    emailVerified: false
                } as User;

                const mockProfile: UserProfile = {
                    uid,
                    email: email.toLowerCase(),
                    displayName,
                    photoURL: null,
                    role,
                    age,
                    onboardingComplete: false,
                    parentalConsentVerified: age >= 18,
                    createdAt: new Date(),
                };

                // Save to "Database" - Clone array to avoid mutation issues
                const updatedAccounts = [...mockAccounts, { uid, email: email.toLowerCase(), password, profile: mockProfile }];
                localStorage.setItem('ye_mock_accounts', JSON.stringify(updatedAccounts));

                // Force layout reflow/reload simulation for persistence
                setUser(mockUser);
                setProfile(mockProfile);

                localStorage.setItem('ye_user', JSON.stringify(mockUser));
                localStorage.setItem('ye_profile', JSON.stringify(mockProfile));

                // Add tiny delay to ensure storage write completes
                await new Promise(resolve => setTimeout(resolve, 100));

                return;
            }

            const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);

            // Update display name
            await updateProfile(newUser, { displayName });

            // Create user profile in Firestore
            const newProfile: UserProfile = {
                uid: newUser.uid,
                email: newUser.email,
                displayName,
                photoURL: null,
                role,
                age,
                onboardingComplete: false,
                parentalConsentVerified: age >= 18,
                createdAt: new Date(),
            };

            await setDoc(doc(db, 'users', newUser.uid), {
                ...newProfile,
                createdAt: serverTimestamp(),
            });

            setProfile(newProfile);
            localStorage.setItem('ye_profile', JSON.stringify(newProfile));
        } catch (err: unknown) {
            const errorMessage = getUserFriendlyError(err);
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Sign in existing user
    const signIn = async (email: string, password: string) => {
        const isMockEnv = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

        try {
            setError(null);

            if (isMockEnv) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockAccountsJson = localStorage.getItem('ye_mock_accounts');
                const mockAccounts = mockAccountsJson ? JSON.parse(mockAccountsJson) : [];

                const account = mockAccounts.find((acc: any) =>
                    acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
                );

                if (!account) {
                    throw new Error('Invalid email or password. (Mock Mode: Use an account you signed up with)');
                }

                const mockUser = {
                    uid: account.uid,
                    email: account.email,
                    displayName: account.profile.displayName,
                } as User;

                setUser(mockUser);
                setProfile(account.profile);

                localStorage.setItem('ye_user', JSON.stringify(mockUser));
                localStorage.setItem('ye_profile', JSON.stringify(account.profile));
                return;
            }

            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            const errorMessage = getUserFriendlyError(err);
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Sign out
    const logOut = async () => {
        try {
            setError(null);

            // Clear ALL localStorage keys
            localStorage.removeItem('ye_user');
            localStorage.removeItem('ye_profile');
            // Cleanup legacy mock keys if they exist
            localStorage.removeItem('ye_mock_user');
            localStorage.removeItem('ye_mock_profile');

            // Clear React state
            setUser(null);
            setProfile(null);

            // Attempt Firebase signOut if initialized
            try {
                await signOut(auth);
            } catch {
                // Ignore if Firebase not initialized (mock mode)
            }
        } catch (err: unknown) {
            const errorMessage = getUserFriendlyError(err);
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Reset password
    const resetPassword = async (email: string) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (err: unknown) {
            const errorMessage = getUserFriendlyError(err);
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Update user profile
    const updateUserProfile = async (data: Partial<UserProfile>) => {
        if (!user) throw new Error('No user logged in');
        const isMockEnv = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

        try {
            setError(null);

            if (isMockEnv) {
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 500));

                setProfile((prev) => {
                    const newProfile = prev ? { ...prev, ...data } : null;
                    if (newProfile) {
                        localStorage.setItem('ye_profile', JSON.stringify(newProfile));
                    }
                    return newProfile;
                });
                return;
            }

            await setDoc(doc(db, 'users', user.uid), data, { merge: true });

            setProfile((prev) => {
                const newProfile = prev ? { ...prev, ...data } : null;
                if (newProfile) {
                    localStorage.setItem('ye_profile', JSON.stringify(newProfile));
                }
                return newProfile;
            });
        } catch (err: unknown) {
            const errorMessage = getUserFriendlyError(err);
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Clear all mock data for testing
    const clearMockData = () => {
        localStorage.removeItem('ye_mock_accounts');
        localStorage.removeItem('ye_user');
        localStorage.removeItem('ye_profile');
        setUser(null);
        setProfile(null);
        window.location.reload(); // Refresh to ensure clean state
    };

    const value: AuthContextType = {
        user,
        profile,
        loading,
        error,
        signUp,
        signIn,
        logOut,
        resetPassword,
        updateUserProfile,
        clearMockData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
