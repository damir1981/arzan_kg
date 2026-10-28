export interface Merchant {
    name: string;
    logo?: string;
    address: string;
    city: string;
    phone: string;
    instagram?: string;
    workingHours: string;
    rating: number;
    reviewsCount: number;
}

export interface Deal {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    images: string[];
    originalPrice: number;
    discountPrice: number;
    discountPercent: number;
    currency: 'KGS';
    couponPrice: number; // Price of voucher itself (e.g. 50 KGS or included)
    boughtCount: number;
    expiresAt: number; // timestamp
    location: string;
    merchant: Merchant;
    features: string[]; // Особенности акции
    conditions: string[]; // Условия купона
    badge?: 'Хит' | 'Скидка дня' | '-70%' | '-50%' | 'Эксклюзив' | 'Новинка';
    createdAt: number;
}

export interface Voucher {
    id: string;
    dealId: string;
    dealTitle: string;
    merchantName: string;
    merchantAddress: string;
    merchantPhone: string;
    code: string; // e.g. ARZ-8492-KG
    qrCodeUrl?: string;
    discountPercent: number;
    discountPrice: number;
    purchasedAt: number;
    expiresAt: number;
    status: 'active' | 'used' | 'expired';
}

export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

// Backward compatibility alias
export type Product = Deal;
