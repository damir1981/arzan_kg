'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X, ArrowUpDown, Loader2, Sparkles } from 'lucide-react';
import DealCard from '@/components/ui/DealCard';
import { Deal } from '@/types';
import { getAllDeals } from '@/lib/deals';
import { useLanguage } from '@/context/LanguageContext';

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const { t } = useLanguage();

    const [query, setQuery] = useState(initialQuery);
    const [deals, setDeals] = useState<Deal[]>([]);
    const [sortBy, setSortBy] = useState<'discount' | 'newest' | 'price_asc' | 'price_desc'>('discount');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await getAllDeals();
            setDeals(data);
            setLoading(false);
        }
        load();
    }, []);

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        let list = deals.filter(d => {
            if (!q) return true;
            return (
                d.title.toLowerCase().includes(q) ||
                d.description.toLowerCase().includes(q) ||
                d.category.toLowerCase().includes(q) ||
                d.location.toLowerCase().includes(q) ||
                d.merchant.name.toLowerCase().includes(q)
            );
        });

        if (sortBy === 'discount') {
            list = [...list].sort((a, b) => b.discountPercent - a.discountPercent);
        } else if (sortBy === 'newest') {
            list = [...list].sort((a, b) => b.createdAt - a.createdAt);
        } else if (sortBy === 'price_asc') {
            list = [...list].sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sortBy === 'price_desc') {
            list = [...list].sort((a, b) => b.discountPrice - a.discountPrice);
        }

        return list;
    }, [deals, query, sortBy]);

    return (
        <div className="container py-12 max-w-6xl mx-auto px-4 pb-28 font-[family-name:var(--font-geist-sans)]">
            {/* Search Input Box (Apple Pill) */}
            <div className="relative mb-10 max-w-3xl mx-auto">
                <SearchIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search_input_placeholder')}
                    className="w-full pl-14 pr-12 py-4 bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/[0.08] focus:border-white/20 rounded-full text-base text-white placeholder-zinc-500 focus:outline-none transition-all shadow-2xl"
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white rounded-full"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Results Header & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        {query ? `${t('search_results_for')} «${query}»` : t('search_all_title')}
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        {t('search_found_count')} {filtered.length}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-white/[0.04] border border-white/[0.08] text-xs font-semibold rounded-full px-4 py-2 text-zinc-300 outline-none cursor-pointer hover:border-white/20 transition"
                    >
                        <option value="discount" className="bg-zinc-900 text-white">{t('search_sort_discount')}</option>
                        <option value="newest" className="bg-zinc-900 text-white">{t('search_sort_newest')}</option>
                        <option value="price_asc" className="bg-zinc-900 text-white">{t('search_sort_price_asc')}</option>
                        <option value="price_desc" className="bg-zinc-900 text-white">{t('search_sort_price_desc')}</option>
                    </select>
                </div>
            </div>

            {/* Results Grid */}
            {loading ? (
                <div className="py-24 flex flex-col items-center justify-center text-zinc-500">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mb-3" />
                    <p className="text-xs">{t('loading_deals')}</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="py-20 text-center apple-glass-card rounded-[32px] max-w-lg mx-auto p-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] text-zinc-400 flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-base font-bold text-white">
                        «{query}» — {t('search_empty_title')}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                        {t('search_empty_hint')}
                    </p>
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="mt-5 px-5 py-2 bg-white text-black rounded-full text-xs font-semibold hover:bg-zinc-200 transition"
                        >
                            {t('search_reset')}
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(deal => (
                        <DealCard key={deal.id} deal={deal} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="py-20 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
