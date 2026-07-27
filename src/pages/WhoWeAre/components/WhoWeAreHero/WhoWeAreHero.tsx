import { heroSection } from '../../whoWeAreData';
import Intro from '../Intro/Intro';
import styles from './WhoWeAreHero.module.css';

const WhoWeAreHero = () => {
  const { videoSrc } = heroSection;

  return (
    <section className={styles.landing} aria-label="Who we are">
      <div className={styles.media}>
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
      </div>
      <div className={styles.introBand}>
        <Intro />
      </div>
    </section>
  );
};

export default WhoWeAreHero;
