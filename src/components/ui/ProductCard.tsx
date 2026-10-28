import DealCard from './DealCard';
import { Deal } from '@/types';

export default function ProductCard({ product }: { product: Deal }) {
    return <DealCard deal={product} />;
}
