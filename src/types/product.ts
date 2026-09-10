import type { products } from '@/data/products';

// The canonical product shape, derived from the data rather than hand-written.
export type Product = (typeof products)[number];
