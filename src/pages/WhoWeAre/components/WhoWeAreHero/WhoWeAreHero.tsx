import { heroSection } from '../../whoWeAreData';
import styles from './WhoWeAreHero.module.css';

const WhoWeAreHero = () => {
  const { eyebrow, title, videoSrc } = heroSection;

  return (
    <section className={styles.heroWrapper}>
      {videoSrc ? (
        <video
          className={styles.heroMedia}
          autoPlay
          loop
          muted
          playsInline
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className={styles.heroMedia} aria-hidden />
      )}
      <div className={styles.overlay} />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
};

export default WhoWeAreHero;
