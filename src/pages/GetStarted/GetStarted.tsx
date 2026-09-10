import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import styles from './GetStarted.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import CloudinaryImage from '@/components/CloudinaryImage/CloudinaryImage';
import CalendlyModal from './components/CalendlyModal/CalendlyModal';
import { usePageEntrance } from '@/hooks/usePageEntrance';
import Button from '@/components/Button/Button';

import { apricot, yellowCoral, teal, limeOlive } from '@/assets/images/shapes/floaters';
import { CALENDLY_URL } from '@/config/site';
import { caseStudiesFAQ } from '@/data/faq';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { pageMeta } from '@/config/seo';

type ShootEnd = { x: number; y: number; rotate: number };

/** Scroll travel targets — shared clock; heaviness = shorter ends. */
const SCROLL_MOTION = {
  floaterTeal: { x: -28, y: -62.5, rotate: -10.25 },
  floaterApricot: { x: -24.5, y: -63.75, rotate: -10.75 },
  floaterYellowCoral: { x: 9.75, y: -40, rotate: 6 },
  floaterLimeOlive: { x: 28, y: -63.75, rotate: 10.75 },
  card1: { x: -84, y: -36.25, rotate: -6.25 },
  card2: { x: -7, y: -35, rotate: -2.5 },
  card3: { x: 84, y: -38.75, rotate: 7 },
} as const satisfies Record<string, ShootEnd>;

const FLOATERS = [
  { src: apricot, className: styles.floaterApricot, motion: 'floaterApricot' },
  { src: yellowCoral, className: styles.floaterYellowCoral, motion: 'floaterYellowCoral' },
  { src: teal, className: styles.floaterTeal, motion: 'floaterTeal' },
] as const;

/**
 * The cards are square and CSS-sized: clamp(235px, 23vw, 390px) on desktop,
 * clamp(150px, 44vw, 235px) below 768px. Serving the untransformed originals
 * into that box was ~400 KiB of wasted transfer on the LCP path.
 */
const CARD_SRCSET_WIDTHS = [320, 480, 800];
const CARD_SIZES = '(max-width: 768px) 44vw, 23vw';
/** Only carries the 1:1 ratio — CSS sizes the box. Prevents a pre-decode reflow. */
const CARD_INTRINSIC_PX = 390;

const MEDIA_CARDS = [
  {
    src: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746630383/1732132444884_tgvvql.webp',
    className: styles.mediaCard1,
    motionClass: styles.scrollMotionCard1,
    motion: 'card1',
    priority: 'high',
  },
  {
    src: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746649932/d0fd6bbe-969a-4e6c-a1ae-84fa460b2950_ybgiyf.webp',
    className: styles.mediaCard2,
    motionClass: styles.scrollMotionCard2,
    motion: 'card2',
    priority: 'high',
  },
  {
    // Hidden below 768px, so it never competes with the LCP candidates on mobile.
    src: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746648102/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-09342_yujk0f.webp',
    className: styles.mediaCard3,
    motionClass: styles.scrollMotionCard3,
    motion: 'card3',
    priority: 'low',
  },
] as const;

/** Entrance order: middle → left → right (card indices 1, 0, 2) */
const CARD_ENTRANCE_DELAY = [0.14, 0.06, 0.22] as const;
/** All floaters together, after cards are underway */
const FLOATER_ENTRANCE_DELAY = 0.4;
const FLOATER_ENTRANCE_DURATION = 1.05;

function useShootStyle(shoot: MotionValue<number>, end: ShootEnd, enabled: boolean) {
  const x = useTransform(shoot, [0, 1], [0, end.x]);
  const y = useTransform(shoot, [0, 1], [0, end.y]);
  const rotate = useTransform(shoot, [0, 1], [0, end.rotate]);
  return enabled ? { x, y, rotate } : undefined;
}

