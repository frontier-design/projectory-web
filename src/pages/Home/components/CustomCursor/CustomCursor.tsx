import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomCursor.module.css';

interface CustomCursorProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  text?: string;
}

const CustomCursor = ({ targetRef, isMobile, text = 'see the whole reel' }: CustomCursorProps) => {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const prevRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const wasActiveRef = useRef(false);

  const navRectRef = useRef<DOMRect | null>(null);
  const elRectRef = useRef<DOMRect | null>(null);
  const rectStaleRef = useRef(true);

  useEffect(() => {
    const markStale = () => {
      rectStaleRef.current = true;
    };
    window.addEventListener('scroll', markStale, { passive: true });
    window.addEventListener('resize', markStale, { passive: true });
    return () => {
      window.removeEventListener('scroll', markStale);
      window.removeEventListener('resize', markStale);
    };
  }, []);

  const refreshRects = (el: HTMLElement) => {
    if (!rectStaleRef.current) return;
    const nav = document.querySelector('nav');
    navRectRef.current = nav ? nav.getBoundingClientRect() : null;
    elRectRef.current = el.getBoundingClientRect();
    rectStaleRef.current = false;
  };

  const isOverNavbar = (x: number, y: number) => {
    const r = navRectRef.current;
    if (!r) return false;
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const isPointInEl = (x: number, y: number) => {
    const r = elRectRef.current;
    if (!r) return false;
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  useEffect(() => {
    const el = targetRef.current;
    if (isMobile || !el) return;

    const updateCursorStyle = (shouldHide: boolean) => {
      // only mutate when needed to avoid churn
      const next = shouldHide ? 'none' : 'auto';
      if (el.style.cursor !== next) el.style.cursor = next;
    };

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      refreshRects(el);
      const overNav = isOverNavbar(x, y);
      const overTarget = isPointInEl(x, y);
      const shouldShow = overTarget && !overNav;

      // position updates can happen every move
      setPos({ x, y });

      // Animate in/out based on state changes
      const wasActive = wasActiveRef.current;
      if (shouldShow && !wasActive) {
        // Just became active - trigger animation
        setIsVisible(true);
        setActive(true);
        wasActiveRef.current = true;
      } else if (!shouldShow && wasActive) {
        // Just became inactive - fade out
        setIsVisible(false);
        // Delay setting active to false to allow fade-out animation
        setTimeout(() => {
          setActive(false);
          wasActiveRef.current = false;
        }, 200);
      } else if (shouldShow) {
        setActive(true);
        wasActiveRef.current = true;
      }

      updateCursorStyle(shouldShow);

      // smooth rotation via rAF to reduce jitter/state spam
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!shouldShow) {
          prevRef.current = null;
          setRotation(0);
          return;
        }

        const prev = prevRef.current;
        if (prev) {
          const dx = x - prev.x;
          const dy = y - prev.y;

          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            const speed = Math.sqrt(dx * dx + dy * dy);
            const maxRotation = 15;
            const speedFactor = Math.min(speed / 10, 1);
            const subtle = rawAngle * 0.3 * speedFactor;
            const clamped = Math.max(-maxRotation, Math.min(maxRotation, subtle));
            setRotation(clamped);
          }
        }
        prevRef.current = { x, y };
      });
    };

    const onPointerEnter = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      refreshRects(el);
      const overNav = isOverNavbar(x, y);
      const overTarget = isPointInEl(x, y);
      const shouldShow = overTarget && !overNav;

      if (shouldShow) {
        // Always update position when entering
        setPos({ x, y });

        if (!wasActiveRef.current) {
          // Just became active - trigger animation
          setIsVisible(true);
          setActive(true);
          wasActiveRef.current = true;
          updateCursorStyle(true);
          prevRef.current = { x, y };
        } else {
          // Already active, just ensure it's visible
          setIsVisible(true);
        }
      }
    };

    const onPointerLeave = () => {
      setIsVisible(false);
      wasActiveRef.current = false;
      setTimeout(() => {
        setActive(false);
        setRotation(0);
        prevRef.current = null;
        updateCursorStyle(false);
      }, 200);
    };

    const onPointerLeaveWindow = () => {
      setIsVisible(false);
      wasActiveRef.current = false;
      setTimeout(() => {
        setActive(false);
        setRotation(0);
        prevRef.current = null;
        updateCursorStyle(false);
      }, 200);
    };

    // Listen for enter/leave on the target element - these fire immediately on hover
    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointerleave', onPointerLeave);

    // Also listen globally for movement
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeaveWindow);
    document.addEventListener('mouseleave', onPointerLeaveWindow);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeaveWindow);
      document.removeEventListener('mouseleave', onPointerLeaveWindow);
      // always restore cursor
      if (el) el.style.cursor = 'auto';
    };
  }, [isMobile, targetRef]);

  if (isMobile || !active || typeof document === 'undefined') return null;

  const scale = isVisible ? 1 : 0.8;
  const opacity = isVisible ? 1 : 0;

  return ReactDOM.createPortal(
    <div
      className={styles.customCursor}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: 'center center',
        opacity: opacity,
        transition: isVisible
          ? 'opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'opacity 0.15s ease-out, transform 0.15s ease-out',
      }}
    >
      {text}
    </div>,
    document.body
  );
};

export default CustomCursor;
