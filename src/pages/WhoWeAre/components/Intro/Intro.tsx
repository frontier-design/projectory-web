import { introSection } from '../../whoWeAreData';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <section className={styles.intro}>
      {introSection.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default Intro;
