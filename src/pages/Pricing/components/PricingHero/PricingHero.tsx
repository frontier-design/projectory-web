import { motion } from 'framer-motion';
import { pricingHero } from '../../pricingData';
import { usePageEntrance } from '../../../../hooks/usePageEntrance';
import styles from './PricingHero.module.css';

type Entrance = ReturnType<typeof usePageEntrance>;

interface PricingHeroProps {
  entrance: Entrance;
}

const PricingHero = ({ entrance }: PricingHeroProps) => {
  const initial = entrance.play ? entrance.fade.initial : false;

  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.price}
        initial={initial}
        animate={entrance.fade.animate}
        transition={entrance.transition(0)}
      >
        {pricingHero.title}
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={initial}
        animate={entrance.fade.animate}
        transition={entrance.transition(0.35)}
      >
        {pricingHero.subtitle}
      </motion.p>
    </section>
  );
};

export default PricingHero;
