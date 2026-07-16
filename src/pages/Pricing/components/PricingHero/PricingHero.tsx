import { Link } from 'react-router-dom';
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
        {pricingHero.price}
        <span className={styles.currency}>{pricingHero.currency}</span>
      </motion.h1>
      <motion.div
        className={styles.rest}
        initial={fade.initial}
        animate={fade.animate}
        transition={{ duration: 0.7, ease, delay: 0.35 }}
      >
        <p className={styles.subtitle}>{pricingHero.subtitle}</p>
        <div className={styles.actions}>
          <Link to={pricingHero.primaryButton.to} className={styles.primaryBtn}>
            {pricingHero.primaryButton.label}
          </Link>
          <Link to={pricingHero.secondaryButton.to} className={styles.secondaryBtn}>
            {pricingHero.secondaryButton.label}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingHero;
