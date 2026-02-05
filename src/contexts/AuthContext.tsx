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
        // Build-time check for Firebase - optional
        const isMockEnv = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

        if (isMockEnv) {
            console.log('Using Mock Auth Provider');

            // Check for existing session in localStorage
            const storedUser = localStorage.getItem('ye_mock_user');
            const storedProfile = localStorage.getItem('ye_mock_profile');

            if (storedUser && storedProfile) {
                setUser(JSON.parse(storedUser));
                setProfile(JSON.parse(storedProfile));
            }

            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Fetch user profile from Firestore
                try {
                    const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (profileDoc.exists()) {
                        setProfile(profileDoc.data() as UserProfile);
                    } else {
                        // If no profile exists (e.g. newly created via Firebase console manually), create basic one
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
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    // Fallback or retry logic could go here
                }
            } else {
                setProfile(null);
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

                localStorage.setItem('ye_mock_user', JSON.stringify(mockUser));
                localStorage.setItem('ye_mock_profile', JSON.stringify(mockProfile));
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

                localStorage.setItem('ye_mock_user', JSON.stringify(mockUser));
                localStorage.setItem('ye_mock_profile', JSON.stringify(mockProfile));
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
        const isMockEnv = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

        try {
            setError(null);

            if (isMockEnv) {
                setUser(null);
                setProfile(null);
                localStorage.removeItem('ye_mock_user');
                localStorage.removeItem('ye_mock_profile');
                return;
            }

            await signOut(auth);
            setProfile(null);
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

        try {
            setError(null);
            await setDoc(doc(db, 'users', user.uid), data, { merge: true });
            setProfile((prev) => prev ? { ...prev, ...data } : null);
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
