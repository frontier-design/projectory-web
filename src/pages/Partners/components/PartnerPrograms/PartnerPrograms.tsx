import { Link } from 'react-router-dom';
import { partnerPrograms, sectionIds, type PartnerProgram } from '../../partnersData';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import MutedNote from '@/components/MutedNote/MutedNote';
import styles from './PartnerPrograms.module.css';

interface PartnerProgramsProps {
  /** A card's "Learn more": opens the enquiry overlay (Partners.tsx) on that program. */
  onSelect: (program: PartnerProgram) => void;
}

const PartnerPrograms = ({ onSelect }: PartnerProgramsProps) => {
  const { note } = partnerPrograms;

  return (
    <section id={sectionIds.programs} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{partnerPrograms.eyebrow}</p>
        <h2 className={styles.title}>{partnerPrograms.title}</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.cards}>
          {partnerPrograms.cards.map((card) => (
            <FeatureCard
              key={card.title}
              {...card}
              cta={{ label: 'Learn more', onClick: () => onSelect(card.title) }}
            />
          ))}
        </div>
        <MutedNote>
          {note.lines[0]}
          <br />
          {note.lines[1]} <Link to={note.link.to}>{note.link.label}</Link>.
        </MutedNote>
      </div>
    </section>
  );
};

export default PartnerPrograms;
