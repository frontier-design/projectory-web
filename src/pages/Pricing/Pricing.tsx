import styles from './Pricing.module.css';
import PricingHero from './components/PricingHero/PricingHero';
import DeliveryOptions from './components/DeliveryOptions/DeliveryOptions';
import WhitelabelCTA from './components/WhitelabelCTA/WhitelabelCTA';
import CaseStudies from './components/CaseStudies/CaseStudies';
import CatalogueCTA from './components/CatalogueCTA/CatalogueCTA';
import FAQ from './components/FAQ/FAQ';
import { usePageEntrance } from '@/hooks/usePageEntrance';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { pageMeta } from '@/config/seo';

const Pricing = () => {
  useDocumentMeta(pageMeta.pricing);

  const entrance = usePageEntrance('pricing');

  return (
    <div className={styles.pricingPage}>
      <div className={styles.container}>
        <PricingHero entrance={entrance} />
        <DeliveryOptions entrance={entrance} />
        <CatalogueCTA />
        <CaseStudies />
        <WhitelabelCTA />
        <FAQ />
      </div>
    </div>
  );
};

export default Pricing;
