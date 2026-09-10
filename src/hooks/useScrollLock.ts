import { useEffect, useRef } from 'react';

// Ref-counted body scroll lock, shared by every overlay on the page.
//
//   nav opens     -> saves ''       -> sets 'hidden'
//   drawer opens  -> saves 'hidden' -> sets 'hidden'
//   nav closes    -> restores ''        (page scrolls behind an open drawer)
//   drawer closes -> restores 'hidden'  (page stuck, never scrolls again)

let lockCount = 0;
let savedOverflow: string | null = null;

let padOwners = 0;
let savedPaddingRight: string | null = null;

interface ScrollLockOptions {
  compensateScrollbar?: boolean;
}

function acquire(compensateScrollbar: boolean) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;

  if (compensateScrollbar) {
    if (padOwners === 0 && scrollbarWidth > 0) {
      savedPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    padOwners += 1;
  }
}

function release(compensateScrollbar: boolean) {
  if (lockCount === 0) {
    console.warn('useScrollLock: released more locks than were acquired');
    return;
  }

  lockCount -= 1;

  if (compensateScrollbar) {
    padOwners -= 1;
    if (padOwners === 0 && savedPaddingRight !== null) {
      document.body.style.paddingRight = savedPaddingRight;
      savedPaddingRight = null;
    }
  }

  if (lockCount === 0 && savedOverflow !== null) {
    document.body.style.overflow = savedOverflow;
    savedOverflow = null;
  }
}

/**
 * Locks body scroll while `active` is true.
 */
export function useScrollLock(active: boolean, options: ScrollLockOptions = {}) {
  const compensateScrollbar = options.compensateScrollbar ?? false;

  const holdsLock = useRef(false);

  useEffect(() => {
    if (!active) return;

    acquire(compensateScrollbar);
    holdsLock.current = true;

    return () => {
      if (!holdsLock.current) return;
      holdsLock.current = false;
      release(compensateScrollbar);
    };
  }, [active, compensateScrollbar]);
}
