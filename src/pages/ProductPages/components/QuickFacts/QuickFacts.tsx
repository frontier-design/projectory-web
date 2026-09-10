import styles from './QuickFacts.module.css';
import icon1 from '@/assets/images/shapes/pMonograms/columnP_1.svg';
import icon2 from '@/assets/images/shapes/pMonograms/columnP_2.svg';
import icon3 from '@/assets/images/shapes/pMonograms/columnP_3.svg';

interface GridItem {
  text: string;
}

const QuickFacts = ({ items }: { items: GridItem[] }) => {
  return (
    <section className={styles.gridWrapper}>
      {items.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          <img
            src={index === 0 ? icon1 : index === 1 ? icon2 : icon3}
            alt="Icon"
            className={styles.icon}
          />
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
};

export default QuickFacts;
