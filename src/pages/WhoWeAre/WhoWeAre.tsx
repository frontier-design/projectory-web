import styles from './WhoWeAre.module.css';
import WhoWeAreHero from './components/WhoWeAreHero/WhoWeAreHero';
import Intro from './components/Intro/Intro';
import ImageCarousel from './components/ImageCarousel/ImageCarousel';
import Team from './components/Team/Team';
import WhyWeStarted from './components/WhyWeStarted/WhyWeStarted';
import CtaBanner from './components/CtaBanner/CtaBanner';
import FAQ from '../Pricing/components/FAQ/FAQ';

const WhoWeAre = () => {
  return (
    <div className={styles.whoWeArePage}>
      <WhoWeAreHero />
      <div className={styles.container}>
        <Intro />
      </div>
      <ImageCarousel />
      <div className={`${styles.container} ${styles.teamBlock}`}>
        <Team />
      </div>
      <div className={`${styles.container} ${styles.sectionBlock}`}>
        <WhyWeStarted />
      </div>
      <CtaBanner />
      <div className={`${styles.container} ${styles.sectionBlock} ${styles.faqBlock}`}>
        <FAQ />
      </div>
    </div>
  );
};

export default WhoWeAre;
