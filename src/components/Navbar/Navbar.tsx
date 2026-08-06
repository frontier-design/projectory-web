// src/components/Navbar/Navbar.tsx

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';
import { FiMenu, FiX } from 'react-icons/fi';
import HeartIconNavSVG from '../../assets/images/heartIconNav.svg';

// Slide-in menu
import SlideInMenu from '../SlideInMenu/SlideInMenu';
// Liked products context
import { useLikedProducts } from '../../context/LikedProductsContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);
  const { likedProducts } = useLikedProducts();
  const hasLikedProducts = likedProducts.length > 0;
  const prevLikedCount = useRef(0);
  const [heartKey, setHeartKey] = useState(0);

  // NEW: track scroll position
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replay heart bump when another product is liked -> (extra featuer i decided to add here its good UX feedback)
  useEffect(() => {
    if (likedProducts.length > prevLikedCount.current) {
      setHeartKey((k) => k + 1);
    }
    prevLikedCount.current = likedProducts.length;
  }, [likedProducts.length]);

  const toggleMenu = () => {
    setMenuOpen(open => !open);
  };

  // Lock background scroll and enable Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div
        className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <div className={`${styles.navCluster} ${menuOpen ? styles.expanded : ''}`}>
        <div className={styles.navShell}>
          <div className={styles.navContent}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="Projectory Logo" className={styles.logoImage} />
            </Link>

            <div className={styles.navRight}>
              <ul className={styles.desktopNav}>
                <li><Link to="/who-we-are">Who We Are</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>

              <div className={styles.navActions}>
                <Link to="/get-started" className={styles.ctaButton}>
                  <span className={styles.ctaButtonLabel}>Get Started</span>
                </Link>
                {hasLikedProducts && (
                  <button
                    key={`desk-heart-${heartKey}`}
                    className={`${styles.slideInToggleBtn} ${styles.likeButtonReveal}`}
                    onClick={() => setIsSlideInOpen(true)}
                    aria-label="Liked products"
                  >
                    <img
                      className={styles.heartIcon}
                      src={HeartIconNavSVG}
                      alt=""
                    />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.navMobileTrailing}>
              {menuOpen && (
                <button
                  className={`${styles.menuToggle} ${styles.closeToggle}`}
                  onClick={toggleMenu}
                  aria-label="Close menu"
                  aria-expanded={true}
                >
                  <FiX className={styles.menuIcon} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile sheet body — list + CTA */}
          <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
            <ul>
              <li>
                <Link to="/who-we-are" onClick={() => setMenuOpen(false)}>
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/case-studies" onClick={() => setMenuOpen(false)}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={() => setMenuOpen(false)}>
                  Pricing
                </Link>
              </li>
            </ul>

            <Link
              to="/get-started"
              className={`${styles.ctaButton} ${styles.mobileCtaButton}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.ctaButtonLabel}>Get Started</span>
            </Link>
          </div>
        </div>

        <div className={styles.navIslands}>
          {hasLikedProducts && (
            <button
              key={`mob-heart-${heartKey}`}
              className={`${styles.navIsland} ${styles.likeIsland} ${styles.likeButtonReveal}`}
              onClick={() => setIsSlideInOpen(true)}
              aria-label="Liked products"
              tabIndex={menuOpen ? -1 : undefined}
              aria-hidden={menuOpen}
            >
              <img
                className={styles.heartIcon}
                src={HeartIconNavSVG}
                alt=""
              />
            </button>
          )}

          <button
            className={`${styles.navIsland} ${styles.menuToggle}`}
            onClick={toggleMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            tabIndex={menuOpen ? -1 : undefined}
            aria-hidden={menuOpen}
          >
            <FiMenu className={styles.menuIcon} />
          </button>
        </div>
      </div>
    </nav>

    <SlideInMenu
      isOpen={isSlideInOpen}
      onClose={() => setIsSlideInOpen(false)}
    />
    </>
);
}

export default Navbar;
