import { heroSection } from '../../whoWeAreData';
import Intro from '../Intro/Intro';
import styles from './WhoWeAreHero.module.css';

const WhoWeAreHero = () => {
  const { videoSrc, posterSrc } = heroSection;

  return (
    <section className={styles.landing} aria-label="Who we are">
      <div
        className={styles.media}
        style={{ ['--hero-poster' as string]: `url(${posterSrc})` }}
      >
        {videoSrc ? (
          <video
            className={styles.heroMedia}
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc}
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
