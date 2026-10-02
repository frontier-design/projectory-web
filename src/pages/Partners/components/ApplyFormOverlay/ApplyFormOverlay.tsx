// Partner enquiry as a dark-glass overlay, opened from a program card's "Learn more" or the
// banner's "Hold the Dates". Asks who they are and which event dates to hold. The submit
// button (the cards' "Learn more" button) takes the card's accent, or the banner's lime.
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from '@/components/Button/Button';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useScrollLock } from '@/hooks/useScrollLock';
import HoneypotField from '@/components/HoneypotField/HoneypotField';
import { useLeadForm } from '@/hooks/useLeadForm';
import { fieldErrorMessage } from '@/lib/leads';
import { bannerProgram, partnerPrograms, type ApplyProgram } from '../../partnersData';
import styles from './ApplyFormOverlay.module.css';

interface ApplyFormOverlayProps {
  /** The card whose "Learn more" was clicked, or "CTA" for the banner; `null` keeps it closed. */
  program: ApplyProgram | null;
  onClose: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

// Opacity alone doesn't fade a backdrop-filter in every engine (the blur lands at
// full strength before the tint), so the blur radius rides along. 10px = .backdrop's.
const BACKDROP_HIDDEN = {
  opacity: 0,
  backdropFilter: 'blur(0px)',
  WebkitBackdropFilter: 'blur(0px)',
};
const BACKDROP_SHOWN = {
  opacity: 1,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
};

// eventDate is the start date; the names match what api/lead-form.cjs reads.
const emptyForm = {
  name: '',
  email: '',
  company: '',
  eventDate: '',
  eventEndDate: '',
  eventLocation: '',
};

const accentFor = (program: ApplyProgram) =>
  partnerPrograms.cards.find((c) => c.title === program)?.accent ?? bannerProgram.accent;

const ApplyFormOverlay = ({ program, onClose }: ApplyFormOverlayProps) => {
  const open = program !== null;

  useEscapeKey(onClose, open);
  useScrollLock(open);

  return createPortal(
    <AnimatePresence>
      {program && (
        <motion.div
          key="backdrop"
          className={styles.backdrop}
          onClick={onClose}
          initial={BACKDROP_HIDDEN}
          animate={BACKDROP_SHOWN}
          exit={BACKDROP_HIDDEN}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <motion.div
            className={styles.frame}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* Mounted per open, so every open starts with a fresh form. */}
            <OverlayPanel program={program} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

interface OverlayPanelProps {
  program: ApplyProgram;
  onClose: () => void;
}

const OverlayPanel = ({ program, onClose }: OverlayPanelProps) => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const { send, sending, honeypotProps } = useLeadForm();
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  // The panel's height tracks its content, so the form → confirmation swap
  // morphs instead of jumping. Clamped to the panel's max-height so a tall,
  // scrolling form (phones) starts shrinking from what's actually on screen.
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useLayoutEffect(() => {
    const el = contentRef.current!;
    const ro = new ResizeObserver(() =>
      setHeight(Math.min(el.offsetHeight, window.innerHeight - 48))
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const accent = accentFor(program);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Goes to Pipedrive as a lead; a Web3Forms email is the backup if Pipedrive can't take it.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    const result = await send({
      form: 'partner-application',
      fields: { ...formData, program },
      fallback: {
        subject: `Partner application (${program})`,
        from_name: formData.name,
        ...formData,
        program,
      },
      embedded: true,
    });
    if (result.ok) setSubmitted(true);
    else setStatus(fieldErrorMessage(result) ?? 'Something went wrong. Please try again.');
  };

  return (
    <motion.div
      className={`${styles.panel} ${styles[accent]}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={false}
      // Natural height until submit: converting `auto` mid-entrance reads the 0.98-scaled box and snaps at the end.
      animate={{ height: submitted ? height : 'auto' }}
      // Ease-in-out, not the entrance EASE: a size change reads smoother when it doesn't lurch off the mark.
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.65, 0, 0.35, 1] }}
    >
      <div ref={contentRef} className={styles.content}>
        {/* `wait`: the form fades out at full height, then the shorter confirmation mounts and the panel eases down to it. */}
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="success"
              className={styles.success}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.15 }}
            >
              <h2 id={titleId} className={styles.title}>
                Got it!
                <br />
                We’ll be in touch soon with next steps!
              </h2>
              <button type="button" className={styles.backLink} onClick={onClose}>
                Back to the website
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className={styles.form}
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className={styles.heading}>
                <h2 id={titleId} className={styles.title}>
                  Which dates should we hold?
                </h2>
                <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                  <FiX size={32} strokeWidth={1.25} aria-hidden />
                </button>
              </div>
              <p className={styles.intro}>
                Even if it’s months away. We’ll protect the dates and wait for your sign.
              </p>
              <input type="hidden" name="program" value={program} />
              <HoneypotField {...honeypotProps} />

              <div className={styles.fieldRow}>
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Company</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>

              <div className={styles.fieldRow}>
                <label className={styles.field}>
                  <span className={styles.label}>Event start date</span>
                  <input
                    type="date"
                    name="eventDate"
                    className={formData.eventDate ? undefined : styles.empty}
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Event end date</span>
                  <input
                    type="date"
                    name="eventEndDate"
                    className={formData.eventEndDate ? undefined : styles.empty}
                    // The browser blocks submitting an end date before the start date.
                    min={formData.eventDate || undefined}
                    value={formData.eventEndDate}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Event location</span>
                <input
                  type="text"
                  name="eventLocation"
                  placeholder="City, and venue if you know it"
                  value={formData.eventLocation}
                  onChange={handleChange}
                />
              </label>

              <Button type="submit" variant="light" className={styles.submit} disabled={sending}>
                Hold the Dates
              </Button>
              {status && (
                <p className={styles.statusMessage} role="alert">
                  {status}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ApplyFormOverlay;
