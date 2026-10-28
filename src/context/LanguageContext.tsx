'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS, CATEGORY_MAP } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof Translations) => string;
    tCategory: (catName: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'ru',
    setLanguage: () => { },
    t: (key) => TRANSLATIONS.ru[key] || '',
    tCategory: (cat) => cat,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('ru');

    useEffect(() => {
        const saved = localStorage.getItem('arzan_lang') as Language;
        if (saved === 'ru' || saved === 'kg') {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('arzan_lang', lang);
    };

    const t = (key: keyof Translations): string => {
        return TRANSLATIONS[language]?.[key] || TRANSLATIONS.ru[key] || '';
    };

    const tCategory = (catName: string): string => {
        if (!catName) return '';
        const match = CATEGORY_MAP[catName];
        if (match) {
            return match[language] || match.ru;
        }
        // If passed Kyrgyz category and need reverse mapping
        for (const entry of Object.values(CATEGORY_MAP)) {
            if (entry.kg === catName || entry.ru === catName) {
                return entry[language];
            }
        }
        return catName;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, tCategory }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
