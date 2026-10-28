'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, X, Loader2, Sparkles, CheckCircle2, Building2 } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { saveLocalStoredDeal, withBasePath } from '@/lib/deals';
import { Deal } from '@/types';

const categories = [
    'Рестораны и еда', 'Развлечения', 'Красота и SPA', 'Здоровье',
    'Туризм и отдых', 'Авто и услуги', 'Спорт', 'Другое'
];

const locations = ['Бишкек', 'Ош', 'Иссык-Куль', 'Каракол'];

export default function PartnerUploadPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { t, tCategory } = useLanguage();

    const [title, setTitle] = useState('');
    const [merchantName, setMerchantName] = useState('');
    const [merchantAddress, setMerchantAddress] = useState('');
    const [merchantPhone, setMerchantPhone] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [location, setLocation] = useState(locations[0]);
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const orig = parseFloat(originalPrice) || 0;
    const disc = parseFloat(discountPrice) || 0;
    const calculatedDiscount = orig > 0 && disc > 0 && disc < orig
        ? Math.round(((orig - disc) / orig) * 100)
        : 50;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setImages(prev => [...prev, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const finalImages = images.length > 0
                ? images
                : [withBasePath('/images/deal_navat.jpg')];

            const newDeal: Deal = {
                id: 'custom',
                title,
                shortDescription: description.slice(0, 100) + '...',
                description,
                category,
                location,
                images: finalImages,
                originalPrice: orig || 1000,
                discountPrice: disc || 500,
                discountPercent: calculatedDiscount,
                couponPrice: Math.round((disc || 500) * 0.05) || 50,
                currency: 'KGS',
                boughtCount: 1,
                expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
                badge: 'Новинка',
                createdAt: Date.now(),
                merchant: {
                    name: merchantName || 'Партнер Arzan.kg',
                    address: merchantAddress || 'Бишкек',
                    city: location,
                    phone: merchantPhone || '+996 555 000-000',
                    workingHours: 'Пн-Вс: 10:00 — 22:00',
                    rating: 5.0,
                    reviewsCount: 1
                },
                features: [
                    `Скидка ${calculatedDiscount}% по купону от Arzan.kg`,
                    'Высокое качество обслуживания',
                    'Удобное расположение'
                ],
                conditions: [
                    'Один купон действует на одно посещение',
                    'Обязательна предварительная запись по телефону'
                ]
            };

            saveLocalStoredDeal(newDeal);
            setSuccess(true);
            setTimeout(() => {
                router.push('/product/custom');
            }, 1200);
        } catch (err) {
            console.error('Error creating deal:', err);
            alert('Произошла ошибка при создании акции');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-2xl mx-auto py-12 px-4 pb-28 font-[family-name:var(--font-geist-sans)]">
            <div className="apple-glass-card rounded-[32px] p-6 md:p-10 shadow-2xl">
                <div className="mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/[0.08] text-emerald-400 mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('upload_badge')}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        {t('upload_title')}
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        {t('upload_subtitle')}
                    </p>
                </div>

                {success ? (
                    <div className="py-16 text-center space-y-4">
                        <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                        <h2 className="text-xl font-bold text-white">{t('upload_success_title')}</h2>
                        <p className="text-xs text-zinc-400">{t('upload_success_desc')}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Merchant Details */}
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-emerald-400" />
                                <span>{t('upload_merchant_section')}</span>
                            </h3>

                            <div>
                                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                    {t('upload_merchant_name')}
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Чайхана Нават, Ресторан Frunze, Студия массажа..."
                                    value={merchantName}
                                    onChange={(e) => setMerchantName(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white placeholder-zinc-500 outline-none focus:border-white/20"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                        {t('upload_merchant_address')}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="ул. Киевская, 114"
                                        value={merchantAddress}
                                        onChange={(e) => setMerchantAddress(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white placeholder-zinc-500 outline-none focus:border-white/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                        {t('upload_merchant_phone')}
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+996 (555) 000-000"
                                        value={merchantPhone}
                                        onChange={(e) => setMerchantPhone(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white placeholder-zinc-500 outline-none focus:border-white/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Title of Deal */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                {t('upload_deal_title')}
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Скидка 50% на все блюда восточной кухни и шашлыки"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white placeholder-zinc-500 outline-none focus:border-white/20"
                            />
                        </div>

                        {/* Category & City */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                    {t('upload_category')}
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-zinc-200 outline-none cursor-pointer"
                                >
                                    {categories.map(c => <option key={c} value={c} className="bg-zinc-900">{tCategory(c)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                    {t('upload_city')}
                                </label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-zinc-200 outline-none cursor-pointer"
                                >
                                    {locations.map(l => <option key={l} value={l} className="bg-zinc-900">{l}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Prices & Calculated Discount */}
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="grid grid-cols-3 gap-3 items-end">
                                <div>
                                    <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                                        {t('upload_orig_price')}
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="2000"
                                        value={originalPrice}
                                        onChange={(e) => setOriginalPrice(e.target.value)}
                                        className="w-full px-3 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-zinc-400 mb-1">
                                        {t('upload_disc_price')}
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="1000"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                        className="w-full px-3 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white outline-none"
                                    />
                                </div>
                                <div className="apple-badge-discount py-2 px-3 rounded-2xl text-center">
                                    <span className="block text-[9px] font-bold text-emerald-300 uppercase">{t('deal_discount_label')}</span>
                                    <span className="text-lg font-black text-white">-{calculatedDiscount}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Photos */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-2">
                                {t('upload_photos')}
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {images.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.1]">
                                        <Image src={src} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1.5 right-1.5 p-1 bg-black/70 rounded-full text-white"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}

                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-white/[0.1] hover:border-white/30 rounded-2xl cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition">
                                    <Camera className="w-5 h-5 text-zinc-500 mb-1" />
                                    <span className="text-[10px] font-semibold text-zinc-400">{t('upload_add_photo')}</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                                {t('upload_desc')}
                            </label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Опишите, что входит в меню или программу акции..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-xs text-white placeholder-zinc-500 outline-none focus:border-white/20 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-black text-xs rounded-full transition-all duration-300 shadow-xl shadow-white/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                                    <span>{t('upload_publishing')}</span>
                                </>
                            ) : (
                                <span>{t('upload_submit')}</span>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