const GetStarted = () => {
  useDocumentMeta(pageMeta.getStarted);

  const location = useLocation();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const motionOn = !reduceMotion;
  const entrance = usePageEntrance('get-started');
  const enterInitial = entrance.play ? entrance.fade.initial : false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Real-time with scroll; smoothstep only shapes the curve (no spring lag).
  const shoot = useTransform(scrollYProgress, (p) => p * p * (3 - 2 * p));

  useEffect(() => {
    if (location.hash === '#contact-form') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.hash === '#faq') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.hash === '#schedule-demo') {
      setIsCalendlyOpen(true);
      window.history.replaceState(null, '', '/get-started');
    }
  }, [location.hash, location]);

  const floaterApricotMotion = useShootStyle(shoot, SCROLL_MOTION.floaterApricot, motionOn);
  const floaterYellowCoralMotion = useShootStyle(shoot, SCROLL_MOTION.floaterYellowCoral, motionOn);
  const floaterTealMotion = useShootStyle(shoot, SCROLL_MOTION.floaterTeal, motionOn);
  const floaterLimeOliveMotion = useShootStyle(shoot, SCROLL_MOTION.floaterLimeOlive, motionOn);
  const card1Motion = useShootStyle(shoot, SCROLL_MOTION.card1, motionOn);
  const card2Motion = useShootStyle(shoot, SCROLL_MOTION.card2, motionOn);
  const card3Motion = useShootStyle(shoot, SCROLL_MOTION.card3, motionOn);

  const floaterMotions = [floaterApricotMotion, floaterYellowCoralMotion, floaterTealMotion];
  const cardMotions = [card1Motion, card2Motion, card3Motion];

  return (
    <div className={styles.getStartedWrapper}>
      <section ref={sectionRef} className={styles.hero}>
        <div className={styles.heroCopy}>
          <motion.h1
            initial={enterInitial}
            animate={entrance.fade.animate}
            transition={entrance.transition(0)}
          >
            Let’s remind people why it's so valuable to come together!
          </motion.h1>
          <motion.p
            initial={enterInitial}
            animate={entrance.fade.animate}
            transition={entrance.transition(0.12)}
          >
            Respond the next few questions and we’ll highlight a few products that you might want to
            consider adding to your program.
          </motion.p>
          <motion.div
            initial={enterInitial}
            animate={entrance.fade.animate}
            transition={entrance.transition(0.24)}
          >
            <Link to="/get-started-form" className={styles.cta}>
              Product Finder
            </Link>
          </motion.div>
        </div>

        <div className={styles.heroMedia}>
          <div className={styles.floaters} aria-hidden>
            {FLOATERS.map((floater, i) => (
              <motion.div
                key={floater.motion}
                className={styles.scrollMotion}
                style={floaterMotions[i]}
              >
                <motion.div
                  initial={entrance.play ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ...entrance.transition(FLOATER_ENTRANCE_DELAY),
                    duration: FLOATER_ENTRANCE_DURATION,
                  }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={floater.src}
                    alt=""
                    className={`${styles.floater} ${floater.className}`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className={styles.mediaCards} aria-hidden>
            {MEDIA_CARDS.map((card, i) => (
              <motion.div
                key={card.motion}
                className={`${styles.scrollMotion} ${card.motionClass}`}
                style={cardMotions[i]}
              >
                <motion.div
                  className={`${styles.mediaCard} ${card.className}`}
                  initial={
                    entrance.play ? { opacity: 0, ['--entrance-y' as string]: '50px' } : false
                  }
                  animate={{ opacity: 1, ['--entrance-y' as string]: '0px' }}
                  transition={entrance.transition(CARD_ENTRANCE_DELAY[i])}
                >
                  <CloudinaryImage
                    src={card.src}
                    alt=""
                    className={styles.mediaCardImg}
                    widths={CARD_SRCSET_WIDTHS}
                    sizes={CARD_SIZES}
                    width={CARD_INTRINSIC_PX}
                    height={CARD_INTRINSIC_PX}
                    decoding="async"
                    fetchPriority={card.priority}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className={styles.floatersFront} aria-hidden>
            <motion.div className={styles.scrollMotion} style={floaterLimeOliveMotion}>
              <motion.div
                initial={entrance.play ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...entrance.transition(FLOATER_ENTRANCE_DELAY),
                  duration: FLOATER_ENTRANCE_DURATION,
                }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <img
                  src={limeOlive}
                  alt=""
                  className={`${styles.floater} ${styles.floaterLimeOlive}`}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className={styles.darkGradientOverlay} aria-hidden />
        </div>
      </section>

      <div id="contact-form">
        <ContactForm />
      </div>

      <div className={styles.getInTouch}>
        <div className={styles.gitWrapper}>
          <div className={`${styles.gitBlock} ${styles.gitBlockRight}`}>
            <h3>Message us on LinkedIn</h3>
            <p>Message and follow us on LinkedIn to receive updates on what we’re up to.</p>
            <Button variant="dark" href="https://ca.linkedin.com/company/theprojectory">
              Find us on LinkedIn
            </Button>
          </div>
          <div className={`${styles.gitBlock} ${styles.gitBlockLeft}`}>
            <h3>Book a Meeting with Us</h3>
            <p>Tell us about your event, and we'll prepare some initial ideas to discuss.</p>
            <Button variant="light" onClick={() => setIsCalendlyOpen(true)}>
              Book a Meeting
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.faqAccordion}>
        <FaqAccordion
          id="faq"
          className={styles.faqAccordionInner}
          title={'Questions? We\nhave answers.'}
          items={caseStudiesFAQ}
        />
      </div>

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url={CALENDLY_URL}
      />
    </div>
  );
};

export default GetStarted;
