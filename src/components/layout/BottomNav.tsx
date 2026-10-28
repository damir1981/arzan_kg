'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Percent, Search, Ticket, Heart, User } from 'lucide-react';
import clsx from 'clsx';
import { getUserVouchers } from '@/lib/deals';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [voucherCount, setVoucherCount] = useState(0);

    useEffect(() => {
        setVoucherCount(getUserVouchers().length);
        const update = () => setVoucherCount(getUserVouchers().length);
        window.addEventListener('vouchers-updated', update);
        return () => window.removeEventListener('vouchers-updated', update);
    }, []);

    const navItems = [
        { name: t('nav_deals'), href: '/', icon: Percent },
        { name: t('nav_search'), href: '/search', icon: Search },
        { name: t('nav_coupons'), href: '/vouchers', icon: Ticket, isPrimary: true, count: voucherCount },
        { name: t('nav_favorites'), href: '/favorites', icon: Heart },
        { name: t('nav_profile'), href: '/profile', icon: User },
    ];

    return (
        <nav aria-label="Мобильная навигация" className="fixed bottom-0 left-0 right-0 z-50 apple-glass border-t border-white/[0.08] md:hidden pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isPrimary) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center -mt-5 group relative"
                            >
                                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-all">
                                    <Icon className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                {item.count !== undefined && item.count > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[9px] font-black border border-black">
                                        {item.count}
                                    </span>
                                )}
                                <span className="text-[10px] font-medium mt-1 text-zinc-300">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all",
                                isActive
                                    ? "text-white font-semibold"
                                    : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <Icon className={clsx("w-4 h-4", isActive ? "text-emerald-400" : "")} />
                            <span className="text-[10px] tracking-tight">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
