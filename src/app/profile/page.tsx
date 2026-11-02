'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { User, LogOut, Ticket, Heart, ShieldCheck, Mail, ArrowRight, Loader2, Sparkles, PlusCircle } from 'lucide-react';
import { getUserVouchers, getFavorites } from '@/lib/deals';

export default function ProfilePage() {
    const { user, loading: authLoading, logOut } = useAuth();
    const { t } = useLanguage();
    const [voucherCount, setVoucherCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        setVoucherCount(getUserVouchers().length);
        setFavoriteCount(getFavorites().length);
    }, []);

    if (authLoading) {
        return (
            <div className="min-h-screen py-24 flex flex-col items-center justify-center text-zinc-500">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mb-3" />
                <p className="text-xs">{t('loading_deals')}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container max-w-lg mx-auto py-20 px-4 text-center font-[family-name:var(--font-geist-sans)]">
                <div className="apple-glass-card rounded-[32px] p-8 md:p-10 shadow-2xl">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-emerald-400 flex items-center justify-center mx-auto mb-5">
                        <User className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight mb-2">
                        {t('profile_guest_title')}
                    </h1>
                    <p className="text-xs text-zinc-400 mb-8 leading-relaxed max-w-sm mx-auto">
                        {t('profile_guest_desc')}
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-full shadow-lg shadow-white/10 transition-all active:scale-95"
                    >
                        <span>{t('profile_guest_cta')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 pb-28 font-[family-name:var(--font-geist-sans)]">
            {/* User Profile Card */}
            <div className="apple-glass-card rounded-[32px] p-6 md:p-8 shadow-2xl mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt={user.displayName || 'Пользователь'}
                                width={84}
                                height={84}
                                className="w-20 h-20 rounded-2xl object-cover shadow-xl border border-white/10"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-zinc-800 text-white font-black text-2xl rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        )}

                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">
                                {user.displayName || 'Kupon.kg'}
                            </h1>
                            <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                                {user.email}
                            </p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-300 text-xs font-semibold rounded-full mt-3 border border-emerald-500/20">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>{t('profile_verified')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => logOut()}
                            className="p-2.5 rounded-full border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                            title={t('nav_logout')}
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Quick Navigation Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
                    <Link
                        href="/vouchers"
                        className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-center transition group"
                    >
                        <Ticket className="w-5 h-5 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <p className="text-2xl font-black text-white tracking-tight">
                            {voucherCount}
                        </p>
                        <p className="text-xs font-semibold text-zinc-400">{t('nav_my_coupons')}</p>
                    </Link>

                    <Link
                        href="/favorites"
                        className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-center transition group"
                    >
                        <Heart className="w-5 h-5 text-red-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <p className="text-2xl font-black text-white tracking-tight">
                            {favoriteCount}
                        </p>
                        <p className="text-xs font-semibold text-zinc-400">{t('nav_favorites')}</p>
                    </Link>

                    <Link
                        href="/upload"
                        className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-center transition group"
                    >
                        <PlusCircle className="w-5 h-5 text-zinc-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-bold text-white mt-1">
                            {t('profile_for_business')}
                        </p>
                        <p className="text-[11px] text-zinc-500">{t('profile_submit_deal')}</p>
                    </Link>
                </div>
            </div>

            {/* Apple Style Guide Strip */}
            <div className="apple-glass-card rounded-[32px] p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">{t('profile_how_it_works')}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-base font-black text-emerald-400 block mb-1">01</span>
                        <p className="font-bold text-white mb-1">{t('profile_step1_title')}</p>
                        <p className="text-zinc-400">{t('profile_step1_desc')}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-base font-black text-emerald-400 block mb-1">02</span>
                        <p className="font-bold text-white mb-1">{t('profile_step2_title')}</p>
                        <p className="text-zinc-400">{t('profile_step2_desc')}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-base font-black text-emerald-400 block mb-1">03</span>
                        <p className="font-bold text-white mb-1">{t('profile_step3_title')}</p>
                        <p className="text-zinc-400">{t('profile_step3_desc')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
