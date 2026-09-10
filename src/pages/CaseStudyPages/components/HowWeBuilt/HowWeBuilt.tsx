// HowWeBuilt.tsx
import { useState } from 'react';
import { findProductById } from '@/lib/findProduct';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './HowWeBuilt.module.css';

interface Installation {
  name: string;
  color: string;
  image: string;
  description: string;
  link: string;
}

interface HowWeBuiltProps {
  installations: Installation[];
}

function formatName(name: string): React.JSX.Element {
  // Remove all spaces, then highlight the last word
  const words = name.trim().split(' ');
  const noSpace = name.replace(/\s+/g, '');
  // If single word, just return it
  if (words.length <= 1) {
    return <>{noSpace}</>;
  }
  // Find the start index of the last word in the nospace string
  const lastWord = words[words.length - 1];
  const prefix = noSpace.slice(0, noSpace.length - lastWord.length);
  return (
    <>
      {prefix}
      <strong>{lastWord}</strong>
    </>
  );
}

const HowWeBuilt = ({ installations }: HowWeBuiltProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedInstallation = installations[selectedIndex];

  // Derive thumbnail from productsData based on the link URL
  const productId = selectedInstallation.link.split('/').pop() || '';
  const matchedProduct = findProductById(productId);
  const thumbnailSrc = matchedProduct?.thumbnail || selectedInstallation.image;
  // Determine the assigned color from productsData or fallback
  const assignedColor = matchedProduct?.categoryColor || selectedInstallation.color;

  // Pull the product's details heading from productsData
  const detailsSection = matchedProduct?.sections.find((sec) => sec.type === 'details');
  const detailsHeading = detailsSection?.content?.heading || selectedInstallation.description;

  return (
    <section className={styles.howWeBuiltWrapper}>
      <div className={styles.headingBlock}>
        <h2> Featured Products </h2>
        <p>
          {' '}
          A quick look at the interactions Projectory used to drive engagement at this event. Click
          to explore each in more detail.{' '}
        </p>
      </div>

      <div className={styles.buttonsRow}>
        {installations.map((inst, index) => {
          const isActive = index === selectedIndex;
          // Determine button color from productsData or fallback
          const btnId = inst.link.split('/').pop() || '';
          const btnProduct = findProductById(btnId);
          const btnColor = btnProduct?.categoryColor || inst.color;
          return (
            <button
              key={inst.name}
              className={`${styles.installationButton} ${isActive ? styles.activeButton : ''}`}
              style={{ '--inst-color': btnColor } as React.CSSProperties}
              onClick={() => setSelectedIndex(index)}
            >
              {formatName(inst.name)}
            </button>
          );
        })}
      </div>

      <div className={styles.installationContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedInstallation.name}
            className={styles.contentInner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={thumbnailSrc}
              alt={selectedInstallation.name}
              className={styles.installationImage}
            />
            <div className={styles.installationTextWrapper}>
              <h3 style={{ color: assignedColor }}>{formatName(selectedInstallation.name)}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: detailsHeading.replace(/\n/g, '<br />'),
                }}
              />
              <Link to={selectedInstallation.link} className={styles.linkButton}>
                Learn More
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowWeBuilt;
