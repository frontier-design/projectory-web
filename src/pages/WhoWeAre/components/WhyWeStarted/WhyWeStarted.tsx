import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { whyWeStartedSection } from '../../whoWeAreData';
import styles from './WhyWeStarted.module.css';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useScrollLock } from '@/hooks/useScrollLock';

const WhyWeStarted = () => {
  const { title, videoSrc, paragraphs } = whyWeStartedSection;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  useEscapeKey(() => setIsLightboxOpen(false), isLightboxOpen);

  useScrollLock(isLightboxOpen);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const video = lightboxVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {});
  }, [isLightboxOpen]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <section className={styles.section}>
      <div
        className={styles.media}
        onClick={openLightbox}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLightbox();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Play video fullscreen"
      >
        <video className={styles.video} src={videoSrc} autoPlay muted loop playsInline />
      </div>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {isLightboxOpen &&
        createPortal(
          <div className={styles.lightboxBackdrop} onClick={closeLightbox}>
            <button
              type="button"
              className={styles.lightboxCloseButton}
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close video"
            >
              <FiX />
            </button>
            <div className={styles.lightboxContent} onClick={(event) => event.stopPropagation()}>
              <video
                ref={lightboxVideoRef}
                key={videoSrc}
                className={styles.lightboxVideo}
                src={videoSrc}
                autoPlay
                controls
                playsInline
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default WhyWeStarted;
