// 📂 src/components/FeaturedCaseStudy/FeaturedCaseStudy.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FeaturedCaseStudy.module.css';

const CASE_STUDIES = [
  {
    id: 'cibc-leadership',
    title: 'Facilitating strategic conversations for the most senior leaders of the bank',
    subtitle: 'CIBC Global Leadership Summit',
    imageUrl:
      'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749518972/FM8A5043-Enhanced-NR_qywkjc_vydjdi.webp',
    link: '/case-study/cibc-global-leadership-summit',
  },
  {
    id: 'london-drugs-keynote',
    title: 'Highlighting the value of audience engagement for event industry professionals',
    subtitle: 'PCMA 2024 CEMA Summit',
    imageUrl:
      'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749519212/Screenshot_2025-05-20_at_19.18.46_gfnyht_ssydvf.webp',
    link: '/case-study/pcma-2024-cema-summit',
  },
];

const FeaturedCaseStudy = () => {
  // Active index: 0 means first card is active; 1 means second card is active.
  const [activeIndex, setActiveIndex] = useState(0);

  // Track window width so that we can disable sliding on mobile.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define sliding animation variants only for desktop.
  const containerVariants = isMobile
    ? undefined // On mobile, no sliding.
    : {
        animate: {
          x: activeIndex === 0 ? '0%' : '-22.6%',
          transition: { duration: 0.5, ease: 'easeInOut' },
        },
      };

  // Define opacity for desktop only.
  const activeOpacity = 1;
  const inactiveOpacity = 0.5;

  if (isMobile) {
    // On mobile, render the cards as a stacked list (each full width).
    return (
      <div className={styles.featuredSectionWrapper}>
        <section className={styles.featuredSection}>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <h2>Featured Case Study</h2>
            </div>
            <div className={styles.headerRight}>
              <p>
                Explore how our projects redefine interactive experiences and create lasting
                impacts.
              </p>
              <Link to="/case-studies" className={styles.exploreButton}>
                Explore All Case Studies →
              </Link>
            </div>
          </div>
          <div className={styles.stackedCards}>
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className={styles.card}>
                <div
                  className={styles.cardBackground}
                  style={{ backgroundImage: `url(${study.imageUrl})` }}
                />
                <div className={styles.cardOverlay}>
                  <div className={styles.cardOverlayText}>
                    <h3>{study.title}</h3>
                    <p>{study.subtitle}</p>
                    <Link to={study.link} className={styles.caseStudyButton}>
                      View Full Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // For desktop, render with sliding interaction.
  return (
    <div className={styles.featuredSectionWrapper}>
      <section className={styles.featuredSection}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h2>Featured Case Study</h2>
          </div>
          <div className={styles.headerRight}>
            <p>
              Explore how our projects redefine interactive experiences and create lasting impacts.
            </p>
            <Link to="/case-studies" className={styles.exploreButton}>
              Explore All Case Studies →
            </Link>
          </div>
        </div>

        {/* Sliding Container */}
        <motion.div
          className={styles.slidingContainer}
          variants={containerVariants}
          animate="animate"
          initial={{ x: '0%' }}
        >
          {/* First Card */}
          <div
            className={`${styles.card} ${activeIndex === 0 ? styles.activeCard : styles.inactiveCard}`}
            style={{
              opacity: activeIndex === 0 ? activeOpacity : inactiveOpacity,
            }}
            onClick={() => {
              if (activeIndex !== 0) setActiveIndex(0);
            }}
          >
            <div
              className={styles.cardBackground}
              style={{ backgroundImage: `url(${CASE_STUDIES[0].imageUrl})` }}
            />
            <div className={styles.cardOverlay}>
              <div className={styles.cardOverlayText}>
                <h3>{CASE_STUDIES[0].title}</h3>
                <p>{CASE_STUDIES[0].subtitle}</p>
                {activeIndex === 0 && (
                  <Link to={CASE_STUDIES[0].link} className={styles.caseStudyButton}>
                    View Full Case Study →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div
            className={`${styles.card} ${activeIndex === 1 ? styles.activeCard : styles.inactiveCard}`}
            style={{
              opacity: activeIndex === 1 ? activeOpacity : inactiveOpacity,
            }}
            onClick={() => {
              if (activeIndex !== 1) setActiveIndex(1);
            }}
          >
            <div
              className={styles.cardBackground}
              style={{ backgroundImage: `url(${CASE_STUDIES[1].imageUrl})` }}
            />
            <div className={styles.cardOverlay}>
              <div className={styles.cardOverlayText}>
                <h3>{CASE_STUDIES[1].title}</h3>
                <p>{CASE_STUDIES[1].subtitle}</p>
                {activeIndex === 1 && (
                  <Link to={CASE_STUDIES[1].link} className={styles.caseStudyButton}>
                    View Full Case Study →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FeaturedCaseStudy;
