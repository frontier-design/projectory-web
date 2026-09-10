import { whitelabelCta } from '../../pricingData';
import Button from '@/components/Button/Button';
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
          <Button variant="coral" to={whitelabelCta.button.to}>
            {whitelabelCta.button.label}
          </Button>
        </div>
      </div>
      <div className={styles.mediaColumn}>
        <img src={whitelabelCta.image} alt="" className={styles.image} />
      </div>
    </section>
  );
};

export default WhitelabelCTA;
