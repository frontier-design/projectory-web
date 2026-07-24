import { motion } from 'framer-motion';
import { pricingHero } from '../../pricingData';
import styles from './PricingHero.module.css';

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const ease = [0.22, 1, 0.36, 1] as const;

const PricingHero = () => {
  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.price}
        initial={fade.initial}
        animate={fade.animate}
        transition={{ duration: 0.7, ease }}
      >
        {pricingHero.title}
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={fade.initial}
        animate={fade.animate}
        transition={{ duration: 0.7, ease, delay: 0.35 }}
      >
        {pricingHero.subtitle}
      </motion.p>
    </section>
  );
};

export default PricingHero;
