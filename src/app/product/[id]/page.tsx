import React from 'react';
import { INITIAL_DEALS } from '@/lib/deals';
import DealDetailClient from './DealDetailClient';

export function generateStaticParams() {
    return [
        ...INITIAL_DEALS.map((deal) => ({ id: deal.id })),
        { id: 'custom' },
    ];
}

export default function DealDetailPage() {
    return <DealDetailClient />;
}
