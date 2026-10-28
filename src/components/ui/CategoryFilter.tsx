'use client';

import React from 'react';
import clsx from 'clsx';
import {
    LayoutGrid,
    Utensils,
    Sparkles,
    Ticket,
    HeartPulse,
    Palmtree,
    Car,
    Dumbbell,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const DEAL_CATEGORIES = [
    { name: 'Все акции', icon: LayoutGrid },
    { name: 'Рестораны и еда', icon: Utensils },
    { name: 'Развлечения', icon: Ticket },
    { name: 'Красота и SPA', icon: Sparkles },
    { name: 'Здоровье', icon: HeartPulse },
    { name: 'Туризм и отдых', icon: Palmtree },
    { name: 'Авто и услуги', icon: Car },
    { name: 'Спорт', icon: Dumbbell },
];

interface CategoryFilterProps {
    selectedCategory?: string;
    onSelectCategory?: (category: string) => void;
}

export default function CategoryFilter({
    selectedCategory = 'Все акции',
    onSelectCategory,
}: CategoryFilterProps) {
    const { tCategory } = useLanguage();

    return (
        <div className="w-full overflow-x-auto no-scrollbar py-3">
            <div className="container flex gap-2 min-w-max">
                {DEAL_CATEGORIES.map(({ name, icon: Icon }) => {
                    const isSelected = selectedCategory === name;
                    return (
                        <button
                            key={name}
                            type="button"
                            onClick={() => onSelectCategory?.(name)}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-tight transition-all duration-300 cursor-pointer",
                                isSelected
                                    ? "bg-white text-zinc-950 font-semibold shadow-lg shadow-white/10 scale-[1.02]"
                                    : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/15"
                            )}
                        >
                            <Icon className={clsx("w-3.5 h-3.5", isSelected ? "text-zinc-950" : "text-zinc-400")} />
                            <span>{tCategory(name)}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
