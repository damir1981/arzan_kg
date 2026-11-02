'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Lock, User as UserIcon, ArrowRight, AlertCircle, Loader2, Percent } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const { t } = useLanguage();

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isRegister) {
                if (!name.trim()) throw new Error('Пожалуйста, введите ваше имя');
                await signUpWithEmail(email, password, name);
            } else {
                await signInWithEmail(email, password);
            }
            router.push('/');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Произошла ошибка при входе';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);
        try {
            await signInWithGoogle();
            router.push('/');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Ошибка входа через Google';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-md mx-auto py-16 px-4 font-[family-name:var(--font-geist-sans)]">
            <div className="apple-glass-card rounded-[32px] p-8 md:p-10 shadow-2xl">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                            <Percent className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tight">Kupon.kg</span>
                    </Link>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        {isRegister ? t('login_create_account') : t('nav_personal_account')}
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        {isRegister
                            ? t('login_subtitle_register')
                            : t('login_subtitle_signin')}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white/[0.04] p-1 rounded-full border border-white/[0.06] mb-6">
                    <button
                        type="button"
                        onClick={() => { setIsRegister(false); setError(null); }}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                            !isRegister
                                ? 'bg-white text-black shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        {t('login_tab_signin')}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsRegister(true); setError(null); }}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                            isRegister
                                ? 'bg-white text-black shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        {t('login_tab_register')}
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Google Sign In (Apple / Minimalist White Pill) */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-full text-xs font-semibold text-white transition shadow-sm mb-6 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>{t('login_google')}</span>
                </button>

                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-white/[0.08] w-full"></div>
                    <span className="bg-[#121215] px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold absolute">
                        {t('login_or_email')}
                    </span>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5">
                                {t('login_your_name')}
                            </label>
                            <div className="relative">
                                <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Азамат Асанов"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] focus:border-white/20 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none transition"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5">
                            {t('login_email')}
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] focus:border-white/20 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5">
                            {t('login_password')}
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] focus:border-white/20 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none transition"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-3 bg-white hover:bg-zinc-200 text-black font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-white/10 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                        ) : (
                            <>
                                <span>{isRegister ? t('login_submit_register') : t('nav_login')}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
