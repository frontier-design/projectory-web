import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from 'framer-motion';
import styles from './CaseStudies.module.css';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import LandingHero from '../../components/LandingHero/LandingHero';
import { coralTeal, creamCoral, lime, redLime } from '../../assets/images/shapes/floaters';

import CventImage from '../../assets/images/logos/cvent.png'
import EventMarketer from '../../assets/images/logos/eventMarketerLogo.png';
import PcmaLogo from '../../assets/images/logos/pcmaLogo.png';
import RainFocusLogo from '../../assets/images/logos/rainFocusLogo.png';
import CemaLogo from '../../assets/images/logos/cema.png';

import { caseStudiesData } from '../CaseStudyPages/caseStudiesData'; 

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

const caseStudies = [
  {
    id: 1,
    title: 'Facilitating strategic conversations for the most senior leaders of the bank',
    subtitle: 'CIBC Global Leadership Summit',
    link: '/case-study/cibc-global-leadership-summit',
    imageSrc: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749518972/FM8A5043-Enhanced-NR_qywkjc_vydjdi.webp',
  },
  {
    id: 2,
    title: 'Highlighting the value of audience engagement for event industry professionals',
    subtitle: 'PCMA 2024 CEMA Summit ',
    link: '/pcma-2024-cema-summit',
    imageSrc: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749519212/Screenshot_2025-05-20_at_19.18.46_gfnyht_ssydvf.webp',
  },
  {
    id: 3,
    title: 'Turning an SKO into an action-packed and collaborative experience',
    subtitle: "Surescript's Sales Kickoff",
    link: '/surescripts-sales-kickoff',
    imageSrc: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749519968/Flagfinder_udmunk_fil12l.webp',
  },
  {
    id: 4,
    title: 'Bringing ecosystem partners together for a day of connection and inspiration',
    subtitle: "Deloitte Connect 2024",
    link: '/deloitte-connect-2024',
    imageSrc: 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749520803/Deloitte-June19th2024-0125_websize_hgkwds_cbli1w.webp',
  },
  
];

