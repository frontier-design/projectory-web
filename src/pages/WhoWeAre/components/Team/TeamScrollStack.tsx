import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { type TeamMember } from '../../whoWeAreData';
import styles from './TeamScrollStack.module.css';

const STAGE_PAD = 20;
const GAP = 10;
const STRIP_MIN = 120;
const STRIP_MAX = 150;
const NAV_FALLBACK = 72;
const EXPAND_RADIUS = 1; // lockstep: as one opens, neighbor closes
const OPEN_BUDGET_RATIO = 0.84;
/** Share of open budget used for hero media; detail height is measured */
const OPEN_MEDIA_RATIO = 0.58;

const openMediaAt = (stageUsable: number) =>
  stageUsable * OPEN_BUDGET_RATIO * OPEN_MEDIA_RATIO;

const smootherstep = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
};

type SizeBudget = {
  stripHeight: number;
  stageUsable: number;
};

const measureNavOffset = () => {
  const nav = document.querySelector('nav');
  if (!nav) return NAV_FALLBACK;
  const h = Math.ceil(nav.getBoundingClientRect().height);
  return h > 0 ? h : NAV_FALLBACK;
};

const computeBudget = (
  count: number,
  viewportHeight: number,
  navOffset: number,
): SizeBudget => {
  const stageUsable = Math.max(240, viewportHeight - navOffset - STAGE_PAD);
  const collapsedCount = Math.max(0, count - 1);

  let stripHeight = Math.min(STRIP_MAX, Math.max(STRIP_MIN, stageUsable * 0.2));
  if (collapsedCount > 0) {
    const maxStrip = Math.max(110, (stageUsable * 0.36) / collapsedCount);
    stripHeight = Math.max(110, Math.min(stripHeight, maxStrip));
  }

  return { stripHeight, stageUsable };
};

const expandAt = (index: number, active: number, count: number) => {
  if (count <= 1) return 1;
  const distance = Math.abs(index - active);
  return smootherstep(Math.max(0, Math.min(1, 1 - distance / EXPAND_RADIUS)));
};

const cardHeightAt = (
  index: number,
  active: number,
  count: number,
  stripHeight: number,
  stageUsable: number,
  detailH: number,
) => {
  const e = expandAt(index, active, count);
  const openMedia = openMediaAt(stageUsable);
  return stripHeight + e * (openMedia - stripHeight) + e * detailH;
};

const focusCenterY = (
  active: number,
  count: number,
  stripHeight: number,
  stageUsable: number,
  detailHeights: number[],
) => {
  const heights = Array.from({ length: count }, (_, i) =>
    cardHeightAt(
      i,
      active,
      count,
      stripHeight,
      stageUsable,
      detailHeights[i] ?? 0,
    ),
  );

  const centers: number[] = [];
  let y = 0;
  for (let i = 0; i < count; i += 1) {
    centers[i] = y + heights[i] / 2;
    y += heights[i] + (i < count - 1 ? GAP : 0);
  }

  if (count <= 1) return centers[0] ?? 0;

  const i0 = Math.floor(active);
  const i1 = Math.min(count - 1, Math.ceil(active));
  const t = active - i0;
  return centers[i0] * (1 - t) + centers[i1] * t;
};

const stackOffsetY = (
  active: number,
  count: number,
  stripHeight: number,
  stageUsable: number,
  detailHeights: number[],
) => {
  const focusY = focusCenterY(
    active,
    count,
    stripHeight,
    stageUsable,
    detailHeights,
  );
  return stageUsable / 2 - focusY;
};

type ScrollCardProps = {
  member: TeamMember;
  index: number;
  count: number;
  progress: MotionValue<number>;
  stripHeight: number;
  stageUsable: number;
  onDetailHeight: (index: number, height: number) => void;
  onSelect: (index: number) => void;
};

