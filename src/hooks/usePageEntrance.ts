import { useState } from 'react';

const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

export const pageEntranceFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function claimEntrance(pageKey: string): boolean {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  const key = `entrance:${pageKey}`;
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
    return true;
  } catch {
    return true;
  }
}

export function usePageEntrance(pageKey: string) {
  const [play] = useState(() => (pageKey ? claimEntrance(pageKey) : false));

  const transition = (delay = 0) => ({
    duration: 0.7,
    ease: ENTRANCE_EASE,
    delay,
  });

  return {
    play,
    fade: pageEntranceFade,
    /** Use as `initial` — false skips replay when already seen this session */
    initial: play ? pageEntranceFade.initial : false,
    animate: pageEntranceFade.animate,
    transition,
  };
}
