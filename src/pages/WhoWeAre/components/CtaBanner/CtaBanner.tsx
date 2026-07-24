import { Link } from 'react-router-dom';
import { ctaBanner } from '../../whoWeAreData';
import tealBadge from '../../../../assets/images/shapes/pMonograms/projectory-p-teal.png';
import styles from './CtaBanner.module.css';

const CtaBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>{ctaBanner.title}</h2>
        <p className={styles.body}>{ctaBanner.body}</p>
        <div className={styles.actions}>
          <Link to={ctaBanner.primary.to} className={styles.buttonPrimary}>
            {ctaBanner.primary.label}
          </Link>
          <Link to={ctaBanner.secondary.to} className={styles.buttonSecondary}>
            {ctaBanner.secondary.label}
          </Link>
        </div>
      </div>
      <img
        src={tealBadge}
        alt=""
        className={styles.badgeTeal}
        aria-hidden
      />
    </section>
  );
};

export default CtaBanner;
