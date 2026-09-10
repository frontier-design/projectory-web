import styles from './GridCTA.module.css';
import { Link } from 'react-router-dom';

const GridCTA = () => {
  return (
    <div className={styles.gridCTA}>
      <h2>Looking to meet a specific objective?</h2>
      <p>
        We’ll work with you to create a custom product that aligns with your event’s needs. Get in
        touch to learn more.
      </p>
      <Link to="/get-started#contact-form" className={styles.ctaButton}>
        Contact Us
      </Link>
    </div>
  );
};

export default GridCTA;
