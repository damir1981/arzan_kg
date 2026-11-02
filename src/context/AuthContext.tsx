'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';

const DEMO_USER_KEY = 'kupon_demo_user';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, pass: string) => Promise<void>;
    signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => {},
    signInWithEmail: async () => {},
    signUpWithEmail: async () => {},
    logOut: async () => {},
});

function createDemoUser(email: string, displayName: string): User {
    return {
        uid: 'demo_' + Date.now(),
        email,
        displayName,
        photoURL: null,
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => 'demo-token',
        getIdTokenResult: async () => ({} as any),
        reload: async () => {},
        toJSON: () => ({}),
        phoneNumber: null,
        providerId: 'demo',
    } as unknown as User;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isFirebaseConfigured && auth) {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            try {
                const stored = localStorage.getItem(DEMO_USER_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(createDemoUser(parsed.email, parsed.displayName));
                }
            } catch {
                // ignore
            }
            setLoading(false);
        }
    }, []);

    const saveDemoSession = (email: string, displayName: string) => {
        const demoUser = createDemoUser(email, displayName);
        setUser(demoUser);
        try {
            localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ email, displayName }));
        } catch {
            // ignore
        }
    };

    const signInWithGoogle = async () => {
        if (isFirebaseConfigured && auth) {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } else {
            saveDemoSession('guest@kupon.kg', 'Гость Kupon.kg');
        }
    };

    const signInWithEmail = async (email: string, pass: string) => {
        if (isFirebaseConfigured && auth) {
            await signInWithEmailAndPassword(auth, email, pass);
        } else {
            const name = email.split('@')[0] || 'Пользователь';
            saveDemoSession(email, name);
        }
    };

    const signUpWithEmail = async (email: string, pass: string, name: string) => {
        if (isFirebaseConfigured && auth) {
            const res = await createUserWithEmailAndPassword(auth, email, pass);
            if (res.user && name) {
                await updateProfile(res.user, { displayName: name });
            }
        } else {
            saveDemoSession(email, name || email.split('@')[0] || 'Пользователь');
        }
    };

    const logOut = async () => {
        if (isFirebaseConfigured && auth) {
            await signOut(auth);
        } else {
            setUser(null);
            try {
                localStorage.removeItem(DEMO_USER_KEY);
            } catch {
                // ignore
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
