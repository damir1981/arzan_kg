'use client';

import React, { useState, useEffect } from 'react';
import DealCard from "@/components/ui/DealCard";
import { Deal } from "@/types";
import { getAllDeals, getFavorites } from "@/lib/deals";
import Link from 'next/link';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FavoritesPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const all = await getAllDeals();
      setDeals(all);
      setFavoriteIds(getFavorites());
      setLoading(false);
    }
    load();

    const handleFavUpdate = () => {
      setFavoriteIds(getFavorites());
    };
    window.addEventListener('favorites-updated', handleFavUpdate);
    return () => window.removeEventListener('favorites-updated', handleFavUpdate);
  }, []);

  const favoriteDeals = deals.filter(d => favoriteIds.includes(d.id));

  return (
    <div className="container py-12 max-w-6xl mx-auto px-4 pb-28 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-red-400 mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t('fav_badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>{t('fav_title')}</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
              {favoriteDeals.length}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {t('fav_subtitle')}
          </p>
        </div>

        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-full text-xs font-bold transition shadow-sm"
        >
          <span>{t('cat_all')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-zinc-500">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mb-3" />
          <p className="text-xs">{t('loading_deals')}</p>
        </div>
      ) : favoriteDeals.length === 0 ? (
        <div className="py-20 px-4 text-center apple-glass-card rounded-[32px] max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {t('fav_empty_title')}
          </h2>
          <p className="text-xs text-zinc-500 mb-6">
            {t('fav_empty_desc')}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full text-xs hover:bg-zinc-200 transition shadow-lg shadow-white/10"
          >
            <span>{t('fav_explore_cta')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
}
