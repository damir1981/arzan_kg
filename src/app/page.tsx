'use client';

import React, { useState, useEffect } from 'react';
import DealCard from "@/components/ui/DealCard";
import CategoryFilter from "@/components/ui/CategoryFilter";
import { Deal } from "@/types";
import { getAllDeals, withBasePath } from "@/lib/deals";
import { Sparkles, Clock, ArrowRight, Loader2, ShieldCheck, Flame, Star } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все акции');
  const [loading, setLoading] = useState(true);
  const { t, tCategory } = useLanguage();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAllDeals();
      setDeals(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredDeals = selectedCategory === 'Все акции'
    ? deals
    : deals.filter(d => d.category?.toLowerCase() === selectedCategory.toLowerCase());

  const featuredDeal = deals.find(d => d.badge === 'Хит' || d.badge === 'Скидка дня') || deals[0];

  return (
    <div className="space-y-10 pb-24 font-[family-name:var(--font-geist-sans)]">
      {/* Apple Keynote Style Hero */}
      <section className="relative overflow-hidden pt-14 md:pt-20 pb-12 apple-glow-ambient">
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            {/* Minimalist Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300 mb-5 backdrop-blur-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('hero_badge')}</span>
            </div>

            {/* Apple Keynote Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
              {t('hero_title_line1')} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
                {t('hero_title_line2')}
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              {t('hero_subtitle')}
            </p>
          </div>

          {/* Flagship Hero Showcase Card (Apple / Tesla Bento Flagship) */}
          {featuredDeal && (
            <div className="relative max-w-5xl mx-auto rounded-[32px] overflow-hidden border border-white/[0.1] bg-zinc-950/90 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] group">
              <div className="grid md:grid-cols-12 items-center">
                {/* Left: Cinematic Photo */}
                <div className="md:col-span-7 relative aspect-16/10 md:aspect-auto md:h-[420px] w-full overflow-hidden">
                  <Image
                    src={withBasePath(featuredDeal.images[0] || '/images/deal_navat.jpg')}
                    alt={featuredDeal.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="apple-badge-discount px-3 py-1 rounded-full text-xs font-black text-emerald-300 backdrop-blur-md">
                      -{featuredDeal.discountPercent}%
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-black backdrop-blur-md">
                      {t('badge_deal_of_day')}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{t('hero_already_bought')} {featuredDeal.boughtCount} {t('hero_people')}</span>
                  </div>
                </div>

                {/* Right: Info & Tesla-Style CTA */}
                <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                      <span>{featuredDeal.merchant.name}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{featuredDeal.merchant.rating}</span>
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
                      {featuredDeal.title}
                    </h2>

                    <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {featuredDeal.shortDescription}
                    </p>
                  </div>

                  {/* Price & Timer */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-zinc-500 line-through mr-2">
                          {featuredDeal.originalPrice.toLocaleString()} {t('currency_som')}
                        </span>
                        <div className="text-2xl font-black text-white tracking-tight">
                          {featuredDeal.discountPrice.toLocaleString()} <span className="text-sm font-semibold text-zinc-400">{t('currency_som')}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {t('hero_save')} {(featuredDeal.originalPrice - featuredDeal.discountPrice).toLocaleString()} {t('currency_som')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-2 border-t border-white/[0.06]">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('hero_time_left')}: {t('hero_3_days')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/product/${featuredDeal.id}`}
                      className="flex-1 py-3 px-5 rounded-full text-xs font-bold text-black bg-white hover:bg-zinc-200 transition-all duration-300 text-center shadow-lg shadow-white/10 active:scale-95"
                    >
                      {t('deal_coupon_action')} {featuredDeal.couponPrice} {t('currency_som')}
                    </Link>
                    <Link
                      href={`/product/${featuredDeal.id}`}
                      className="p-3 rounded-full border border-white/[0.1] hover:border-white/30 text-white transition-colors"
                      title={t('voucher_view_deal')}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Bar (Minimalist Apple Aesthetic) */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-3 gap-4 pt-8 border-t border-white/[0.06] text-center">
            <div>
              <p className="text-xl md:text-2xl font-black text-white tracking-tight">{t('trust_avg_discount_val')}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t('trust_avg_discount_label')}</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white tracking-tight">{t('trust_coupons_val')}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t('trust_coupons_label')}</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-emerald-400 tracking-tight">{t('trust_guarantee_val')}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t('trust_guarantee_label')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Frosted Category Filter */}
      <section className="sticky top-14 md:top-16 z-40 apple-glass border-y border-white/[0.06]">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Deals Bento Grid */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{selectedCategory === 'Все акции' ? t('hero_hot_deals') : tCategory(selectedCategory)}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                {filteredDeals.length}
              </span>
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-zinc-500">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mb-3" />
            <p className="text-xs font-medium">{t('loading_deals')}</p>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="py-20 text-center apple-glass-card rounded-[28px] max-w-lg mx-auto p-8">
            <p className="text-base font-bold text-white">
              {t('empty_category_prefix')} «{tCategory(selectedCategory)}» {t('empty_category_suffix')}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {t('empty_category_hint')}
            </p>
            <button
              onClick={() => setSelectedCategory('Все акции')}
              className="mt-5 px-5 py-2 bg-white text-black rounded-full text-xs font-semibold hover:bg-zinc-200 transition"
            >
              {t('cat_all')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
