import { products } from '@/data/products';
import type { Product } from '@/types/product';

const productsById = new Map(products.map((product) => [product.id, product]));

// Returns undefined for a missing or undefined id, matching the behaviour of
export function findProductById(id: string | undefined): Product | undefined {
  return id === undefined ? undefined : productsById.get(id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return products.filter((product) => ids.includes(product.id));
}
