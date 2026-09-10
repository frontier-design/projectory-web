import { catalogueCta } from '../../pricingData';
import Button from '@/components/Button/Button';
import styles from './CatalogueCTA.module.css';

const amberBadge =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786649240/projectory-p-amber_q8opqw.png';

const CatalogueCTA = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>{catalogueCta.title}</h2>
        <p className={styles.body}>{catalogueCta.body}</p>
        <Button variant="plum" to={catalogueCta.button.to}>
          {catalogueCta.button.label}
        </Button>
      </div>
      <img src={amberBadge} alt="" className={styles.badgeAmber} aria-hidden />
    </section>
  );
};

export default CatalogueCTA;