const ScrollCard = ({
  member,
  index,
  count,
  progress,
  stripHeight,
  stageUsable,
  onDetailHeight,
  onSelect,
}: ScrollCardProps) => {
  const detailInnerRef = useRef<HTMLDivElement>(null);
  const [detailContentH, setDetailContentH] = useState(0);
  const openMedia = openMediaAt(stageUsable);

  useLayoutEffect(() => {
    const el = detailInnerRef.current;
    if (!el) return;

    const measure = () => {
      const next = el.scrollHeight;
      setDetailContentH(next);
      onDetailHeight(index, next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [member.bio, index, onDetailHeight]);

  const expand = useTransform(progress, (p) =>
    count <= 1 ? 1 : expandAt(index, p * (count - 1), count),
  );

  // Direct scrub — 1:1 with scroll, no spring lag
  const mediaHeight = useTransform(expand, [0, 1], [stripHeight, openMedia]);
  const detailHeight = useTransform(expand, [0, 1], [0, detailContentH]);
  const detailOpacity = useTransform(expand, [0, 0.35, 1], [0, 0.15, 1]);
  const titleScale = useTransform(
    mediaHeight,
    [stripHeight, Math.max(stripHeight + 1, openMedia)],
    [1, 1.28],
  );
  /** Inactive strips slightly darkened; clears as the card focuses */
  const dimOpacity = useTransform(expand, [0, 1], [0.42, 0]);
  /** Inactive images greyscale → full color on focus */
  const imageFilter = useTransform(expand, (e) => `grayscale(${1 - e})`);

  return (
    <motion.article
      className={styles.card}
      onClick={() => onSelect(index)}
      aria-label={`${member.firstName} ${member.lastName}`}
    >
      <motion.div className={styles.media} style={{ height: mediaHeight }}>
        <motion.img
          src={member.image}
          alt=""
          className={styles.image}
          style={{ backgroundColor: member.imageBg, filter: imageFilter }}
          draggable={false}
        />
        <div className={styles.overlay} aria-hidden />
        <motion.div
          className={styles.titleBlock}
          style={{ scale: titleScale, transformOrigin: 'bottom left' }}
        >
          <h3 className={styles.name}>{member.firstName}</h3>
          <h3 className={styles.name}>{member.lastName}</h3>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.detail}
        style={{ height: detailHeight, opacity: detailOpacity }}
      >
        <div ref={detailInnerRef} className={styles.detailInner}>
          <p className={styles.bio}>{member.bio}</p>
        </div>
      </motion.div>

      <motion.div
        className={styles.dim}
        style={{ opacity: dimOpacity }}
        aria-hidden
      />
    </motion.article>
  );
};

const StaticMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <article className={styles.staticCard}>
      <div
        className={styles.staticMedia}
        style={{ backgroundColor: member.imageBg }}
      >
        <img
          src={member.image}
          alt={`${member.firstName} ${member.lastName}`}
          className={styles.image}
        />
        <div className={styles.overlay} aria-hidden />
        <div className={styles.titleBlock}>
          <h3 className={styles.name}>{member.firstName}</h3>
          <h3 className={styles.name}>{member.lastName}</h3>
        </div>
      </div>
      <div className={styles.staticDetail}>
        <p className={styles.bio}>{member.bio}</p>
      </div>
    </article>
  );
};

type TeamScrollStackProps = {
  members: TeamMember[];
};

const TeamScrollStack = ({ members }: TeamScrollStackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const count = members.length;

  const [navOffset, setNavOffset] = useState(NAV_FALLBACK);
  const [budget, setBudget] = useState<SizeBudget>(() =>
    computeBudget(
      count,
      typeof window !== 'undefined' ? window.innerHeight : 700,
      NAV_FALLBACK,
    ),
  );
  const [detailHeights, setDetailHeights] = useState<number[]>(() =>
    Array.from({ length: count }, () => 0),
  );

  const onDetailHeight = useCallback((index: number, height: number) => {
    setDetailHeights((prev) => {
      if (prev[index] === height) return prev;
      const next = prev.slice();
      next[index] = height;
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    setDetailHeights((prev) =>
      prev.length === count
        ? prev
        : Array.from({ length: count }, (_, i) => prev[i] ?? 0),
    );
  }, [count]);

  useLayoutEffect(() => {
    const update = () => {
      const nextNav = measureNavOffset();
      setNavOffset(nextNav);
      setBudget(computeBudget(count, window.innerHeight, nextNav));
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [count]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const stackY = useTransform(scrollYProgress, (p) => {
    const active = count <= 1 ? 0 : p * (count - 1);
    return stackOffsetY(
      active,
      count,
      budget.stripHeight,
      budget.stageUsable,
      detailHeights,
    );
  });

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || count <= 1) return;

      const rect = track.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const trackTop = rect.top + scrollTop;
      const trackHeight = track.offsetHeight;
      const viewportHeight = window.innerHeight;
      const progress = index / (count - 1);
      const y = trackTop + progress * Math.max(0, trackHeight - viewportHeight);

      window.scrollTo({ top: y, behavior: 'smooth' });
    },
    [count],
  );

  if (reduceMotion) {
    return (
      <div className={styles.staticList}>
        {members.map((member) => (
          <StaticMemberCard key={member.lastName} member={member} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={styles.track}
      ref={trackRef}
      style={
        {
          ['--member-count' as string]: count,
          ['--nav-offset' as string]: `${navOffset}px`,
          ['--strip-h' as string]: `${budget.stripHeight}px`,
        } as CSSProperties
      }
    >
      <div className={styles.sticky}>
        <motion.div className={styles.stack} style={{ y: stackY }}>
          {members.map((member, index) => (
            <ScrollCard
              key={member.lastName}
              member={member}
              index={index}
              count={count}
              progress={scrollYProgress}
              stripHeight={budget.stripHeight}
              stageUsable={budget.stageUsable}
              onDetailHeight={onDetailHeight}
              onSelect={scrollToIndex}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamScrollStack;
