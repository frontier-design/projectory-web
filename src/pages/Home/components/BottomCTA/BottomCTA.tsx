import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './BottomCTA.module.css';

interface BottomCTAProps {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

const BottomCTA: React.FC<BottomCTAProps> = ({ title, text, buttonText, buttonLink }) => {
  const ref = useRef<HTMLDivElement>(null);
  // track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // map scroll progress [0,1] → opacity [0,1]
  const opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  return (
    <motion.section ref={ref} className={styles.bottomCta} style={{ opacity }}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Link to={buttonLink} className={styles.button}>
          {buttonText}
        </Link>
      </div>
    </motion.section>
  );
};

export default BottomCTA;
