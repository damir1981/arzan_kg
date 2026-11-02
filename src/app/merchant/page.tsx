'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Inbox,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    Phone,
    PlusCircle,
    Sparkles,
    QrCode,
    MessageSquareWarning,
    Building2,
    Ticket,
} from 'lucide-react';
import {
    getUserVouchers,
    approveVoucherRequest,
    declineVoucherRequest,
} from '@/lib/deals';
import { Voucher } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export default function MerchantRequestsPage() {
    const { t, language } = useLanguage();
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [decliningId, setDecliningId] = useState<string | null>(null);
    const [declineReason, setDeclineReason] = useState<string>('');

    const refreshVouchers = () => {
        setVouchers(getUserVouchers());
    };

    useEffect(() => {
        refreshVouchers();
        window.addEventListener('vouchers-updated', refreshVouchers);
        return () => window.removeEventListener('vouchers-updated', refreshVouchers);
    }, []);

    const pendingRequests = vouchers.filter((v) => v.status === 'pending');
    const processedRequests = vouchers.filter((v) => v.status !== 'pending');

    const handleApprove = (id: string) => {
        approveVoucherRequest(id);
        refreshVouchers();
    };

    const handleOpenDecline = (id: string) => {
        setDecliningId(id);
        setDeclineReason(t('merchant_decline_preset_no_spots'));
    };

    const handleConfirmDecline = (id: string) => {
        const finalReason =
            declineReason.trim() || t('merchant_decline_preset_no_spots');
        declineVoucherRequest(id, finalReason);
        setDecliningId(null);
        setDeclineReason('');
        refreshVouchers();
    };

    const dateLocale = language === 'kg' ? 'ky-KG' : 'ru-RU';

    return (
        <div className="min-h-screen py-12 pb-28 font-[family-name:var(--font-geist-sans)]">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            {t('merchant_panel_badge')}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            {t('merchant_panel_title')}
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                            {t('merchant_panel_subtitle')}
                        </p>
                    </div>

                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold transition self-start shrink-0 shadow-lg shadow-white/10"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>{t('nav_partners')}</span>
                    </Link>
                </div>

                {/* Pending Requests Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2.5 mb-4">
                        <h2 className="text-base font-bold text-white tracking-tight">
                            {t('merchant_tab_pending')}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {pendingRequests.length}
                        </span>
                    </div>

                    {pendingRequests.length === 0 ? (
                        <div className="apple-glass-card rounded-[28px] p-10 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3 text-zinc-500">
                                <Inbox className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">
                                {t('merchant_empty_pending')}
                            </h3>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingRequests.map((req) => (
                                <div
                                    key={req.id}
                                    className="apple-glass-card rounded-[28px] p-5 md:p-6 border border-amber-500/25 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                                        {/* Left: Deal & Customer Info */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-2xl shrink-0 border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-300">
                                                <Ticket className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                                        <Clock className="w-3 h-3" />
                                                        {t('voucher_status_pending')}
                                                    </span>
                                                    <span className="text-[11px] font-semibold text-emerald-400">
                                                        -{req.discountPercent}% • {req.merchantName}
                                                    </span>
                                                </div>

                                                <Link
                                                    href={`/product/${req.dealId}`}
                                                    className="block text-sm md:text-base font-bold text-white hover:text-emerald-400 transition line-clamp-1"
                                                >
                                                    {req.dealTitle}
                                                </Link>

                                                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-300">
                                                    <span className="inline-flex items-center gap-1.5 font-medium">
                                                        <User className="w-3.5 h-3.5 text-zinc-500" />
                                                        <span className="text-zinc-500">{t('deal_customer_name_label')}:</span>{' '}
                                                        {req.customerName || 'Гость Kupon.kg'}
                                                    </span>
                                                    {req.customerPhone && (
                                                        <a
                                                            href={`tel:${req.customerPhone}`}
                                                            className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-medium"
                                                        >
                                                            <Phone className="w-3.5 h-3.5" />
                                                            {req.customerPhone}
                                                        </a>
                                                    )}
                                                    <span className="text-[11px] text-zinc-500">
                                                        {new Date(req.purchasedAt).toLocaleTimeString(dateLocale, {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Approve / Decline Buttons */}
                                        <div className="flex sm:items-center gap-2.5 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => handleApprove(req.id)}
                                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>{t('merchant_approve_btn')}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleOpenDecline(req.id)}
                                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-bold text-xs transition cursor-pointer"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                <span>{t('merchant_decline_btn')}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expandable Decline Reason Input */}
                                    {decliningId === req.id && (
                                        <div className="mt-5 pt-4 border-t border-white/10 space-y-3 animate-fade-in">
                                            <label className="block text-xs font-bold text-rose-300 flex items-center gap-1.5">
                                                <MessageSquareWarning className="w-4 h-4" />
                                                <span>{t('voucher_declined_reason_prefix')}</span>
                                            </label>

                                            {/* Quick Preset Chips */}
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDeclineReason(t('merchant_decline_preset_no_spots'))
                                                    }
                                                    className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 transition cursor-pointer"
                                                >
                                                    {t('merchant_decline_preset_no_spots')}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDeclineReason(t('merchant_decline_preset_tomorrow'))
                                                    }
                                                    className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 transition cursor-pointer"
                                                >
                                                    {t('merchant_decline_preset_tomorrow')}
                                                </button>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2.5">
                                                <input
                                                    type="text"
                                                    value={declineReason}
                                                    onChange={(e) => setDeclineReason(e.target.value)}
                                                    placeholder={t('merchant_decline_placeholder')}
                                                    className="flex-1 px-4 py-2.5 rounded-full bg-black/50 border border-rose-500/30 text-xs text-white placeholder-zinc-500 outline-none focus:border-rose-400"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleConfirmDecline(req.id)}
                                                        className="px-4 py-2.5 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition cursor-pointer"
                                                    >
                                                        {t('merchant_confirm_decline_btn')}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDecliningId(null)}
                                                        className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 font-semibold text-xs transition cursor-pointer"
                                                    >
                                                        {t('merchant_cancel_btn')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Processed History Section */}
                <div>
                    <div className="flex items-center gap-2.5 mb-4">
                        <h2 className="text-base font-bold text-white tracking-tight">
                            {t('merchant_tab_processed')}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/[0.06] text-zinc-400">
                            {processedRequests.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {processedRequests.map((item) => (
                            <div
                                key={item.id}
                                className="apple-glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-90"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl shrink-0 border border-white/10 bg-white/[0.04] flex items-center justify-center text-emerald-400">
                                        <Ticket className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs font-bold text-white line-clamp-1">
                                                {item.dealTitle}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-0.5">
                                            <span className="inline-flex items-center gap-1">
                                                <Building2 className="w-3 h-3 text-zinc-500" />
                                                {item.merchantName}
                                            </span>
                                            <span>•</span>
                                            <span>{item.customerName || 'Гость Kupon.kg'}</span>
                                        </div>
                                        {item.status === 'declined' && item.declineReason && (
                                            <p className="text-[11px] text-rose-300 mt-1">
                                                {t('voucher_declined_reason_prefix')}: «{item.declineReason}»
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                                    {item.status === 'active' ? (
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                                <QrCode className="w-3 h-3" />
                                                {item.code}
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-300">
                                                <CheckCircle2 className="w-3 h-3" />
                                                {t('voucher_status_active')}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                            <XCircle className="w-3 h-3" />
                                            {t('voucher_status_declined')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
