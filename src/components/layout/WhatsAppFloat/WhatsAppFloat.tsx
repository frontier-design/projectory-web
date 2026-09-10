import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppFloat.module.css';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=16474552051&text&type=phone_number&app_absent=0';

const SHOW_DELAY_MS = 10_000;
const CALLOUT_VISIBLE_MS = 5000;

const WhatsAppFloat = () => {
  const [dismissed, setDismissed] = useState(false);
  const [delayElapsed, setDelayElapsed] = useState(false);
  const [calloutDismissed, setCalloutDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const id = window.setTimeout(() => setDelayElapsed(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [dismissed]);

  useEffect(() => {
    if (!delayElapsed || dismissed) return;

    const id = window.setTimeout(() => setCalloutDismissed(true), CALLOUT_VISIBLE_MS);
    return () => window.clearTimeout(id);
  }, [delayElapsed, dismissed]);

  const handleDismissFab = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
  }, []);

  if (dismissed || !delayElapsed) return null;

  const showCallout = !calloutDismissed;

  return (
    <div className={styles.wrapper}>
      <div className={styles.anchor}>
        {showCallout ? (
          <div className={styles.callout} role="status" aria-live="polite">
            <div className={styles.calloutInner}>
              <p className={styles.calloutLine}>Have a question?</p>
              <p className={styles.calloutLine}>Reach out on WhatsApp.</p>
            </div>
          </div>
        ) : null}
        <div className={styles.cluster}>
          <button
            type="button"
            className={styles.close}
            onClick={handleDismissFab}
            aria-label="Hide WhatsApp contact button"
          >
            ×
          </button>
          <a
            href={WHATSAPP_URL}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
          >
            <span className={styles.circle}>
              <FaWhatsapp className={styles.icon} aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;
