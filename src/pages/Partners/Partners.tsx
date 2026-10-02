import { useState } from 'react';
import styles from './Partners.module.css';
import PartnersHero from './components/PartnersHero/PartnersHero';
import PartnerPrograms from './components/PartnerPrograms/PartnerPrograms';
import ApplyFormOverlay from './components/ApplyFormOverlay/ApplyFormOverlay';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import CyclingCards from '@/components/sections/CyclingCards/CyclingCards';
import LogoGrid from '@/components/sections/LogoGrid/LogoGrid';
import TestimonialFeature from '@/components/sections/TestimonialFeature/TestimonialFeature';
import {
  bannerProgram,
  ctaBanner,
  goodCompany,
  sectionIds,
  testimonial,
  whyPartner,
  type ApplyProgram,
} from './partnersData';
import { usePageEntrance } from '@/hooks/usePageEntrance';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { pageMeta } from '@/config/seo';

const Partners = () => {
  useDocumentMeta(pageMeta.partners);

  const entrance = usePageEntrance('partners');
  // The program cards and the banner's "Hold the Dates" open the same enquiry overlay.
  const [program, setProgram] = useState<ApplyProgram | null>(null);
  const { primaryLabel, ...banner } = ctaBanner;

  return (
    <div className={styles.partnersPage}>
      <PartnersHero entrance={entrance} />
      <div className={styles.container}>
        <PartnerPrograms onSelect={setProgram} />
        <CyclingCards {...whyPartner} />
        <LogoGrid {...goodCompany} />
        <TestimonialFeature {...testimonial} />
      </div>
      <CtaBanner
        variant="lime"
        id={sectionIds.registerDeal}
        {...banner}
        primary={{ label: primaryLabel, onClick: () => setProgram(bannerProgram.program) }}
      />

      <ApplyFormOverlay program={program} onClose={() => setProgram(null)} />
    </div>
  );
};

export default Partners;
