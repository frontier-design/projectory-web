import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies, caseStudiesHeader } from '../../pricingData';
import styles from './CaseStudies.module.css';

const ACCENTS = ['#2BDCB7', '#F37655', '#C5DA20', '#B292C4', '#F3DA00'] as const;

const CaseStudies = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = caseStudies[selectedIndex];
  const accent = ACCENTS[selectedIndex % ACCENTS.length];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>{caseStudiesHeader.eyebrow}</p>
          <h2 className={styles.title}>{caseStudiesHeader.heading}</h2>
        </div>
      </div>

      <div className={styles.pills} role="tablist" aria-label="Case study categories">
        {caseStudies.map((study, index) => {
          const isActive = index === selectedIndex;
          const pillAccent = ACCENTS[index % ACCENTS.length];
          return (
            <button
              key={study.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              style={{ '--accent': pillAccent } as CSSProperties}
              onClick={() => setSelectedIndex(index)}
            >
              {study.name}
            </button>
          );
        })}
      </div>

      <div className={styles.panel}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name}
            className={styles.panelInner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={selected.image}
              alt=""
              className={styles.image}
            />
            <div className={styles.copy}>
              <h3 className={styles.heading} style={{ color: accent }}>
                {selected.heading}
              </h3>
              <p className={styles.description}>{selected.description}</p>
              <div className={styles.priceBlock}>
                <div className={styles.priceTags}>
                  {selected.tags.map((tag) => (
                    <span key={tag} className={styles.priceTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.priceValue}>
                  {selected.price}
                  <span className={styles.priceCurrency}>{selected.currency}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;
