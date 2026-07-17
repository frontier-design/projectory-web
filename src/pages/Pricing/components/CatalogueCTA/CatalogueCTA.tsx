import { Link } from 'react-router-dom';
import { catalogueCta } from '../../pricingData';
import amberBadge from '../../../../assets/images/shapes/pMonograms/projectory-p-amber.png';
import styles from './CatalogueCTA.module.css';

const CatalogueCTA = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Every product in our
          {'\n'}
          catalogue started as
          <br className={styles.breakDesktop} />{' '}
          a client brief.
        </h2>
        <p className={styles.body}>{catalogueCta.body}</p>
        <Link to={catalogueCta.button.to} className={styles.button}>
          {catalogueCta.button.label}
        </Link>
      </div>
      <img
        src={amberBadge}
        alt=""
        className={styles.badgeAmber}
        aria-hidden
      />
    </section>
  );
};

export default CatalogueCTA;
