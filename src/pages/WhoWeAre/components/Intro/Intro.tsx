import { heroSection, introSection } from '../../whoWeAreData';
import styles from './Intro.module.css';

const Intro = () => {
  const { eyebrow, title } = heroSection;

  return (
    <section className={styles.intro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.copyBlock}>
          {introSection.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
