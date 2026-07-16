import { useEffect, useRef, useState } from 'react';
import { faqSection } from '../../pricingData';
import styles from './FAQ.module.css';

type FaqItem = (typeof faqSection.items)[number];

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M7.75 1V14.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 7.75H14.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FAQCard = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <button
      type="button"
      className={`${styles.card}${isOpen ? ` ${styles.cardOpen}` : ''}`}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <div className={styles.questionRow}>
        <span className={styles.question}>{item.question}</span>
        <PlusIcon className={`${styles.icon}${isOpen ? ` ${styles.iconOpen}` : ''}`} />
      </div>
      <div className={styles.answerWrapper} style={{ height }}>
        <div ref={contentRef}>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      </div>
    </button>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <h2 className={styles.title}>{faqSection.title}</h2>
      <div className={styles.list}>
        {faqSection.items.map((item, index) => (
          <FAQCard
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
