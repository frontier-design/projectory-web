import styles from './TealCTA.module.css';
import { Link } from 'react-router-dom';
import shape1 from '@/assets/images/shapes/abstract/Projectory_AbstractSymbol_2.svg';
import shape2 from '@/assets/images/shapes/abstract/Projectory_AbstractSymbol_6.svg';

interface TealCTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const TealCTASection: React.FC<TealCTASectionProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <section className={styles.ctaWrapper}>
      <div className={styles.ctaContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={buttonLink} className={styles.ctaButton}>
          {buttonText}
        </Link>
      </div>
      <div className={styles.ctaImages}>
        <img src={shape1} alt="Decorative Shape 1" className={styles.imageOne} />
        <img src={shape2} alt="Decorative Shape 2" className={styles.imageTwo} />
      </div>
    </section>
  );
};

export default TealCTASection;
