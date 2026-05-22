import React from 'react';
import { useLikedProducts } from '../../context/LikedProductsContext';
import { products } from '../../pages/ProductPages/productsData';
import { Link, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import styles from './SlideInMenu.module.css';

interface SlideInMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const SlideInMenu: React.FC<SlideInMenuProps> = ({ onClose, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  const { likedProducts, toggleLike } = useLikedProducts();
  const likedItems = products.filter((p) => likedProducts.includes(p.id));
  const productsCount = likedItems.length;
  let headingText: string;
  if (productsCount === 1) {
    headingText = "You’ve selected 1 product. Bundling multiple products may reduce the overall cost.";
  } else if (productsCount > 1) {
    headingText = `Great! You’ve selected ${productsCount} products. Next, let’s take this to your inbox`;
  } else {
    headingText = `You have ${productsCount} product${productsCount !== 1 ? 's' : ''} selected. Continue to get an estimate for your selected products.`;
  }

  const navigate = useNavigate();

  return (
    <div className={styles.slideInMenu}>
      <button onClick={onClose} className={styles.closeButton}>
        <FiX />
      </button>

      <div className={styles.slideInMenuText}>
        <h2 className={styles.selectionsTitle}>{headingText}</h2>
        <button
          className={styles.estimateButton}
          onClick={() => {
            // Navigate to the get an estimate page and close the slide-in menu.
            navigate('/get-estimate');
            onClose();
          }}
        >
          Get an Estimate
        </button>
      </div>

      {likedItems.map((prod) => (
        <div key={prod.id} className={styles.likedItem}>
          <div className={styles.itemWrapper}>
            <div className={styles.itemImageWrapper}>
              <Link to={`/products/${prod.id}`} onClick={onClose}>
                <img src={prod.thumbnail} alt={prod.name} />
              </Link>
            </div>
            <div className={styles.itemTextWrapper}>
              <Link to={`/products/${prod.id}`} onClick={onClose}>
                <h4
                  className={styles.title}
                  style={{ color: prod.categoryColor || '#ffffff' }}
                >
                  {prod.category}<strong>{prod.categoryHighlight}</strong>
                </h4>
                <p>{prod.tagline}</p>
              </Link>
              <button
                className={styles.removeButton}
                onClick={() => {
                  toggleLike(prod.id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {productsCount === 0 && (
        <p className={styles.noItemsText}>No items selected</p>
      )}
    </div>
  );
};

export default SlideInMenu;