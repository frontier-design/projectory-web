import { useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { caseStudies } from '../../pricingData';
import styles from './CaseStudies.module.css';

const total = caseStudies.length;

// Number of scroll "steps" between cases (front card recedes once per step).
const steps = Math.max(total - 1, 1);

// Visual depth per stack slot: 0 = front, higher = further back (peeking above).
const DECK = [
  { y: 0, scale: 1, dim: 0, shade: 0 }, // front - image
  { y: -28, scale: 0.94, dim: 1, shade: 0.5 }, // mid - lighter grey, narrower
  { y: -52, scale: 0.88, dim: 1, shade: 1 }, // back - darker grey, narrowest
];

// Apex of the eject arc — keep front width while lifting (no enlarge).
const EJECT_Y = -100;

// Mid → back greys (front shade is unused under the image).
const GREYS = ['#2a2a2a', '#3a3a3a', '#1a1a1a'];

const slotAt = (i: number, k: number) => (((i - k) % total) + total) % total;
const zFor = (slot: number) => total - slot; // slot 0 = highest

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const metaFadeVariants = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const fadeTransition = { duration: 0.3, ease: 'easeInOut' };
const metaFadeTransition = { duration: 0.45, ease: 'easeOut' };

const ACCENTS = ['#2BDCB7', '#F37655', '#C5DA20'] as const;

const pad = (n: number) => String(n).padStart(2, '0');

type CaseStudy = (typeof caseStudies)[number];

// Front = image. Rear = greys (lighter mid, darker back).
const MediaCard = ({
  study,
  imageOpacity,
  grey,
}: {
  study: CaseStudy;
  imageOpacity: MotionValue<number>;
  grey: MotionValue<string>;
}) => (
  <div className={styles.cardInner}>
    <motion.div
      className={styles.cardGrey}
      style={{ backgroundColor: grey }}
      aria-hidden
    />
    {study.image ? (
      <motion.img
        src={study.image}
        alt=""
        className={styles.cardImage}
        style={{ opacity: imageOpacity }}
      />
    ) : null}
  </div>
);

const StackCard = ({
  study,
  index,
  progress,
}: {
  study: CaseStudy;
  index: number;
  progress: MotionValue<number>;
}) => {
  const tin: number[] = [];
  const yk: number[] = [];
  const sk: number[] = [];
  const sh: number[] = [];
  const ok: number[] = [];
  const ik: number[] = [];
  const zin: number[] = [];
  const zk: number[] = [];

  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    const slot = slotAt(index, k);
    tin.push(t);
    yk.push(DECK[slot].y);
    sk.push(DECK[slot].scale);
    sh.push(DECK[slot].shade);
    ok.push(1);
    // Image only on front; rear slots stay grey.
    ik.push(slot === 0 ? 1 : 0);
    zin.push(t);
    zk.push(zFor(slot));

    if (k < steps && slot === 0 && slotAt(index, k + 1) === total - 1) {
      const tMid = (k + 0.5) / steps;
      // Lift + fade image out with translateY (same scrub as enter fade-in).
      tin.push(tMid);
      yk.push(EJECT_Y);
      sk.push(DECK[0].scale);
      sh.push(0);
      ok.push(0);
      ik.push(0);
      zin.push(tMid);
      zk.push(zFor(0));
      // Behind at apex — stay faded; card opacity returns as it settles.
      tin.push(tMid + 1e-4);
      yk.push(EJECT_Y);
      sk.push(DECK[total - 1].scale);
      sh.push(DECK[total - 1].shade);
      ok.push(0);
      ik.push(0);
      zin.push(tMid + 1e-4);
      zk.push(zFor(total - 1));
    }
  }

  const y = useTransform(progress, tin, yk);
  const scale = useTransform(progress, tin, sk);
  const opacity = useTransform(progress, tin, ok);
  const zIndex = useTransform(progress, zin, zk);
  const shade = useTransform(progress, tin, sh);
  const imageOpacity = useTransform(progress, tin, ik);
  const grey = useTransform(shade, [0, 0.5, 1], GREYS);

  return (
    <motion.div className={styles.card} style={{ y, scale, opacity, zIndex }}>
      <MediaCard study={study} imageOpacity={imageOpacity} grey={grey} />
    </motion.div>
  );
};

// Mobile: all images mounted; y scrubbed by scroll so the next card
// slides up into the frame in real time (no remount / AnimatePresence).
const MobileSlide = ({
  study,
  index,
  progress,
}: {
  study: CaseStudy;
  index: number;
  progress: MotionValue<number>;
}) => {
  const y = useTransform(
    progress,
    [0, 1],
    [`${index * 100}%`, `${(index - steps) * 100}%`],
  );

  return (
    <motion.div
      className={styles.mobileSlide}
      style={{ y, zIndex: index }}
    >
      <img
        src={study.image}
        alt=""
        className={styles.mobileImage}
        draggable={false}
      />
    </motion.div>
  );
};

const MetaContent = ({
  study,
  index,
  accent,
}: {
  study: CaseStudy;
  index: number;
  accent: string;
}) => (
  <>
    <div className={styles.metaIndex}>{pad(index + 1)}</div>
    <div className={styles.metaName} style={{ color: accent }}>
      {study.name}
    </div>
    <div className={styles.metaDesc}>
      <p className={styles.metaParagraph}>{study.description}</p>
    </div>
    <div className={styles.metaPrice}>
      <div className={styles.metaTags}>
        {study.tags.map((tag) => (
          <span key={tag} className={styles.metaTag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.metaValue}>
        {study.price}
        <span className={styles.metaCurrency}>{study.currency}</span>
      </div>
    </div>
  </>
);

const CaseStudies = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(total - 1, Math.max(0, Math.round(value * steps)));
    setActiveIndex(next);
  });

  const activeStudy = caseStudies[activeIndex];
  const accent = ACCENTS[activeIndex % ACCENTS.length];

  return (
    <section className={styles.section}>
      <div
        className={styles.track}
        ref={trackRef}
        style={{ height: `${total * 100}vh` }}
      >
        <div className={styles.sticky}>
          <div className={styles.header}>
            <div className={styles.headerInner}>
              <p className={styles.eyebrow} style={{ color: accent }}>
                {activeStudy.eyebrow}
              </p>
              <h2 className={styles.title}>{activeStudy.heading}</h2>
            </div>
          </div>

          <div className={styles.deck}>
            {caseStudies.map((study, index) => (
              <StackCard
                key={index}
                study={study}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
          <div className={styles.mobileDeck} aria-hidden>
            {caseStudies.map((study, index) => (
              <MobileSlide
                key={index}
                study={study}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <div className={styles.metaRow}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className={styles.metaInner}
                variants={metaFadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={metaFadeTransition}
              >
                <MetaContent
                  study={activeStudy}
                  index={activeIndex}
                  accent={accent}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