const CaseStudies: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const totalBlocks = caseStudies.length;

  // overallIndex: [0..totalBlocks] as we scroll
  const overallIndex = useTransform(scrollYProgress, [0, 1], [0, totalBlocks]);
  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    const unsubscribe = overallIndex.on('change', (value) => {
      let blockIndex = Math.floor(value);
      if (blockIndex >= totalBlocks) {
        blockIndex = totalBlocks - 1;
      }
      setCurrentBlock(blockIndex);
    });
    return () => unsubscribe();
  }, [overallIndex, totalBlocks]);

  const isLastBlock = currentBlock === totalBlocks - 1;

  const activeProgress = useTransform(
    scrollYProgress,
    [currentBlock / totalBlocks, (currentBlock + 1) / totalBlocks],
    [0, 1]
  );

  const normalOpacity = useTransform(activeProgress, [0, 0.8, 1], [1, 0.8, 0]);
  const normalScale = useTransform(activeProgress, [0, 1], [1, 0.8]);

  const fixedOpacity = useMotionValue(1);
  const fixedScale = useMotionValue(1);

  const outgoingOpacity = isLastBlock ? fixedOpacity : normalOpacity;
  const outgoingScale = isLastBlock ? fixedScale : normalScale;

  const [outgoingOpacityValue, setOutgoingOpacityValue] = useState(1);
  useEffect(() => {
    if (isLastBlock) return; 

    const unsubscribe = outgoingOpacity.on('change', (latest) => {
      if (latest < 0.5 && outgoingOpacityValue >= 0.5) {
        setOutgoingOpacityValue(latest);
      } else if (latest >= 0.5 && outgoingOpacityValue < 0.5) {
        setOutgoingOpacityValue(latest);
      }
    });
    return () => unsubscribe();
  }, [outgoingOpacity, outgoingOpacityValue, isLastBlock]);

  const outgoingPointerEvents =
    !isLastBlock && outgoingOpacityValue < 0.5 ? 'none' : 'auto';

  const incomingProgress = useTransform(
    scrollYProgress,
    [(currentBlock + 0.5) / totalBlocks, (currentBlock + 1) / totalBlocks],
    [0, 1]
  );
  const incomingTranslateY = useTransform(incomingProgress, [0, 1], [50, 0]);
  const incomingOpacity = useTransform(incomingProgress, [0, 1], [0, 1]);

  const [incomingOpacityValue, setIncomingOpacityValue] = useState(0);
  useEffect(() => {
    // If the last block is active, there's no "incoming" block
    if (isLastBlock) return;

    const unsubscribe = incomingOpacity.on('change', (latest) => {
      // Only update if we cross 0.2 threshold
      if (latest > 0.2 && incomingOpacityValue <= 0.2) {
        setIncomingOpacityValue(latest);
      } else if (latest <= 0.2 && incomingOpacityValue > 0.2) {
        setIncomingOpacityValue(latest);
      }
    });
    return () => unsubscribe();
  }, [incomingOpacity, incomingOpacityValue, isLastBlock]);

  const incomingPointerEvents =
    !isLastBlock && incomingOpacityValue > 0.2 ? 'auto' : 'none';

  const progressBarFill = useTransform(activeProgress, [0, 1], ['0%', '100%']);
  const isSectionInView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });

  const handleExploreAll = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <LandingHero
        className={styles.hero}
        pill="Case Studies"
        title={"Turning Ideas\nInto Impact"}
        description="Explore how our projects redefine interactive experiences and create lasting Impacts."
        buttonLabel="Explore Case Studies"
        onButtonClick={handleExploreAll}
        shapes={{ upper: coralTeal, midLeft: creamCoral, midRight: lime, lower: redLime }}
        midRightRotateRange={[170, 105]}
        flipMidRight
        solidShapes
        entranceKey="case-studies"
      />

      {/* Scroll Container */}
      <div
        className={styles.scrollContainer}
        ref={sectionRef}
        style={{ height: `${totalBlocks * 200}vh` }}
      >
        <div className={styles.stickySection}>
          {/* Progress Bar */}
          <motion.div
            className={styles.progressContainer}
            animate={{ opacity: isSectionInView && isScrolling ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className={styles.progressBar} style={{ height: progressBarFill }} />
          </motion.div>

          {/* Outgoing (Active) Block */}
          {currentBlock < totalBlocks && (
            <motion.div
              className={styles.caseStudyContent}
              style={{
                scale: outgoingScale,
                opacity: outgoingOpacity,
                pointerEvents: outgoingPointerEvents,
                zIndex: 1,
              }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={caseStudies[currentBlock].imageSrc}
                  alt={caseStudies[currentBlock].title}
                  className={styles.image}
                />
              </div>
              <div className={styles.overlay}>
                <h2>{caseStudies[currentBlock].title}</h2>
                <p>{caseStudies[currentBlock].subtitle}</p>
                <Link to={`/case-study/${caseStudiesData[currentBlock].id}`} className={styles.caseStudyButton}>
                  View Full Case Study →
                </Link>
              </div>
            </motion.div>
          )}

          {/* Incoming (Next) Block (skipped if we're on the last block) */}
          {currentBlock < totalBlocks - 1 && (
            <motion.div
              className={styles.caseStudyContent}
              initial={{ opacity: 0, translateY: 50 }}
              style={{
                opacity: incomingOpacity,
                translateY: incomingTranslateY,
                position: 'absolute',
                width: '100%',
                pointerEvents: incomingPointerEvents,
                zIndex: 2,
              }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={caseStudies[currentBlock + 1].imageSrc}
                  alt={caseStudies[currentBlock + 1].title}
                  className={styles.image}
                />
              </div>
              <div className={styles.overlay}>
                <h2>{caseStudies[currentBlock + 1].title}</h2>
                <p>{caseStudies[currentBlock + 1].subtitle}</p>
                <Link to={`/case-study/${caseStudiesData[currentBlock + 1].id}`} className={styles.caseStudyButton}>
                  View Full Case Study →
                </Link>
              </div>
            </motion.div>
          )}
        </div>

      </div>

      <ClientLogos 
        background=" var(--linear-gradient)"
      />
      
      <TestimonialSizzle
        videoSrc="https://res.cloudinary.com/dazzkestf/video/upload/q_auto/v1749521688/Website_Testimonials_Dec_2024_V4_jsyqfo_mb8c7q.mp4"
        quote='"Projectory helped bring our conference to life. As soon as I heard they took the analog experience and could make it read out results for us, I was blown away."'
        author="Sandy Sharman"
        role="Group Head, People Culture & Brand, CIBC"
      />

      <TrustedBy
        logos={[
            CventImage,
            EventMarketer,
            PcmaLogo,
            RainFocusLogo,
            CemaLogo
        ]}
      />

    <div className={styles.faqAccordion}>
      <FaqAccordion
        className={styles.faqAccordionInner}
        title={"Questions? We\nhave answers."}
        items={caseStudiesFAQ}
      />
    </div>

    </div>
  );
};

export default CaseStudies;