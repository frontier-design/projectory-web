import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import styles from './GetStarted.module.css';
import ContactForm from '../../components/ContactForm/ContactForm';
import FAQ from '../../components/FAQ/FAQ';
import CalendlyModal from './CalendlyModal/CalendlyModal';

import floaterTopLeft from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_15.png';
import floaterMid from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';
import floaterBottomLeft from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_2.png';
import floaterTopRight from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_11.webp';

/** Scroll travel targets — all share the same clock; heaviness = shorter ends. */
const SCROLL_MOTION = {
  floaterBottomLeft: { x: -160, y: -640, rotate: -58 },
  floaterTopLeft: { x: -140, y: -660, rotate: -62 },
  floaterMid: { x: 55, y: -420, rotate: 34 },
  floaterTopRight: { x: 160, y: -660, rotate: 62 },
  card1: { x: -480, y: -380, rotate: -36 },
  card2: { x: -40, y: -360, rotate: -14 },
  card3: { x: 480, y: -400, rotate: 40 },
} as const;

const CARD_IMAGES = [
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746630383/1732132444884_tgvvql.webp',
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746649932/d0fd6bbe-969a-4e6c-a1ae-84fa460b2950_ybgiyf.webp',
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1746648102/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-09342_yujk0f.webp',
] as const;

const caseStudiesFAQ = [
  {
    question: "What if I want to mix different experiences?",
    answer: "Combining in-room Facilitated Sessions with interactive installations outside the room enables Projectory to create a unique and integrated experience for your audience. Multiple experiences generate more output, leading to more meaningful post-event activation. During our discovery process, we’ll be able to curate together the best set of experiences for your event within your budget.",
  },
  {
    question: "Can you create custom experiences?",
    answer: "Absolutely! All our Facilitated Sessions and Interactive Installations started with a specific challenge or objective one of our clients shared with us. Custom designs usually start with a $20K USD investment, but the final price depends on the complexity and materials used. We'll work closely with your team to create something impactful within your budget.",
  },
  {
    question: "Can I do it myself?",
    answer: "Some of our products are easy to ship and build, allowing your team and volunteers to manage them without Projectory Staff on-site. We also license some of our frameworks so skilled facilitators can run a Projectory session with our tools and canvases after a brief training. Self-Service pricing (“You Do”) is more economical but requires some involvement from your team.",
  },
  {
    question: "What discounts can you provide?",
    answer: "Good question! Once we learn about your project, we’ll be able to come back with a few initial ideas. After we get you excited about what we have in mind, we can either send you a budget estimate or work backwards from whatever budget you can invest in this work.",
  },
  {
    question: "Would you consider emceeing my event?",
    answer: "Yes, especially if your agenda already includes a few Projectory Facilitated Sessions. As emcees, we do more than introduce speakers; we connect the dots between sessions and guide the program, taking attendees on a journey from inspiration to action.",
  },
];

function useAxis(shoot: MotionValue<number>, endValue: number) {
  return useTransform(shoot, [0, 1], [0, endValue]);
}

