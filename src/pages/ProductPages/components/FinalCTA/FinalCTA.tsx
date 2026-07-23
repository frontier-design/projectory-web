import styles from './FinalCTA.module.css';
import { Link } from 'react-router-dom';

interface FinalCTAProps {
  experienceText: string;
  experienceLink: string;
}

const FinalCTA = ({ experienceText, experienceLink }: FinalCTAProps) => {
  return (
    <section className={styles.ctaWrapper}>
      {/* Left Block - Dynamic Content */}
      <div className={styles.ctaBoxDark}>
        <h3> Explore More {experienceText}</h3>
        <p>See more experiences that enhance your existing event objectives</p>
        <Link to={experienceLink} className={styles.backLink}> See More </Link>
      </div>

      {/* Right Block - Static Content */}
      <div className={styles.ctaBoxLight}>
        <h3>Get Started </h3>
        <p>Break free from boring by integrating this Projectory product at your next event</p>
        <Link to="/pricing" className={styles.ctaButtonBottom}>Let’s Go!</Link>
      </div>
    </section>
  );
};

export default FinalCTA;