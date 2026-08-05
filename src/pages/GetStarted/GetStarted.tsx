import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import styles from './GetStarted.module.css';
import ContactForm from '../../components/ContactForm/ContactForm';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import CalendlyModal from './CalendlyModal/CalendlyModal';

import floaterTopLeft from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_15.png';
import floaterMid from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';
import floaterBottomLeft from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_2.png';
import floaterTopRight from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_11.webp';

type ShootEnd = { x: number; y: number; rotate: number };

/** Scroll travel targets — shared clock; heaviness = shorter ends. */
const SCROLL_MOTION = {
  floaterBottomLeft: { x: -28, y: -62.5, rotate: -10.25 },
  floaterTopLeft: { x: -24.5, y: -63.75, rotate: -10.75 },
  floaterMid: { x: 9.75, y: -40, rotate: 6 },
  floaterTopRight: { x: 28, y: -63.75, rotate: 10.75 },
  card1: { x: -84, y: -36.25, rotate: -6.25 },
  card2: { x: -7, y: -35, rotate: -2.5 },
  card3: { x: 84, y: -38.75, rotate: 7 },
} as const satisfies Record<string, ShootEnd>;

const FLOATERS = [
  { src: floaterTopLeft, className: styles.floaterTopLeft, motion: 'floaterTopLeft' },
  { src: floaterMid, className: styles.floaterMid, motion: 'floaterMid' },
  { src: floaterBottomLeft, className: styles.floaterBottomLeft, motion: 'floaterBottomLeft' },
] as const;

const MEDIA_CARDS = [
  {
    src: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746630383/1732132444884_tgvvql.webp',
    className: styles.mediaCard1,
    motionClass: styles.scrollMotionCard1,
    motion: 'card1',
  },
  {
    src: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746649932/d0fd6bbe-969a-4e6c-a1ae-84fa460b2950_ybgiyf.webp',
    className: styles.mediaCard2,
    motionClass: styles.scrollMotionCard2,
    motion: 'card2',
  },
  {
    src: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746648102/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-09342_yujk0f.webp',
    className: styles.mediaCard3,
    motionClass: styles.scrollMotionCard3,
    motion: 'card3',
  },
] as const;

const caseStudiesFAQ = [
  {
    question: 'What if I want to mix different experiences?',
    answer:
      'Combining in-room Facilitated Sessions with interactive installations outside the room enables Projectory to create a unique and integrated experience for your audience. Multiple experiences generate more output, leading to more meaningful post-event activation. During our discovery process, we’ll be able to curate together the best set of experiences for your event within your budget.',
  },
  {
    question: 'Can you create custom experiences?',
    answer:
      "Absolutely! All our Facilitated Sessions and Interactive Installations started with a specific challenge or objective one of our clients shared with us. Custom designs usually start with a $20K USD investment, but the final price depends on the complexity and materials used. We'll work closely with your team to create something impactful within your budget.",
  },
  {
    question: 'Can I do it myself?',
    answer:
      'Some of our products are easy to ship and build, allowing your team and volunteers to manage them without Projectory Staff on-site. We also license some of our frameworks so skilled facilitators can run a Projectory session with our tools and canvases after a brief training. Self-Service pricing (“You Do”) is more economical but requires some involvement from your team.',
  },
  {
    question: 'What discounts can you provide?',
    answer:
      'Good question! Once we learn about your project, we’ll be able to come back with a few initial ideas. After we get you excited about what we have in mind, we can either send you a budget estimate or work backwards from whatever budget you can invest in this work.',
  },
  {
    question: 'Would you consider emceeing my event?',
    answer:
      'Yes, especially if your agenda already includes a few Projectory Facilitated Sessions. As emcees, we do more than introduce speakers; we connect the dots between sessions and guide the program, taking attendees on a journey from inspiration to action.',
  },
];

function useShootStyle(shoot: MotionValue<number>, end: ShootEnd, enabled: boolean) {
  const x = useTransform(shoot, [0, 1], [0, end.x]);
  const y = useTransform(shoot, [0, 1], [0, end.y]);
  const rotate = useTransform(shoot, [0, 1], [0, end.rotate]);
  return enabled ? { x, y, rotate } : undefined;
}

const GetStarted = () => {
  const location = useLocation();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const motionOn = !reduceMotion;

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

  const floaterTopLeftMotion = useShootStyle(shoot, SCROLL_MOTION.floaterTopLeft, motionOn);
  const floaterMidMotion = useShootStyle(shoot, SCROLL_MOTION.floaterMid, motionOn);
  const floaterBottomLeftMotion = useShootStyle(shoot, SCROLL_MOTION.floaterBottomLeft, motionOn);
  const floaterTopRightMotion = useShootStyle(shoot, SCROLL_MOTION.floaterTopRight, motionOn);
  const card1Motion = useShootStyle(shoot, SCROLL_MOTION.card1, motionOn);
  const card2Motion = useShootStyle(shoot, SCROLL_MOTION.card2, motionOn);
  const card3Motion = useShootStyle(shoot, SCROLL_MOTION.card3, motionOn);

  const floaterMotions = [floaterTopLeftMotion, floaterMidMotion, floaterBottomLeftMotion];
  const cardMotions = [card1Motion, card2Motion, card3Motion];

  return (
    <div className={styles.getStartedWrapper}>
      <section ref={sectionRef} className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Let’s remind people why it's so valuable to come together!</h1>
          <p>
            Respond the next few questions and we’ll highlight a few products that you might
            want to consider adding to your program.
          </p>
          <Link to="/get-started-form" className={styles.cta}>
            Product Finder
          </Link>
        </div>

        <div className={styles.heroMedia}>
          <div className={styles.floaters} aria-hidden>
            {FLOATERS.map((floater, i) => (
              <motion.div
                key={floater.motion}
                className={styles.scrollMotion}
                style={floaterMotions[i]}
              >
                <img
                  src={floater.src}
                  alt=""
                  className={`${styles.floater} ${floater.className}`}
                />
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
                <div className={`${styles.mediaCard} ${card.className}`}>
                  <img src={card.src} alt="" className={styles.mediaCardImg} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.floatersFront} aria-hidden>
            <motion.div className={styles.scrollMotion} style={floaterTopRightMotion}>
              <img
                src={floaterTopRight}
                alt=""
                className={`${styles.floater} ${styles.floaterTopRight}`}
              />
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
            <a
              href="https://ca.linkedin.com/company/theprojectory"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.gitButton}
            >
              Find us on LinkedIn
            </a>
          </div>
          <div className={`${styles.gitBlock} ${styles.gitBlockLeft}`}>
            <h3>Book a Meeting with Us</h3>
            <p>Tell us about your event, and we'll prepare some initial ideas to discuss.</p>
            <button onClick={() => setIsCalendlyOpen(true)} className={styles.gitButton}>
              Book a Meeting
            </button>
          </div>
        </div>
      </div>

      <div className={styles.faqAccordion}>
        <FaqAccordion
          id="faq"
          className={styles.faqAccordionInner}
          title={"Questions? We\nhave answers."}
          items={caseStudiesFAQ}
        />
      </div>

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/oren-/projectory?month=2026-01"
      />
    </div>
  );
};

export default GetStarted;
