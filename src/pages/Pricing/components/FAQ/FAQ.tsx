import FaqAccordion from '../../../../components/FaqAccordion/FaqAccordion';
import { faqSection } from '../../pricingData';

const FAQ = () => (
  <FaqAccordion title={faqSection.title} items={faqSection.items} />
);

export default FAQ;
