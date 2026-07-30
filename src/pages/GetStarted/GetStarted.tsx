import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Intro from '../../components/Intro/Intro';
import styles from './GetStarted.module.css';
import ContactForm from '../../components/ContactForm/ContactForm';
import FAQ from '../../components/FAQ/FAQ';
import CalendlyModal from './CalendlyModal/CalendlyModal';

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

const GetStarted = () => {
  const location = useLocation();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

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

  return (
    <div className={styles.getStartedWrapper}>
      <Intro
        title="Let’s remind people why it's so valuable to come together!"
        description="Respond the next few questions and we’ll highlight a few products that you might want to consider adding to your program."
        buttonText="Product Finder"
        buttonLink="/get-started-form"
      />
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