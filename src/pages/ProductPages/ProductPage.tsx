import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { products } from './productsData';

import ProductHero from './components/ProductHero/ProductHero';
import ProductDetails from './components/ProductDetails/ProductDetails';
import QuickFacts from './components/QuickFacts/QuickFacts';
import Objectives from './components/Objectives/Objectives';
import VideoFeature from './components/VideoFeature/VideoFeature';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import PricingInformation from './components/PricingInformation/PricingInformation';
import CaseStudyHighlight from './components/CaseStudyHighlight/CaseStudyHighlight';
import FinalCTA from './components/FinalCTA/FinalCTA';
import HowItWorks from './components/HowItWorks/HowItWorks';
import DataFeature from './components/DataFeature/DataFeature';

import { useLikedProducts } from '../../context/LikedProductsContext';
import HeartIconSVG from '../../assets/images/heartIcon.svg';
import HeartIconSVG_Outline from '../../assets/images/heartIcon_outline.svg';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const { likedProducts, toggleLike } = useLikedProducts();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  });

  const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleCarouselClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width / 2) {
        goPrev();
      } else {
        goNext();
      }
    },
    [goPrev, goNext],
  );

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const isLiked = likedProducts.includes(product.id);
  const firstImageSectionIndex = product.sections.findIndex(
    (section) => section.type === 'image'
  );

  return (
    <div className={styles.productPage}>
      {product.sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <ProductHero key={index} product={product} />;
          case 'details': {
            if (!section.content) return null;
            const detailsContent = {
              heading: ('heading' in section.content) ? (section.content.heading as string) : '',
              description: ('description' in section.content && section.content.description)
                ? (section.content.description as string)
                : '',
              features: ('features' in section.content) ? (section.content.features as string[]) : undefined,
              headingType: ('headingType' in section.content && 
                (section.content.headingType === 'features' || section.content.headingType === 'overview'))
                ? section.content.headingType as 'features' | 'overview'
                : undefined,
            };
            return (
              <ProductDetails
                key={index}
                product={product}
                details={detailsContent}
              />
            );
          }
          case 'image': {
            if (!section.content || !section.content.imageUrl) return null;
            const isPrimaryImage = index === firstImageSectionIndex;

            if (isPrimaryImage) {
              const baseImages: string[] =
                (section.content.imageUrls as string[] | undefined) ||
                [section.content.imageUrl as string];
              const minSlides = Math.ceil(4 / baseImages.length);
              const images: string[] = [];
              for (let r = 0; r < minSlides; r++) {
                images.push(...baseImages);
              }

              return (
                <div key={index} className={styles.carousel} onClick={handleCarouselClick}>
                  <div className={styles.carouselCursorLeft} />
                  <div className={styles.carouselCursorRight} />

                  <div className={styles.carouselViewport} ref={emblaRef}>
                    <div className={styles.carouselTrack}>
                      {images.map((imgUrl, i) => (
                        <div key={i} className={styles.carouselSlide}>
                          <img
                            src={imgUrl}
                            alt=""
                            className={styles.carouselImage}
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const url = section.content.imageUrl;
            return (
              <div key={index}>
                <img
                  src={url}
                  alt=""
                  className={styles.fullPageImage}
                  loading="lazy"
                />
              </div>
            );
          }
          case 'grid':
            if (!section.content || !section.content.items) return null;
            return <QuickFacts key={index} items={section.content.items} />;
          case 'objectives':
            if (!section.content) return null;
            return (
              <Objectives
                key={index}
                title={section.content.title || ''}
                titleColor={section.content.titleColor || ''}
                imageUrl={section.content.imageUrl || ''}
                objectives={section.content.objectives || []}
              />
            );
          case 'video': {
            if (!section.content || !('videoUrl' in section.content)) return null;
            const videoContent = section.content as {
              videoUrl?: string;
              title?: string;
              description?: string;
            };
            return (
              <VideoFeature
                key={index}
                videoUrl={videoContent.videoUrl || ''}
                title={videoContent.title || ''}
                description={videoContent.description || ''}
              />
            );
          }
          case 'testimonialSizzle': {
            if (!section.content) return null;
            const testimonialContent = section.content as {
              videoSrc?: string | null;
              quote?: string | null;
              author?: string | null;
              role?: string | null;
            };
            return <TestimonialSizzle key={index} {...testimonialContent} />;
          }
          case 'pricing': {
            if (!section.content || !('plans' in section.content) || !section.content.plans) return null;
            // Ensure each plan has buttonText (required by PricingCard interface)
            const plansWithButtonText = (section.content.plans as Array<{
              title: string;
              price: string;
              description: string;
              features: string[];
              buttonText?: string;
            }>).map(plan => ({
              ...plan,
              buttonText: plan.buttonText || 'Learn More',
            }));
            return (
              <PricingInformation
                key={index}
                pricing={plansWithButtonText}
              />
            );
          }
          case 'case-study': {
            if (!section.content) return null;
            // Ensure all required props exist for CaseStudyHighlight
            const caseStudyContent = section.content as {
              title?: string;
              description?: string;
              buttonText?: string;
              buttonLink?: string;
              caseStudyTitle?: string;
              caseStudySubtitle?: string;
              caseStudyImage?: string;
            };
            if (!caseStudyContent.title || !caseStudyContent.description || 
                !caseStudyContent.buttonText || !caseStudyContent.buttonLink ||
                !caseStudyContent.caseStudyTitle || !caseStudyContent.caseStudySubtitle ||
                !caseStudyContent.caseStudyImage) {
              return null;
            }
            // Create properly typed object with all required fields (non-null assertion is safe due to checks above)
            const validCaseStudyContent = {
              title: caseStudyContent.title!,
              description: caseStudyContent.description!,
              buttonText: caseStudyContent.buttonText!,
              buttonLink: caseStudyContent.buttonLink!,
              caseStudyTitle: caseStudyContent.caseStudyTitle!,
              caseStudySubtitle: caseStudyContent.caseStudySubtitle!,
              caseStudyImage: caseStudyContent.caseStudyImage!,
            };
            return <CaseStudyHighlight key={index} {...validCaseStudyContent} />;
          }
          case 'dataFeature':
            if (!section.content) return null;
            return (
              <DataFeature
                key={index}
                title={section.content.title || ''}
                description={section.content.description || ''}
                imageUrl={section.content.imageUrl || ''}
              />
            );
          case 'how-it-works':
            if (!section.content) return null;
            return (
              <HowItWorks
                key={index}
                title={section.content.title || ''}
                description={section.content.description || ''}
                imageUrl={section.content.imageUrl || ''}
              />
            );
          default:
            return null;
        }
      })}

      <FinalCTA experienceText="Products" experienceLink="/products" />

      <div className={styles.floatingLikeButton}>
        <button
          onClick={() => toggleLike(product.id)}
          className={styles.likeButton}
        >
          <img
            src={isLiked ? HeartIconSVG : HeartIconSVG_Outline}
            alt="Like/Unlike Product"
          />
        </button>

      <div className={styles.floatingText}>
        Like this product? <br />
        Click the heart to save it for later!
      </div>
      </div>
    </div>
  );
};

export default ProductPage;