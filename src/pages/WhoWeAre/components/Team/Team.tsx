import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { getMemberLinks, teamSection, type TeamMember } from '../../whoWeAreData';
import { getTeamLinkIcon, getTeamLinkLabel } from './TeamLinkIcons';
import styles from './Team.module.css';

const PANEL_TRANSITION = 'height 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
const DESKTOP_MQ = '(min-width: 1025px)';

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MemberCard = ({
  member,
  index,
  isOpen,
  onToggle,
}: {
  member: TeamMember;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const links = getMemberLinks(member);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen, member.bio, links.length]);

  const handleCardClick = () => {
    if (window.matchMedia(DESKTOP_MQ).matches) return;
    onToggle();
  };

  const handleToggleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (window.matchMedia(DESKTOP_MQ).matches) return;
    onToggle();
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <article
      className={`${styles.personCard}${isOpen ? ` ${styles.personCardOpen}` : ''}`}
      onClick={handleCardClick}
    >
      <button
        type="button"
        className={styles.personToggle}
        onClick={handleToggleClick}
        aria-expanded={isOpen}
        aria-controls={`team-member-panel-${index}`}
      >
        <div
          className={styles.personImageWrap}
          style={{ backgroundColor: member.imageBg }}
        >
          <img
            src={member.image}
            alt={`${member.firstName} ${member.lastName}`}
            className={styles.personImage}
          />
        </div>
        <div className={styles.personNameBlock}>
          <h3 className={styles.personName}>{member.firstName}</h3>
          <h3 className={styles.personName}>{member.lastName}</h3>
        </div>
        <ChevronIcon className={styles.personChevron} />
      </button>

      <div
        id={`team-member-panel-${index}`}
        className={styles.personPanel}
        style={{ height, transition: PANEL_TRANSITION }}
      >
        <div ref={contentRef} className={styles.personPanelInner}>
          <p className={styles.personBio}>{member.bio}</p>
          {links.length > 0 && (
            <div className={styles.personLinks}>
              {links.map((link) => {
                const Icon = getTeamLinkIcon(link.type);
                const isExternal = link.type === 'website';

                return (
                  <a
                    key={`${member.lastName}-${link.type}`}
                    href={link.href}
                    className={styles.iconCard}
                    onClick={handleLinkClick}
                    aria-label={`${getTeamLinkLabel(link.type)} ${member.firstName} ${member.lastName}`}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const Team = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.peopleSection}>
      <header className={styles.teamHeader}>
        <h2 className={styles.teamTitle}>{teamSection.title}</h2>
        <p className={styles.teamIntro}>{teamSection.intro}</p>
      </header>

      <div className={styles.teamGrid}>
        {teamSection.members.map((member, index) => (
          <MemberCard
            key={member.lastName}
            member={member}
            index={index}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
