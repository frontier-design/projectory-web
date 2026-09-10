import styles from './ProductDetails.module.css';

interface DetailsProps {
  details: {
    heading: string;
    description: string;
    features?: string[];
    headingType?: 'overview' | 'features'; // optional property
  };
  product: {
    categoryColor?: string;
    titleColor?: string; // Add this if needed
  };
}

const ProductDetails = ({ details, product }: DetailsProps) => {
  if (!details) return null;

  // Decide which label to use based on headingType
  let headingLabel = 'Features';
  if (details.headingType === 'overview') {
    headingLabel = 'Overview';
  } else if (details.headingType === 'features') {
    headingLabel = 'Features';
  }

  // If categoryColor is missing, fallback to titleColor
  const headingColor = product.categoryColor || product.titleColor || '#FFFFFF';

  return (
    <section className={styles.detailsWrapper}>
      {/* 🔹 Left Text Section */}
      <div className={styles.textContent}>
        <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: details.heading }} />
        {details.description && (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: details.description }}
          />
        )}
      </div>

      {/* 🔹 Right Features/Overview Section (Only If Features Exist) */}
      {details.features && details.features.length > 0 && (
        <div className={styles.features}>
          {/* Dynamically pick color */}
          <h3 style={{ color: headingColor }}>{headingLabel}</h3>
          <ul>
            {details.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
