import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { deliveryOptions } from '../../pricingData';
import amberBadge from '../../../../assets/images/shapes/pMonograms/projectory-p-amber.png';
import tealBadge from '../../../../assets/images/shapes/pMonograms/projectory-p-teal.png';
import styles from './DeliveryOptions.module.css';

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    className={styles.checkIcon}
    aria-hidden
  >
    <path
      d="M9.49805 19C14.7449 19 18.998 14.7468 18.998 9.5C18.998 4.25315 14.7449 0 9.49805 0C4.2512 0 -0.00195312 4.25315 -0.00195312 9.5C-0.00195312 14.7468 4.2512 19 9.49805 19Z"
      fill="white"
    />
    <path
      d="M5.19727 10.1143L7.65398 12.571L13.7958 6.4292"
      stroke="#1C1C1C"
      strokeWidth="1.66102"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeliveryOptions = () => {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: [0.08, 0.82, 0.17, 1], delay: 0.8 }}
    >
      {deliveryOptions.map((card, index) => (
        <div key={index} className={styles.column}>
          {index === 1 && (
            <img
              src={tealBadge}
              alt=""
              className={styles.badgeTeal}
              aria-hidden
            />
          )}
          <div className={styles.card} style={{ background: card.background }}>
            <div className={styles.content}>
              <div className={styles.body}>
                <div className={styles.header}>
                  <p className={styles.eyebrow}>{card.eyebrow}</p>
                  <h2 className={styles.title}>{card.title}</h2>
                  <p className={styles.subtitle}>{card.subtitle}</p>
                </div>
                <div className={styles.divider} />
                <ul className={styles.featureList}>
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.featureItem}>
                      <CheckIcon />
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {'cta' in card && card.cta ? (
                <div className={styles.footer}>
                  <div className={styles.ctaCopy}>
                    <div className={styles.ctaTitleRow}>
                      <span className={styles.ctaTitle}>{card.cta.title}</span>
                      {'currency' in card.cta && card.cta.currency ? (
                        <span className={styles.ctaCurrency}>
                          {card.cta.currency}
                        </span>
                      ) : null}
                    </div>
                    {'caption' in card.cta && card.cta.caption ? (
                      <p className={styles.ctaCaption}>{card.cta.caption}</p>
                    ) : null}
                  </div>
                  <Link to={card.cta.button.to} className={styles.button}>
                    {card.cta.button.label}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          {index === 0 && (
            <img
              src={amberBadge}
              alt=""
              className={styles.badgeAmber}
              aria-hidden
            />
          )}
        </div>
      ))}
    </motion.section>
  );
};

export default DeliveryOptions;
