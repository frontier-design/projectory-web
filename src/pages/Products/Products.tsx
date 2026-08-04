import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { products as allProducts } from '../ProductPages/productsData';
import ProductCard from '../../components/ProductCard/ProductCard';
import FeaturedCarousel from '../../components/FeaturedCarousel/FeaturedCarousel';
import TealCTASection from '../../components/CTAs/TealCTA/TealCTA';
import GridCTA from '../../components/GridCTA/GridCTA';
import FeaturedCaseStudy from '../../components/FeaturedCaseStudy/FeaturedCaseStudy';
import LandingHero from '../../components/LandingHero/LandingHero';
import styles from './Products.module.css';

const TAGS = [
  'All Products',
  'Networking',
  'Peer learning',
  'Explore priorities',
  'Ideas to action',
  'Reflect & synthesize',
  'Build alignment',
  'Inspire creativity',
  'Visualize insights',
];

const TAG_INFO: Record<string, { heading: string; description: string }> = {
  'All Products': {
    heading: 'All Products',
    description:
      'Explore everything or filter by objective to find products designed with your goals in mind.',
  },
  'Networking': {
    heading: 'Networking',
    description:
      'Create meaningful opportunities for participants to build relationships, exchange ideas, and grow professional networks that extend beyond the event.',
  },
  'Peer learning': {
    heading: 'Peer Learning',
    description:
      'Encourage open, insightful conversations among peers to share experiences, deepen understanding, and elevate collective expertise.',
  },
  'Explore priorities': {
    heading: 'Explore Priorities',
    description:
      'Guide participants through focused discussions that surface key challenges, consider multiple perspectives, and clarify decision-making around strategic goals',
  },
  'Ideas to action': {
    heading: 'Ideas to Action',
    description:
      'Translate insights and inspiration into tangible next steps by helping participants co-create actionable plans they can implement immediately.',
  },
  'Reflect & synthesize': {
    heading: 'Reflect & Synthesize',
    description:
      'Encourage participants to pause, integrate insights, and identify key takeaways that reinforce learning and support overall program objectives.',
  },
  'Build alignment': {
    heading: 'Build Alignment',
    description:
      'Engage participants in collaborative processes that surface diverse viewpoints while building shared vision, commitment, and momentum.',
  },
  'Inspire creativity': {
    heading: 'Inspire Creativity',
    description:
      'Spark new ideas and bold questions through engaging experiences that challenge assumptions and encourage innovative approaches to future challenges.',
  },
  'Visualize insights': {
    heading: 'Visualize Insights',
    description:
      'Create collaborative, tactile data visualizations that capture participant contributions while crystallizing key themes and building shared understanding.',
  },
};

// Helper function to group products into rows according to a pattern.
type ProductItem = { id: string; type?: 'cta'; [key: string]: unknown };
const groupItems = (items: ProductItem[]) => {
  const groups: ProductItem[][] = [];
  let i = 0;
  // Adjust pattern as desired; here we cycle through 3, 3, 2 items per row.
  const pattern = [3, 3, 2];
  let patternIndex = 0;
  while (i < items.length) {
    const count = pattern[patternIndex];
    groups.push(items.slice(i, i + count));
    i += count;
    patternIndex = (patternIndex + 1) % pattern.length;
  }
  // Merge the last group if it contains only one item.
  if (groups.length > 1 && groups[groups.length - 1].length === 1) {
    const lastGroup = groups.pop();
    const prevGroup = groups.pop();
    if (lastGroup && prevGroup) {
      const mergedGroup = prevGroup.concat(lastGroup);
      if (mergedGroup.length === 4) {
        groups.push(mergedGroup.slice(0, 2));
        groups.push(mergedGroup.slice(2));
      } else {
        groups.push(mergedGroup);
      }
    }
  }
  // Special case: if exactly 3 items, group them in one row.
  if (items.length === 3) {
    return [items];
  }
  return groups;
};