const GetStarted = () => {
  const location = useLocation();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.28,
    restDelta: 0.001,
  });

  // Continuous ease-in — light curve so it reads quicker while still smooth.
  const shoot = useTransform(smoothProgress, (p) => p ** 1.25);

  useEffect(() => {
    if (location.hash === '#contact-form') {
      const el = document.getElementById('contact-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    if (location.hash === '#schedule-demo') {
      setIsCalendlyOpen(true);
      window.history.replaceState(null, '', '/get-started');
    }
  }, [location.hash]);

  useEffect(() => {
    if (location.hash === '#faq') {
      const el = document.getElementById('faq');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const floaterBottomLeftX = useAxis(shoot, SCROLL_MOTION.floaterBottomLeft.x);
  const floaterBottomLeftY = useAxis(shoot, SCROLL_MOTION.floaterBottomLeft.y);
  const floaterBottomLeftRotate = useAxis(shoot, SCROLL_MOTION.floaterBottomLeft.rotate);
  const floaterTopLeftX = useAxis(shoot, SCROLL_MOTION.floaterTopLeft.x);
  const floaterTopLeftY = useAxis(shoot, SCROLL_MOTION.floaterTopLeft.y);
  const floaterTopLeftRotate = useAxis(shoot, SCROLL_MOTION.floaterTopLeft.rotate);
  const floaterMidX = useAxis(shoot, SCROLL_MOTION.floaterMid.x);
  const floaterMidY = useAxis(shoot, SCROLL_MOTION.floaterMid.y);
  const floaterMidRotate = useAxis(shoot, SCROLL_MOTION.floaterMid.rotate);
  const floaterTopRightX = useAxis(shoot, SCROLL_MOTION.floaterTopRight.x);
  const floaterTopRightY = useAxis(shoot, SCROLL_MOTION.floaterTopRight.y);
  const floaterTopRightRotate = useAxis(shoot, SCROLL_MOTION.floaterTopRight.rotate);
  const card1X = useAxis(shoot, SCROLL_MOTION.card1.x);
  const card1Y = useAxis(shoot, SCROLL_MOTION.card1.y);
  const card1Rotate = useAxis(shoot, SCROLL_MOTION.card1.rotate);
  const card2X = useAxis(shoot, SCROLL_MOTION.card2.x);
  const card2Y = useAxis(shoot, SCROLL_MOTION.card2.y);
  const card2Rotate = useAxis(shoot, SCROLL_MOTION.card2.rotate);
  const card3X = useAxis(shoot, SCROLL_MOTION.card3.x);
  const card3Y = useAxis(shoot, SCROLL_MOTION.card3.y);
  const card3Rotate = useAxis(shoot, SCROLL_MOTION.card3.rotate);

  const motionStyle = (
    x: MotionValue<number>,
    y: MotionValue<number>,
    rotate: MotionValue<number>,
  ) => (reduceMotion ? undefined : { x, y, rotate });

  return (
    <div className={styles.getStartedWrapper}>
      <section ref={sectionRef} className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Let’s remind people why it's so valuable to come together!</h1>
          <p>
            Respond the next few questions and we’ll highlight a few products that
            you might want to consider adding to your program.
          </p>
          <Link to="/get-started-form" className={styles.cta}>
            Product Finder
          </Link>
        </div>
        <div className={styles.heroMedia}>
          <div className={styles.floaters} aria-hidden>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(floaterTopLeftX, floaterTopLeftY, floaterTopLeftRotate)}
            >
              <img
                src={floaterTopLeft}
                alt=""
                className={`${styles.floater} ${styles.floaterTopLeft}`}
              />
            </motion.div>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(floaterMidX, floaterMidY, floaterMidRotate)}
            >
              <img
                src={floaterMid}
                alt=""
                className={`${styles.floater} ${styles.floaterMid}`}
              />
            </motion.div>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(floaterBottomLeftX, floaterBottomLeftY, floaterBottomLeftRotate)}
            >
              <img
                src={floaterBottomLeft}
                alt=""
                className={`${styles.floater} ${styles.floaterBottomLeft}`}
              />
            </motion.div>
          </div>
          <div className={styles.mediaCards} aria-hidden>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(card1X, card1Y, card1Rotate)}
            >
              <div className={`${styles.mediaCard} ${styles.mediaCard1}`}>
                <img src={CARD_IMAGES[0]} alt="" className={styles.mediaCardImg} />
              </div>
            </motion.div>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(card2X, card2Y, card2Rotate)}
            >
              <div className={`${styles.mediaCard} ${styles.mediaCard2}`}>
                <img src={CARD_IMAGES[1]} alt="" className={styles.mediaCardImg} />
              </div>
            </motion.div>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(card3X, card3Y, card3Rotate)}
            >
              <div className={`${styles.mediaCard} ${styles.mediaCard3}`}>
                <img src={CARD_IMAGES[2]} alt="" className={styles.mediaCardImg} />
              </div>
            </motion.div>
          </div>
          <div className={styles.floatersFront} aria-hidden>
            <motion.div
              className={styles.scrollMotion}
              style={motionStyle(floaterTopRightX, floaterTopRightY, floaterTopRightRotate)}
            >
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
      <h2> Other Ways to Get In Touch </h2>
        <div className={styles.gitWrapper}>
        <div className={`${styles.gitBlock} ${styles.gitBlockLeft}`}>
        <h3>Book a Meeting with Us</h3>
        <p>Tell us about your event, and we'll prepare some initial ideas to discuss.</p>
        <button 
          onClick={() => setIsCalendlyOpen(true)} 
          className={styles.gitButton}
        >
          Book a Meeting
        </button>
      </div>
      <div className={`${styles.gitBlock} ${styles.gitBlockRight}`}>
        <h3>Message us on LinkedIn </h3>
        <p>Message and follow us on LinkedIn to receive updates on what we’re up to.</p>
        <a href="https://ca.linkedin.com/company/theprojectory" target="_blank" rel="noopener noreferrer" className={styles.gitButton}>
          Find us on LinkedIn
        </a>
      </div>
        </div>
    </div>


      <div id="faq" className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      <p>Curious about how Projectory works or what experiences
      are right for you? Below, we’ve answered some of the most common questions to help you get started and make the most of your event.</p>
    </div>

    <div className={styles.faqWrapper}>
      <FAQ faqs={caseStudiesFAQ} />
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