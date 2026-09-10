import { createPortal } from 'react-dom';
import { useLikedProducts } from '@/context/LikedProductsContext';
import { getProductsByIds } from '@/lib/findProduct';
import { Link, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import styles from './SlideInMenu.module.css';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useScrollLock } from '@/hooks/useScrollLock';

interface SlideInMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const SlideInMenu = ({ onClose, isOpen }: SlideInMenuProps) => {
  const { likedProducts, toggleLike } = useLikedProducts();
  const navigate = useNavigate();

  const likedItems = getProductsByIds(likedProducts);
  const productsCount = likedItems.length;
  let headingText: string;
  if (productsCount === 1) {
    headingText =
      "You've selected 1 product. Bundling multiple products may reduce the overall cost.";
  } else if (productsCount > 1) {
    headingText = `Great! You've selected ${productsCount} products. Next, let's take this to your inbox`;
  } else {
    headingText = `You have ${productsCount} product${productsCount !== 1 ? 's' : ''} selected. Continue to get an estimate for your selected products.`;
  }

  useScrollLock(isOpen);

  useEscapeKey(onClose, isOpen);

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div
        className={`${styles.slideInMenu} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Liked products"
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close"
          tabIndex={isOpen ? undefined : -1}
        >
          <FiX />
        </button>

        <div className={styles.slideInMenuText}>
          <h2 className={styles.selectionsTitle}>{headingText}</h2>
          <button
            type="button"
            className={styles.estimateButton}
            tabIndex={isOpen ? undefined : -1}
            onClick={() => {
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
                <Link
                  to={`/products/${prod.id}`}
                  onClick={onClose}
                  tabIndex={isOpen ? undefined : -1}
                >
                  <img src={prod.thumbnail} alt={prod.name} />
                </Link>
              </div>
              <div className={styles.itemTextWrapper}>
                <Link
                  to={`/products/${prod.id}`}
                  onClick={onClose}
                  tabIndex={isOpen ? undefined : -1}
                >
                  <h4 className={styles.title} style={{ color: prod.categoryColor || '#ffffff' }}>
                    {prod.category}
                    <strong>{prod.categoryHighlight}</strong>
                  </h4>
                  <p>{prod.tagline}</p>
                </Link>
                <button
                  type="button"
                  className={styles.removeButton}
                  tabIndex={isOpen ? undefined : -1}
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

        {productsCount === 0 && <p className={styles.noItemsText}>No items selected</p>}
      </div>
    </>,
    document.body
  );
};

export default SlideInMenu;
