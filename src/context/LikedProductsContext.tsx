/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { findProductById } from '@/lib/findProduct';

interface LikedProductsContextValue {
  likedProducts: string[];
  toggleLike: (productId: string) => void;
}

const STORAGE_KEY = 'projectory:liked-products';

// Reads the persisted selection, tolerating every way storage can fail or lie:
// disabled/quota-exceeded localStorage, malformed JSON, a non-array payload,
// non-string entries, and ids for products that no longer exist in the data.
function readStoredLikes(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string' && !!findProductById(id));
  } catch {
    return [];
  }
}

const LikedProductsContext = createContext<LikedProductsContextValue | undefined>(undefined);

export const LikedProductsProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initialiser: storage is read once on mount, not on every render.
  const [likedProducts, setLikedProducts] = useState<string[]>(readStoredLikes);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedProducts));
    } catch {
      // Storage unavailable (private mode, quota). Selection still works for
      // this session; it just will not survive a reload.
    }
  }, [likedProducts]);

  const toggleLike = useCallback((productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  // Memoised so the provider value is not a fresh object on every render.
  // Without this, every consumer (Navbar, SlideInMenu, each ProductCard,
  // ProductPage, GetEstimatePage) re-renders whenever any parent renders
  const value = useMemo(() => ({ likedProducts, toggleLike }), [likedProducts, toggleLike]);

  return <LikedProductsContext.Provider value={value}>{children}</LikedProductsContext.Provider>;
};

export const useLikedProducts = (): LikedProductsContextValue => {
  const context = useContext(LikedProductsContext);
  if (!context) {
    throw new Error('useLikedProducts must be used within a LikedProductsProvider');
  }
  return context;
};
