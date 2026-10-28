'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    Search,
    MapPin,
    Ticket,
    Percent,
    User as UserIcon,
    LogOut,
    Check,
    ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getUserVouchers } from '@/lib/deals';

const CITIES = [
    { id: 'Бишкек', labelRu: 'Бишкек', labelKg: 'Бишкек' },
    { id: 'Ош', labelRu: 'Ош', labelKg: 'Ош' },
    { id: 'Иссык-Куль', labelRu: 'Иссык-Куль', labelKg: 'Ысык-Көл' },
    { id: 'Каракол', labelRu: 'Каракол', labelKg: 'Каракол' },
];

export default function Navbar() {
    const router = useRouter();
    const { user, logOut } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Бишкек');
    const [cityMenuOpen, setCityMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [voucherCount, setVoucherCount] = useState(0);

    useEffect(() => {
        setVoucherCount(getUserVouchers().length);
        const updateCount = () => setVoucherCount(getUserVouchers().length);
        window.addEventListener('vouchers-updated', updateCount);
        return () => window.removeEventListener('vouchers-updated', updateCount);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const currentCityDisplay = CITIES.find(c => c.id === selectedCity)?.[language === 'kg' ? 'labelKg' : 'labelRu'] || selectedCity;

    return (
        <header className="sticky top-0 z-50 w-full apple-glass transition-all duration-300">
            <div className="container flex h-14 md:h-16 items-center justify-between gap-4">
                {/* Brand & City */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                            <Percent className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="flex items-baseline tracking-tight">
                            <span className="text-lg md:text-xl font-bold text-white tracking-tight">Arzan</span>
                            <span className="text-xs font-semibold text-emerald-400 ml-0.5">.kg</span>
                        </div>
                    </Link>

                    {/* Minimal City Selector */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setCityMenuOpen(!cityMenuOpen)}
                            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white px-3 py-1 rounded-full border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer bg-white/[0.02]"
                        >
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span>{currentCityDisplay}</span>
                            <ChevronDown className="w-3 h-3 text-zinc-500" />
                        </button>

                        {cityMenuOpen && (
                            <div className="absolute left-0 mt-2 w-40 apple-glass rounded-2xl shadow-2xl py-1.5 z-50 border border-white/[0.1]">
                                {CITIES.map((city) => (
                                    <button
                                        key={city.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedCity(city.id);
                                            setCityMenuOpen(false);
                                        }}
                                        className="w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center justify-between text-zinc-300 hover:text-white hover:bg-white/[0.06] transition"
                                    >
                                        <span>{language === 'kg' ? city.labelKg : city.labelRu}</span>
                                        {selectedCity === city.id && <Check className="w-3 h-3 text-emerald-400" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Minimalist Pill Search (Apple/Tesla style) */}
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder={t('nav_search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-12 py-1.5 bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/[0.06] focus:border-white/20 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 px-1.5 py-0.5 rounded border border-white/[0.08] pointer-events-none">
                            ⌘K
                        </span>
                    </form>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2.5">
                    {/* Bilingual Language Switcher (Apple/Tesla style) */}
                    <div className="flex items-center bg-white/[0.04] p-0.5 rounded-full border border-white/[0.08] text-[11px] font-semibold tracking-tight">
                        <button
                            type="button"
                            onClick={() => setLanguage('kg')}
                            className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                                language === 'kg'
                                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                            title="Кыргыз тили"
                        >
                            KG
                        </button>
                        <button
                            type="button"
                            onClick={() => setLanguage('ru')}
                            className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                                language === 'ru'
                                    ? 'bg-white text-black font-bold shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                            title="Русский язык"
                        >
                            RU
                        </button>
                    </div>

                    {/* My Coupons Pill */}
                    <Link
                        href="/vouchers"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                    >
                        <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t('nav_coupons')}</span>
                        {voucherCount > 0 && (
                            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                {voucherCount}
                            </span>
                        )}
                    </Link>

                    {/* Partner portal */}
                    <Link
                        href="/upload"
                        className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        <span>{t('nav_partners')}</span>
                    </Link>

                    {/* User Profile / Apple Style White CTA */}
                    {user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-0.5 rounded-full border border-white/[0.1] hover:border-emerald-500/50 transition cursor-pointer"
                            >
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName || 'Пользователь'}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-zinc-800 text-zinc-200 font-bold rounded-full flex items-center justify-center text-xs">
                                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-52 apple-glass rounded-2xl shadow-2xl py-2 z-50 border border-white/[0.1]">
                                    <div className="px-4 py-2 border-b border-white/[0.06]">
                                        <p className="text-xs font-semibold text-white truncate">
                                            {user.displayName || 'Пользователь Arzan'}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/vouchers"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
                                    >
                                        <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>{t('nav_my_coupons')} ({voucherCount})</span>
                                    </Link>
                                    <Link
                                        href="/profile"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
                                    >
                                        <UserIcon className="w-3.5 h-3.5" />
                                        <span>{t('nav_personal_account')}</span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserMenuOpen(false);
                                            logOut();
                                        }}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                        <span>{t('nav_logout')}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
                        >
                            {t('nav_login')}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
