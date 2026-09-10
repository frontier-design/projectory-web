// 📂 src/components/FeaturedCarousel/FeaturedCarousel.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedCarousel.module.css';
import { products } from '@/data/products';
import type { Product } from '@/types/product';

const CAROUSEL_INTERVAL = 5000; // 5 seconds per product

const FeaturedCarousel: React.FC = () => {
  const featuredProducts: Product[] = products;

  // Current product index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Fade animation state
  const [fadeState, setFadeState] = useState<'fadeIn' | 'fadeOut'>('fadeIn');
  // Progress for the vertical bar (0 to 100)
  const [progress, setProgress] = useState(0);

  // Ref for the timer bar fill element
  const timerBarRef = useRef<HTMLDivElement>(null);

  // Interval ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  }, [featuredProducts.length]);

  const startCycle = useCallback(() => {
    // Reset progress and fade in
    setProgress(0);
    setFadeState('fadeIn');

    let timeElapsed = 0;
    const step = 50; // ms step

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      timeElapsed += step;
      const newProgress = Math.min((timeElapsed / CAROUSEL_INTERVAL) * 100, 100);
      setProgress(newProgress);

      // When time's up → fade out and reset progress instantly
      if (timeElapsed >= CAROUSEL_INTERVAL) {
        clearInterval(intervalRef.current!);
        setFadeState('fadeOut');

        // Reset the progress bar instantly without animation:
        if (timerBarRef.current) {
          // Temporarily disable transition
          timerBarRef.current.style.transition = 'none';
          setProgress(0);
          // Force reflow to apply the change
          void timerBarRef.current.offsetHeight;
          // Re-enable transition for future updates
          timerBarRef.current.style.transition = 'height 0.1s linear';
        }

        // After fade-out, move to next product
        setTimeout(() => {
          goToNext();
        }, 400); // fade-out duration in ms
      }
    }, step);
  }, [goToNext]);

  useEffect(() => {
    startCycle();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, startCycle]);

  const currentProduct = featuredProducts[currentIndex];

  return (
    <div className={styles.carouselWrapper}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <h4
          className={`${styles.featuredText} ${
            fadeState === 'fadeIn' ? styles.fadeIn : styles.fadeOut
          }`}
        >
          Featured Product
        </h4>

        <div
          className={`${styles.productInfo} ${
            fadeState === 'fadeIn' ? styles.fadeIn : styles.fadeOut
          }`}
        >
          <h2 className={styles.title}>
            {currentProduct.shortDescription || 'No short description available.'}
          </h2>
          <p className={styles.categoryLine} style={{ color: currentProduct.categoryColor }}>
            {currentProduct.category}
            <strong>{currentProduct.categoryHighlight}</strong>
          </p>
          <Link to={`/products/${currentProduct.id}`} className={styles.learnMoreButton}>
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Column (Image) */}
      <div className={styles.rightColumn}>
        <div
          className={`${styles.timerBarWrapper} ${
            fadeState === 'fadeIn' ? styles.fadeIn : styles.fadeOut
          }`}
        >
          <div
            className={styles.timerBarFill}
            ref={timerBarRef}
            style={{
              height: `${progress}%`,
            }}
          />
        </div>

        <div
          className={`${styles.imageWrapper} ${
            fadeState === 'fadeIn' ? styles.fadeIn : styles.fadeOut
          }`}
        >
          <img
            src={currentProduct.thumbnail}
            alt={currentProduct.name}
            className={styles.productImage}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
