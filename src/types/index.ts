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
    requiresConfirmation?: boolean; // Требуется ли подтверждение наличия мест от бизнеса перед выдачей QR
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
    code: string; // e.g. KPN-8492-KG (generated once active)
    qrCodeUrl?: string;
    discountPercent: number;
    discountPrice: number;
    purchasedAt: number;
    expiresAt: number;
    status: 'pending' | 'active' | 'declined' | 'used' | 'expired';
    customerName?: string;
    customerPhone?: string;
    declineReason?: string;
    respondedAt?: number;
    userNotified?: boolean;
}

export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

// Backward compatibility alias
export type Product = Deal;
