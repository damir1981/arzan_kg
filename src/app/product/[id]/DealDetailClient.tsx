'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    MapPin,
    Share2,
    Heart,
    Phone,
    Clock,
    Flame,
    Check,
    Star,
    CheckCircle2,
    Ticket,
    ShieldCheck,
    Instagram,
    Loader2,
    QrCode,
    Sparkles,
} from 'lucide-react';
import { Deal, Voucher } from '@/types';
import { getDealById, getAllDeals, isDealFavorite, toggleFavorite, buyVoucher, withBasePath } from '@/lib/deals';
import DealCard from '@/components/ui/DealCard';
import { useLanguage } from '@/context/LanguageContext';

export default function DealDetailClient() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const { t, tCategory } = useLanguage();

    const [deal, setDeal] = useState<Deal | null>(null);
    const [similarDeals, setSimilarDeals] = useState<Deal[]>([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [favorited, setFavorited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [purchasedVoucher, setPurchasedVoucher] = useState<Voucher | null>(null);
    const [buying, setBuying] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const item = await getDealById(id);
            setDeal(item);
            if (item) {
                setFavorited(isDealFavorite(item.id));
                const all = await getAllDeals();
                setSimilarDeals(
                    all.filter(d => d.id !== item.id && d.category === item.category).slice(0, 4)
                );
            }
            setLoading(false);
        }
        if (id) load();
    }, [id]);

    const handleToggleFavorite = () => {
        if (!deal) return;
        const next = toggleFavorite(deal.id);
        setFavorited(next);
    };

    const handleBuyCoupon = () => {
        if (!deal) return;
        setBuying(true);
        setTimeout(() => {
            const voucher = buyVoucher(deal);
            setPurchasedVoucher(voucher);
            setBuying(false);
        }, 500);
    };

    const handleShare = async () => {
        if (navigator.share && deal) {
            try {
                await navigator.share({
                    title: deal.title,
                    text: `${deal.title} со скидкой ${deal.discountPercent}% на Arzan.kg`,
                    url: window.location.href,
                });
            } catch {
                // Ignore cancel
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen py-24 flex flex-col items-center justify-center text-zinc-500">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mb-3" />
                <p className="text-xs">{t('loading_deals')}</p>
            </div>
        );
    }

    if (!deal) {
        return (
            <div className="container py-24 text-center">
                <h1 className="text-2xl font-bold text-white mb-3">{t('deal_not_found')}</h1>
                <p className="text-xs text-zinc-500 mb-6">{t('deal_not_found_desc')}</p>
                <Link href="/" className="px-5 py-2.5 bg-white text-black rounded-full text-xs font-semibold">
                    {t('cat_all')}
                </Link>
            </div>
        );
    }

    const images = (deal.images && deal.images.length > 0
        ? deal.images
        : ['/images/deal_navat.jpg']).map(withBasePath);

    return (
        <div className="min-h-screen pb-28 font-[family-name:var(--font-geist-sans)]">
            {/* Mobile Top App Bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 apple-glass md:hidden">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 rounded-full text-zinc-300 hover:text-white"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-full text-zinc-300 hover:text-white"
                    >
                        {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={handleToggleFavorite}
                        className={`p-2 rounded-full transition ${
                            favorited ? 'text-red-500' : 'text-zinc-300 hover:text-white'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl py-6 md:py-10">
                {/* Minimal Breadcrumbs */}
                <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 mb-6">
                    <Link href="/" className="hover:text-zinc-300 transition">{t('deal_catalog')}</Link>
                    <span>/</span>
                    <span>{tCategory(deal.category)}</span>
                    <span>/</span>
                    <span className="text-zinc-300 font-medium truncate max-w-xs">{deal.merchant.name}</span>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                    {/* Left: Cinema Gallery & Details */}
                    <div className="md:col-span-7 space-y-8">
                        {/* Cinema Photo */}
                        <div className="relative aspect-16/10 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/[0.1] shadow-2xl">
                            <Image
                                src={images[activeImageIndex] || images[0]}
                                alt={deal.title}
                                fill
                                priority
                                className="object-cover"
                            />

                            {/* Badge */}
                            <div className="absolute top-4 left-4 flex gap-2 items-center">
                                <span className="apple-badge-discount px-3.5 py-1.5 rounded-full text-sm font-black text-emerald-300 backdrop-blur-md">
                                    -{deal.discountPercent}%
                                </span>
                                {deal.badge && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20">
                                        {tCategory(deal.badge)}
                                    </span>
                                )}
                            </div>

                            {/* Favorite Button Desktop */}
                            <button
                                onClick={handleToggleFavorite}
                                className={`hidden md:flex absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition cursor-pointer ${
                                    favorited
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
                                        : 'bg-black/40 text-white hover:bg-black/60 border border-white/10'
                                }`}
                            >
                                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                            </button>

                            {/* Bottom tag */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs border border-white/10">
                                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span>{t('bought_times')} {deal.boughtCount}</span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                                            activeImageIndex === i
                                                ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <Image src={img} alt={`Миниатюра ${i + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Features */}
                        <div className="apple-glass-card rounded-[28px] p-6 space-y-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-tight">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span>{t('deal_features')}</span>
                            </h2>
                            <ul className="space-y-3">
                                {deal.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Conditions */}
                        <div className="apple-glass-card rounded-[28px] p-6 space-y-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-tight">
                                <Ticket className="w-4 h-4 text-emerald-400" />
                                <span>{t('deal_conditions')}</span>
                            </h2>
                            <ul className="space-y-3">
                                {deal.conditions.map((cond, i) => (
                                    <li key={i} className="flex items-start gap-3 text-xs text-zinc-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                                        <span>{cond}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Description */}
                        <div className="apple-glass-card rounded-[28px] p-6 space-y-3">
                            <h2 className="text-base font-bold text-white tracking-tight">
                                {t('deal_description_title')}
                            </h2>
                            <p className="whitespace-pre-line text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                {deal.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: Apple/Tesla Buy Card */}
                    <div className="md:col-span-5 space-y-6 md:sticky md:top-24">
                        {/* Primary Action Box */}
                        <div className="apple-glass-card rounded-[32px] p-6 md:p-8 space-y-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-white/[0.05] border border-white/[0.08] text-zinc-300 rounded-full text-[11px] font-semibold mb-3">
                                    {tCategory(deal.category)}
                                </span>
                                <h1 className="text-2xl font-black text-white tracking-tight leading-snug">
                                    {deal.title}
                                </h1>
                            </div>

                            {/* Price Comparison Block */}
                            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                                <div className="flex items-baseline justify-between text-xs">
                                    <span className="text-zinc-500 line-through">
                                        {t('deal_original_price')}: {deal.originalPrice.toLocaleString()} {t('currency_som')}
                                    </span>
                                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        -{deal.discountPercent}%
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between pt-1">
                                    <div>
                                        <p className="text-[11px] text-zinc-500">{t('deal_discount_price')}</p>
                                        <p className="text-3xl font-black text-white tracking-tight">
                                            {deal.discountPrice.toLocaleString()} <span className="text-sm font-semibold text-zinc-400">{t('currency_som')}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-zinc-500">{t('coupon_price_prefix')}</p>
                                        <p className="text-xl font-black text-emerald-400">
                                            {deal.couponPrice} {t('currency_som')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-zinc-400 py-1">
                                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{t('hero_time_left')}: {t('hero_3_days')}</span>
                            </div>

                            {/* White Apple/Tesla CTA Button */}
                            <button
                                type="button"
                                onClick={handleBuyCoupon}
                                disabled={buying}
                                className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-black text-sm rounded-full flex items-center justify-center gap-2 shadow-[0_15px_35px_rgba(255,255,255,0.18)] transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50"
                            >
                                {buying ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>{t('deal_processing')}</span>
                                    </>
                                ) : (
                                    <>
                                        <Ticket className="w-4 h-4" />
                                        <span>{t('deal_coupon_action')} {deal.couponPrice} {t('currency_som')}</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{t('deal_refund_guarantee')}</span>
                            </div>
                        </div>

                        {/* Merchant Details Box */}
                        <div className="apple-glass-card rounded-[28px] p-6 space-y-4">
                            <h3 className="font-bold text-sm text-white">
                                {t('deal_merchant_info')}
                            </h3>

                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-zinc-200 text-sm">{deal.merchant.name}</h4>
                                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span>{deal.merchant.rating}</span>
                                    <span className="text-zinc-500">({deal.merchant.reviewsCount})</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs text-zinc-400">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                                    <span>{deal.merchant.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                    <span>{deal.merchant.workingHours}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                    <a href={`tel:${deal.merchant.phone}`} className="text-zinc-200 hover:text-white transition font-medium">
                                        {deal.merchant.phone}
                                    </a>
                                </div>
                                {deal.merchant.instagram && (
                                    <div className="flex items-center gap-2">
                                        <Instagram className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                        <span className="text-zinc-400">{deal.merchant.instagram}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Deals */}
                {similarDeals.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-white/[0.06]">
                        <h2 className="text-2xl font-black mb-8 text-white tracking-tight">
                            {t('deal_similar_prefix')} «{tCategory(deal.category)}»
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarDeals.map((d) => (
                                <DealCard key={d.id} deal={d} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Fixed Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-3 apple-glass md:hidden flex items-center justify-between gap-3 z-40 pb-safe">
                <div>
                    <span className="text-[10px] text-zinc-500 line-through">
                        {deal.originalPrice.toLocaleString()} {t('currency_som')}
                    </span>
                    <div className="text-lg font-black text-white leading-none">
                        {deal.discountPrice.toLocaleString()} <span className="text-xs font-semibold text-zinc-400">{t('currency_som')}</span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleBuyCoupon}
                    className="flex-1 py-3 px-5 bg-white text-black font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-white/10"
                >
                    <Ticket className="w-4 h-4" />
                    <span>{t('coupon_price_prefix')} {deal.couponPrice} {t('currency_som')}</span>
                </button>
            </div>

            {/* Apple Wallet Style Success Modal */}
            {purchasedVoucher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                    <div className="apple-glass-card rounded-[32px] max-w-md w-full p-6 md:p-8 border border-white/[0.15] shadow-2xl relative text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            {t('modal_success_badge')}
                        </span>

                        <h3 className="text-lg font-bold text-white mt-3 mb-2 tracking-tight">
                            {purchasedVoucher.dealTitle}
                        </h3>

                        <p className="text-xs text-zinc-400 mb-6">
                            {t('modal_hint')}
                        </p>

                        {/* Pass Ticket Box */}
                        <div className="bg-black/50 p-5 rounded-2xl border border-dashed border-white/20 mb-6">
                            <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-lg mx-auto mb-3 flex items-center justify-center">
                                <QrCode className="w-20 h-20 text-black" />
                            </div>
                            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                                {t('deal_promocode')}
                            </span>
                            <p className="text-2xl font-mono font-black text-white tracking-wider my-1">
                                {purchasedVoucher.code}
                            </p>
                            <span className="text-[11px] text-zinc-400">
                                {t('deal_discount_label')} {purchasedVoucher.discountPercent}% • {purchasedVoucher.merchantName}
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href="/vouchers"
                                className="flex-1 py-3 bg-white text-black font-bold rounded-full text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-white/10"
                            >
                                <Ticket className="w-4 h-4" />
                                <span>{t('modal_go_to_vouchers')}</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setPurchasedVoucher(null)}
                                className="px-5 py-3 border border-white/10 text-zinc-300 font-semibold rounded-full text-xs hover:bg-white/[0.05]"
                            >
                                {t('modal_close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

