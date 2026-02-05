'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Listen to auth state changes
    useEffect(() => {
        // Optimistic load from localStorage for instant UI
        const storedUser = localStorage.getItem('ye_user');
        const storedProfile = localStorage.getItem('ye_profile');

        if (storedUser && storedProfile) {
            try {
                setUser(JSON.parse(storedUser));
                setProfile(JSON.parse(storedProfile));
                setLoading(false);
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

                const mockUser = {
                    uid: 'mock-user-' + Date.now(),
                    email,
                    displayName,
                } as User;

                const mockProfile: UserProfile = {
                    uid: mockUser.uid,
                    email,
                    displayName,
                    photoURL: null,
                    role,
                    age,
                    onboardingComplete: false,
                    parentalConsentVerified: age >= 18,
                    createdAt: new Date(),
                };

                setUser(mockUser);
                setProfile(mockProfile);

                localStorage.setItem('ye_user', JSON.stringify(mockUser));
                localStorage.setItem('ye_profile', JSON.stringify(mockProfile));
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
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign up';
            setError(errorMessage);
            throw err;
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

                if (password === 'fail') throw new Error('Invalid credentials (mock)');

                const mockUser = {
                    uid: 'mock-user-123',
                    email,
                    displayName: 'Demo User',
                } as User;

                const mockProfile: UserProfile = {
                    uid: 'mock-user-123',
                    email,
                    displayName: 'Demo User',
                    photoURL: null,
                    role: 'mentee',
                    age: 20,
                    onboardingComplete: true,
                    parentalConsentVerified: true,
                    createdAt: new Date(),
                };

                setUser(mockUser);
                setProfile(mockProfile);

                localStorage.setItem('ye_user', JSON.stringify(mockUser));
                localStorage.setItem('ye_profile', JSON.stringify(mockProfile));
                return;
            }

            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign in';
            setError(errorMessage);
            throw err;
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
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
            setError(errorMessage);
            throw err;
        }
    };

    // Reset password
    const resetPassword = async (email: string) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
            setError(errorMessage);
            throw err;
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
            const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
            setError(errorMessage);
            throw err;
        }
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