const Products = () => {
  const [filteredProducts] = useState(allProducts);
  const [searchParams] = useSearchParams();
  const paramTag = searchParams.get('tag') || 'All Products';
  // Case-insensitive match against TAGS
  const matchedTag = TAGS.find(t => t.toLowerCase() === paramTag.toLowerCase());
  const initialTag = matchedTag || 'All Products';
  const [selectedTag, setSelectedTag] = useState(initialTag);

  // Refs for tag bar centering on mobile
  const tagBarRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const handleTagClick = (tag: string, idx: number) => {
    setSelectedTag(tag);
    // Center the clicked tab in the scrollable bar on mobile
    const container = tagBarRef.current;
    const btn = tagRefs.current[idx];
    if (container && btn) {
      const offset = btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // When the query param changes via Link navigation, update selectedTag
    setSelectedTag(initialTag);
  }, [initialTag]);

  // Ref for the tag content container
  const tagContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();



  useEffect(() => {
    if (selectedTag !== 'All Products') {
      tagContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTag]);

  // On initial mount, if arriving with a non-default tag, scroll down
  useEffect(() => {
    if (initialTag !== 'All Products') {
      tagContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [initialTag]); 

  useEffect(() => {
    if (location.hash === '#tagContent') {
      tagContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const displayedProducts =
    selectedTag === 'All Products'
      ? filteredProducts
      : filteredProducts.filter((prod) => prod.tags?.includes(selectedTag));

  // Combine displayed products with a CTA item.
  const items: ProductItem[] = [...displayedProducts, { id: 'cta', type: 'cta' }];

  // Group items into rows.
  const groupedItems =
    items.length === 4 ? [items.slice(0, 2), items.slice(2, 4)] : groupItems(items);

  return (
    <div className={styles.productPage}>
      <LandingHero
        pill="Products"
        title={"Make Your Event\nUnmissable"}
        description="Projectory transforms half-listening event attendees into an engaged cohort of active, connected participants."
        buttonLabel="Explore Products"
        onButtonClick={() => tagContentRef.current?.scrollIntoView({ behavior: 'smooth' })}
        // Small hack!!: Products copy wraps awkwardly at the shared hero description max-width.
        wideDescription
      />

      <FeaturedCarousel />

      <div className={styles.productGridWrapper}>
        <div id="tagContent" ref={tagContentRef} className={styles.tagContent}>
          <h2 className={styles.tagBarHeading}>
            {TAG_INFO[selectedTag]?.heading || 'All Products'}
          </h2>
          <p className={styles.tagBarSubheading}>
            {TAG_INFO[selectedTag]?.description || 'Select a category below to refine your search.'}
          </p>
        </div>

        <div className={styles.tagBarWrapper}>
          <div className={styles.tagBar} ref={tagBarRef}>
            {TAGS.map((tag, idx) => {
              const href =
                tag === 'All Products'
                  ? '/products#tagContent'
                  : `/products?tag=${encodeURIComponent(tag)}#tagContent`;
              return (
                <Link
                  key={tag}
                  to={href}
                  ref={el => (tagRefs.current[idx] = el)}
                  onClick={() => handleTagClick(tag, idx)}
                  className={tag === selectedTag ? styles.activeTag : styles.tagButton}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>

        <div className={styles.productsGrid}>
          {groupedItems.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={styles.row}
              style={{ gridTemplateColumns: `repeat(${group.length}, 1fr)` }}
            >
              {group.map((item) => {
                if ('type' in item && item.type === 'cta') {
                  return <GridCTA key="cta" />;
                }
                // Type assertion: we know this is a product at this point
                const product = item as { id: string; name: string; category: string; categoryHighlight?: string | null; categoryColor?: string; thumbnail: string; bgVideo?: string; tags?: string[] };
                return <ProductCard key={item.id} product={product} />;
              })}
            </div>
          ))}
        </div>
      </div>

      <TealCTASection
        title="Don’t know where to start?"
        description="Use this simple tool to quickly match your event with the best mix of of experiences."
        buttonText="Product Finder"
        buttonLink="/get-started-form"
      />

      <FeaturedCaseStudy />
    </div>
  );
};

export default Products;