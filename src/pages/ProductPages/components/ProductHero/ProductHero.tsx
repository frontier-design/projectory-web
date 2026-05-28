import { useEffect, useRef } from 'react';
import styles from './ProductHero.module.css';
import CloudinaryImage from '../../../../components/CloudinaryImage/CloudinaryImage';

interface Product {
  id: string;
  heroVideo: string;
  category: string;
  categoryColor: string;
  categoryHighlight: string;
  tagline: string;
  tags?: string[]; 
  clientLogo?: string;
}

const ProductHero = ({ product }: { product: Product | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); 
    }
  }, [product]);

  if (!product) {
    return <div className={styles.errorMessage}>No product selected.</div>;
  }

  return (
    <section className={styles.heroWrapper}>

      <video ref={videoRef} autoPlay loop muted playsInline className={styles.heroVideo} key={product.id}>
        <source src={product.heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div>

      <div className={styles.productHeroContent}>

        <div className={styles.productHeroContentLeft}>
          <p className={styles.category} style={{ color: product.categoryColor }}>
            {product.category}<strong>{product.categoryHighlight}</strong>
          </p>
          <h1>{product.tagline}</h1>

          {product.tags && product.tags.length > 0 && (
            <div className={styles.tagContainer}>
              {product.tags.map((tag: string, index: number) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className={styles.productHeroContentRight}>
          <div className={styles.logoContainer}>
            {product.clientLogo && (
              <CloudinaryImage src={product.clientLogo} alt="Client Logo" className={styles.clientLogo} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;