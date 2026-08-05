import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './LandingHero.module.css';

import shapeTopSrc from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';
import shapeLeftSrc from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_2.png';
import shapeRightSrc from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_3.png';
import shapeBottomSrc from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_1.png';

const defaultShapes = {
  top: shapeTopSrc,
  left: shapeLeftSrc,
  right: shapeRightSrc,
  bottom: shapeBottomSrc,
};

interface LandingHeroProps {
  pill: string;
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  wideDescription?: boolean;
  className?: string;
  shapes?: typeof defaultShapes;
  rightRotateRange?: [number, number];
  flipRight?: boolean;
}

const LandingHero = ({
  pill,
  title,
  description,
  buttonLabel,
  onButtonClick,
  wideDescription = false,
  className,
  shapes = defaultShapes,
  rightRotateRange = [-15, -55],
  flipRight = false,
}: LandingHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const topX = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const topY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const topRotate = useTransform(scrollYProgress, [0, 1], [-30, -55]);

  const leftX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [15.524, 55]);

  const rightX = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], rightRotateRange);

  const bottomX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const bottomRotate = useTransform(scrollYProgress, [0, 1], [-15, -50]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.1]);

  return (
    <section ref={sectionRef} className={`${styles.hero}${className ? ` ${className}` : ''}`}>
      <div className={styles.shapesContainer}>
        <motion.img
          src={shapes.top}
          alt=""
          className={`${styles.shape} ${styles.shapeTop}`}
          style={{
            x: topX,
            y: topY,
            rotate: topRotate,
            scaleX: 1,
            scaleY: -1,
            opacity: isMobile ? fadeOpacity : undefined,
          }}
          aria-hidden
        />
        <motion.img
          src={shapes.left}
          alt=""
          className={`${styles.shape} ${styles.shapeLeft}`}
          style={{ x: leftX, y: leftY, rotate: leftRotate }}
          aria-hidden
        />
        <motion.img
          src={shapes.right}
          alt=""
          className={`${styles.shape} ${styles.shapeRight}`}
          style={{
            x: rightX,
            y: rightY,
            rotate: rightRotate,
            scaleY: flipRight ? -1 : undefined,
          }}
          aria-hidden
        />
        <motion.img
          src={shapes.bottom}
          alt=""
          className={`${styles.shape} ${styles.shapeBottom}`}
          style={{ x: bottomX, y: bottomY, rotate: bottomRotate, opacity: fadeOpacity }}
          aria-hidden
        />
      </div>

      <div className={styles.content}>
        <span className={styles.pill}>
          <span className={styles.pillLabel}>{pill}</span>
        </span>
        <div className={styles.copy}>
          <h1 className={styles.title}>{title}</h1>
          <p
            className={`${styles.description}${wideDescription ? ` ${styles.descriptionWide}` : ''}`}
          >
            {description}
          </p>
        </div>
        <button type="button" className={styles.cta} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </div>
    </section>
  );
};

export default LandingHero;
