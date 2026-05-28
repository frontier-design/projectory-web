import styles from './Objectives.module.css';
import CloudinaryImage from '../../../../components/CloudinaryImage/CloudinaryImage';

interface ObjectivesProps {
  title: string;
  titleColor: string; 
  imageUrl: string;
  objectives: string[];
}

const Objectives = ({ title, titleColor, imageUrl, objectives }: ObjectivesProps) => {
  return (
    <section className={styles.objectivesWrapper}>
      <div className={styles.imageContainer}>
        <CloudinaryImage src={imageUrl} alt="Event" className={styles.objectivesImage} />
      </div>

      <div className={styles.textContent}>
        <h2 style={{ backgroundImage: titleColor ? `linear-gradient(to right, ${titleColor})` : 'none' }}>
          {title}
        </h2>
        <ul className={styles.list}>
          {objectives.map((obj, index) => (
            <li key={index}>{obj}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Objectives;