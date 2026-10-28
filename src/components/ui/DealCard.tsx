'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Deal } from '@/types';
import { Heart, Star, MapPin, Flame } from 'lucide-react';
import { isDealFavorite, toggleFavorite, withBasePath } from '@/lib/deals';
import { useLanguage } from '@/context/LanguageContext';

interface DealCardProps {
    deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
    const [favorited, setFavorited] = useState(false);
    const { t, tCategory } = useLanguage();

    useEffect(() => {
        setFavorited(isDealFavorite(deal.id));

        const handleFavUpdate = () => {
            setFavorited(isDealFavorite(deal.id));
        };

        window.addEventListener('favorites-updated', handleFavUpdate);
        return () => window.removeEventListener('favorites-updated', handleFavUpdate);
    }, [deal.id]);

    const handleHeartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const nextState = toggleFavorite(deal.id);
        setFavorited(nextState);
    };

    const imageUrl = withBasePath(deal.images?.[0] || '/images/deal_navat.jpg');

    return (
        <Link href={`/product/${deal.id}`} className="block group">
            <div className="apple-glass-card rounded-[26px] overflow-hidden transition-all duration-500 ease-out flex flex-col h-full transform group-hover:-translate-y-1.5 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]">
                {/* Image & Overlay */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-900">
                    <Image
                        src={imageUrl}
                        alt={deal.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Apple Cinema Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Apple Style Frosted Discount Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                        <span className="apple-badge-discount px-3 py-1 rounded-full text-xs font-black text-emerald-300 tracking-tight backdrop-blur-md">
                            -{deal.discountPercent}%
                        </span>
                        {deal.badge && (
                            <span className="px-2.5 py-0.8 rounded-full text-[10px] font-bold bg-white/15 text-white backdrop-blur-md border border-white/20">
                                {tCategory(deal.badge)}
                            </span>
                        )}
                    </div>

                    {/* Minimal Favorite Button */}
                    <button
                        type="button"
                        onClick={handleHeartClick}
                        aria-label={t('nav_favorites')}
                        className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
                            favorited
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-105'
                                : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60 border border-white/10'
                        }`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
                    </button>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-zinc-300">
                        <div className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/[0.08]">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{t('bought_times')} {deal.boughtCount}</span>
                        </div>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/[0.08]">
                            {tCategory(deal.category)}
                        </span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                    <div>
                        {/* Merchant & Rating */}
                        <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-semibold text-zinc-400 truncate max-w-[70%] tracking-tight">
                                {deal.merchant.name}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{deal.merchant.rating}</span>
                                <span className="text-[10px] text-zinc-500">({deal.merchant.reviewsCount})</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm md:text-base font-bold text-zinc-100 group-hover:text-white line-clamp-2 leading-snug tracking-tight transition-colors">
                            {deal.title}
                        </h3>

                        {/* Location */}
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                            <MapPin className="w-3 h-3 text-zinc-600 shrink-0" />
                            <span className="truncate">{deal.merchant.address}</span>
                        </div>
                    </div>

                    {/* Price & Action Bar */}
                    <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-end justify-between">
                        <div>
                            <span className="text-xs text-zinc-500 line-through mr-1.5">
                                {deal.originalPrice.toLocaleString()} {t('currency_som')}
                            </span>
                            <div className="text-lg md:text-xl font-black text-white leading-none tracking-tight">
                                {deal.discountPrice.toLocaleString()} <span className="text-xs font-semibold text-zinc-400">{t('currency_som')}</span>
                            </div>
                        </div>

                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black border border-emerald-500/20 px-3 py-1.5 rounded-full transition-all duration-300">
                            {t('coupon_price_prefix')} {deal.couponPrice} {t('currency_som')}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
