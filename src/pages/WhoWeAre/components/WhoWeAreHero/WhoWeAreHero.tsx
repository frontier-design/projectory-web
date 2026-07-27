import { heroSection } from '../../whoWeAreData';
import styles from './WhoWeAreHero.module.css';

const WhoWeAreHero = () => {
  const { videoSrc } = heroSection;

  return (
    <section className={styles.heroWrapper} aria-label="Who we are">
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
    </section>
  );
};

export default WhoWeAreHero;
