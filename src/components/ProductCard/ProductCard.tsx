// src/components/ProductCard/ProductCard.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useLikedProducts } from '../../context/LikedProductsContext';
import { optimizeCloudinaryUrl } from '../../utils/cloudinaryHelpers';
import CloudinaryImage from '../CloudinaryImage/CloudinaryImage';
import HeartIconSVG from '../../assets/images/heartIcon.svg';
import HeartIconSVG_Outline from '../../assets/images/heartIcon_outline.svg';

interface Product {
  id: string;
  name: string;
  category: string;
  categoryHighlight?: string | null;
  categoryColor?: string;
  thumbnail: string;
  bgVideo?: string;
  bgVideoPublicId?: string;
  shortDescription?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { likedProducts, toggleLike } = useLikedProducts();
  const isLiked = likedProducts.includes(product.id);

  const optimizedThumbnail = optimizeCloudinaryUrl(product.thumbnail, 'f_auto,q_auto,w_900');
  const optimizedBgVideo = product.bgVideo ? optimizeCloudinaryUrl(product.bgVideo, 'q_auto,w_900') : undefined;

  const [isHovered, setIsHovered] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDescHeight(entry.target.scrollHeight);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [product.shortDescription]);

  // Only load video when hovered (deferred loading)
  useEffect(() => {
    if (isHovered && !isMobile && product.bgVideo && !shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [isHovered, isMobile, product.bgVideo, shouldLoadVideo]);

  // Memoize video component to prevent recreation
  const videoComponent = useMemo(() => {
    if (!shouldLoadVideo || !optimizedBgVideo) return null;

    return (
      <video
        className={styles.bgVideo}
        src={optimizedBgVideo}
        poster={optimizedThumbnail}
        preload="none"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }, [shouldLoadVideo, optimizedBgVideo, optimizedThumbnail]);

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ zIndex: isHovered ? 2 : 1 }}
    >
      <div className={styles.bgLayer}>
        <CloudinaryImage
          className={styles.bgImage}
          src={optimizedThumbnail}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!isMobile && videoComponent && (
          <div
            className={styles.bgVideoWrapper}
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            {videoComponent}
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.productName}>
          <h3 className={styles.title} style={{ color: product.categoryColor || '#fff' }}>
            {product.category}
            {product.categoryHighlight && <strong>{product.categoryHighlight}</strong>}
          </h3>

          <div className={styles.descWrapper} style={{ height: isHovered ? descHeight : 0 }}>
            <p ref={descRef} className={styles.description}>
              {product.shortDescription}
            </p>
          </div>

          <Link
            to={`/products/${product.id}`}
            className={styles.learnMoreButton}
            onClick={e => e.stopPropagation()}
          >
            Learn More
          </Link>

          <button className={styles.likeButton} onClick={e => { e.stopPropagation(); toggleLike(product.id); }}>
            <img
              className={styles.heartIcon}
              src={isLiked ? HeartIconSVG : HeartIconSVG_Outline}
              alt="Like"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(ProductCard, (prevProps: { product: Product }, nextProps: { product: Product }) => {
  // Only re-render if product data actually changes
  return prevProps.product.id === nextProps.product.id &&
         prevProps.product.thumbnail === nextProps.product.thumbnail &&
         prevProps.product.bgVideo === nextProps.product.bgVideo;
});