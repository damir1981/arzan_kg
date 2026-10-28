'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ticket, QrCode, MapPin, Phone, Calendar, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react';
import { Voucher } from '@/types';
import { getUserVouchers } from '@/lib/deals';
import { useLanguage } from '@/context/LanguageContext';

export default function VouchersPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const { language, t } = useLanguage();

    useEffect(() => {
        setVouchers(getUserVouchers());

        const handleUpdate = () => {
            setVouchers(getUserVouchers());
        };
        window.addEventListener('vouchers-updated', handleUpdate);
        return () => window.removeEventListener('vouchers-updated', handleUpdate);
    }, []);

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const locale = language === 'kg' ? 'ky-KG' : 'ru-RU';

    return (
        <div className="container py-12 max-w-4xl mx-auto px-4 pb-28 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-400 mb-3">
                        <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Apple Wallet Style Pass</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <span>{t('voucher_title')}</span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {vouchers.length}
                        </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        {t('voucher_subtitle')}
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-full text-xs font-bold transition shadow-sm w-fit"
                >
                    <span>{t('voucher_explore_cta')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {vouchers.length === 0 ? (
                <div className="py-20 px-4 text-center apple-glass-card rounded-[32px] max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center mx-auto mb-4">
                        <Ticket className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        {t('voucher_empty_title')}
                    </h2>
                    <p className="text-xs text-zinc-500 mb-6">
                        {t('voucher_empty_desc')}
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full text-xs hover:bg-zinc-200 transition shadow-lg shadow-white/10"
                    >
                        <span>{t('cat_all')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {vouchers.map((voucher) => (
                        <div
                            key={voucher.id}
                            className="apple-glass-card rounded-[32px] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:border-white/20"
                        >
                            {/* Left: Pass Info */}
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="apple-badge-discount px-3 py-1 rounded-full text-xs font-black text-emerald-300">
                                            {t('deal_discount_label')} {voucher.discountPercent}%
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            {t('voucher_status_active')}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                                        {voucher.dealTitle}
                                    </h3>

                                    <div className="space-y-2 text-xs text-zinc-400 mt-5">
                                        <div className="flex items-center gap-2 font-medium text-zinc-200">
                                            <span>{voucher.merchantName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                                            <span>{voucher.merchantAddress}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5 text-zinc-500" />
                                            <span>{voucher.merchantPhone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                            <span>{t('voucher_valid_until')}: {new Date(voucher.expiresAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
                                    <span>{t('voucher_issued_date')}: {new Date(voucher.purchasedAt).toLocaleDateString(locale)}</span>
                                    <Link href={`/product/${voucher.dealId}`} className="text-zinc-300 hover:text-white transition font-medium">
                                        {t('voucher_view_deal')} →
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Apple Pass Ticket Stub with QR */}
                            <div className="relative flex md:flex-col items-center justify-center bg-black/40 p-6 md:p-8 md:w-64 border-t md:border-t-0 md:border-l border-dashed border-white/[0.1]">
                                {/* Cutout notches */}
                                <div className="hidden md:block absolute -top-3 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[#050507] border border-white/[0.08]" />
                                <div className="hidden md:block absolute -bottom-3 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[#050507] border border-white/[0.08]" />

                                <div className="flex flex-col items-center text-center w-full">
                                    {/* Minimalist White QR Box */}
                                    <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-xl flex items-center justify-center mb-3">
                                        <QrCode className="w-24 h-24 text-black" />
                                    </div>

                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                                        {t('voucher_code_label')}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => copyCode(voucher.code)}
                                        className="mt-1 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl font-mono text-sm font-bold text-white flex items-center gap-1.5 transition cursor-pointer"
                                    >
                                        <span>{voucher.code}</span>
                                        {copiedCode === voucher.code ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                        )}
                                    </button>
                                    <span className="text-[10px] text-zinc-500 mt-2">
                                        {t('voucher_cashier_hint')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
