import { useParams } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudies';
import styles from './CaseStudyPage.module.css';
import ProductHero, {
  type ProductHeroProduct,
} from '@/components/sections/ProductHero/ProductHero';
import ProductDetails from '@/components/sections/ProductDetails/ProductDetails';
import TestimonialSizzle from '@/components/TestimonialSizzle/TestimonialSizzle';
import HowWeBuilt from './components/HowWeBuilt/HowWeBuilt';
import TealCTASection from '@/components/TealCTA/TealCTA';
import DataFeature from '@/components/sections/DataFeature/DataFeature';
import FinalCTA from '@/components/sections/FinalCTA/FinalCTA';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { DEFAULT_DESCRIPTION } from '@/config/seo';

const CaseStudyPage = () => {
  const { id } = useParams();
  const caseStudy = caseStudiesData.find((study) => study.id === id);

  useDocumentMeta({
    title: caseStudy?.name,
    description: caseStudy?.tagline || DEFAULT_DESCRIPTION,
  });

  if (!caseStudy) {
    return <h2>Case Study Not Found</h2>;
  }

  return (
    <div className={styles.container}>
      {caseStudy.sections.map((section, index) => {
        if (section.type === 'hero') {
          // Map caseStudy to ProductHero format, using titleColor as categoryColor fallback
          const productForHero: ProductHeroProduct = {
            id: caseStudy.id,
            heroVideo: caseStudy.heroVideo,
            category: caseStudy.category,
            categoryColor:
              'categoryColor' in caseStudy && caseStudy.categoryColor
                ? (caseStudy.categoryColor as string)
                : caseStudy.titleColor || '#FFFFFF',
            categoryHighlight: (caseStudy.categoryHighlight || '') as string,
            tagline: caseStudy.tagline,
            tags: caseStudy.tags && Array.isArray(caseStudy.tags) ? caseStudy.tags : undefined,
            clientLogo: caseStudy.clientLogo,
          };
          return <ProductHero key={index} product={productForHero} />;
        }
        if (section.type === 'details') {
          if (!section.content) return null;
          const detailsContent = {
            heading: 'heading' in section.content ? (section.content.heading as string) : '',
            description:
              'description' in section.content && section.content.description
                ? (section.content.description as string)
                : '',
            features:
              'features' in section.content ? (section.content.features as string[]) : undefined,
            headingType:
              'headingType' in section.content &&
              (section.content.headingType === 'features' ||
                section.content.headingType === 'overview')
                ? (section.content.headingType as 'features' | 'overview')
                : undefined,
          };
          return <ProductDetails key={index} product={caseStudy} details={detailsContent} />;
        }

        if (section.type === 'image') {
          if (!section.content || !('imageUrl' in section.content)) return null;
          return (
            <img
              key={index}
              src={section.content.imageUrl as string}
              alt=""
              className={styles.fullPageImage}
            />
          );
        }

        if (section.type === 'imageGrid') {
          if (
            !section.content ||
            !('imageLeft' in section.content) ||
            !('imageRight' in section.content)
          )
            return null;
          return (
            <div className={styles.imageGrid} key={index}>
              <img src={section.content.imageLeft as string} alt="" className={styles.imageLeft} />
              <img
                src={section.content.imageRight as string}
                alt=""
                className={styles.imageRight}
              />
            </div>
          );
        }

        if (section.type === 'testimonialSizzle') {
          if (!section.content) return null;
          const testimonialContent = section.content as {
            videoSrc?: string | null;
            quote?: string | null;
            author?: string | null;
            role?: string | null;
          };
          return <TestimonialSizzle key={index} {...testimonialContent} />;
        }

        if (section.type === 'how-we-built') {
          if (
            !section.content ||
            !('installations' in section.content) ||
            !section.content.installations
          )
            return null;
          return (
            <HowWeBuilt
              key={index}
              installations={
                section.content.installations as Array<{
                  name: string;
                  color: string;
                  image: string;
                  description: string;
                  link: string;
                }>
              }
            />
          );
        }

        if (section.type === 'tealCTA') {
          return (
            <TealCTASection
              key={index}
              title="Have an event coming up?"
              description="Get in touch to see how Projectory can help bring your event to life!"
              buttonText="Contact Us →"
              buttonLink="/build-your-program"
            />
          );
        }

        if (section.type === 'dataFeature') {
          if (!section.content) return null;
          const dataFeatureContent = section.content as {
            title?: string;
            description?: string;
            imageUrl?: string;
          };
          if (
            !dataFeatureContent.title ||
            !dataFeatureContent.description ||
            !dataFeatureContent.imageUrl
          ) {
            return null;
          }
          return (
            <DataFeature
              key={index}
              title={dataFeatureContent.title}
              description={dataFeatureContent.description}
              imageUrl={dataFeatureContent.imageUrl}
            />
          );
        }

        return null;
      })}
      <FinalCTA experienceText="Case Studies" experienceLink="/case-studies" />
    </div>
  );
};

export default CaseStudyPage;
