import { Link } from 'react-router-dom';
import { whitelabelCta } from '../../pricingData';
import styles from './WhitelabelCTA.module.css';

const WhitelabelCTA = () => {
  return (
    <section className={styles.whitelabelCta}>
      <div className={styles.textColumn}>
        <div className={styles.headingGroup}>
          <p className={styles.eyebrow}>{whitelabelCta.eyebrow}</p>
          <h2 className={styles.title}>{whitelabelCta.title}</h2>
        </div>
        <div className={styles.actionGroup}>
          <p className={styles.body}>{whitelabelCta.body}</p>
          <Link to={whitelabelCta.button.to} className={styles.button}>
            {whitelabelCta.button.label}
          </Link>
        </div>
      </div>
      <div className={styles.mediaColumn}>
        <img
          src={whitelabelCta.image}
          alt=""
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default WhitelabelCTA;
