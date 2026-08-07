import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';
import HeartIconNavSVG from '../../assets/images/heartIconNav.svg';
import SlideInMenu from '../SlideInMenu/SlideInMenu';
import { useLikedProducts } from '../../context/LikedProductsContext';

const NAV_LINKS = [
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/products', label: 'Products' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/pricing', label: 'Pricing' },
] as const;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heartKey, setHeartKey] = useState(0);
  const { likedProducts } = useLikedProducts();
  const hasLikedProducts = likedProducts.length > 0;
  const prevLikedCount = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (likedProducts.length > prevLikedCount.current) {
      setHeartKey((k) => k + 1);
    }
    prevLikedCount.current = likedProducts.length;
  }, [likedProducts.length]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div
          className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`}
          onClick={closeMenu}
          aria-hidden={!menuOpen}
        />

        <div className={`${styles.navCluster} ${menuOpen ? styles.expanded : ''}`}>
          <div className={styles.navShell}>
            <div className={styles.navRow}>
              <Link to="/" className={styles.logo}>
                <img src={logo} alt="Projectory Logo" className={styles.logoImage} />
              </Link>

              <div className={styles.navEnd}>
                <div className={styles.navRight}>
                  <ul className={styles.desktopNav}>
                    {NAV_LINKS.map(({ to, label }) => (
                      <li key={to}>
                        <Link to={to}>{label}</Link>
                      </li>
                    ))}
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
                        <img className={styles.heartIcon} src={HeartIconNavSVG} alt="" />
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.navMobileTrailing}>
                  <button
                    type="button"
                    className={styles.closeToggle}
                    onClick={toggleMenu}
                    aria-label="Close menu"
                    aria-expanded={menuOpen}
                    aria-hidden={!menuOpen}
                    tabIndex={menuOpen ? undefined : -1}
                  >
                    <FiX className={styles.menuIcon} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
              <ul>
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} onClick={closeMenu}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                to="/get-started"
                className={`${styles.ctaButton} ${styles.mobileCtaButton}`}
                onClick={closeMenu}
              >
                <span className={styles.ctaButtonLabel}>Get Started</span>
              </Link>
            </div>
          </div>

          <div className={styles.navIslands}>
            {hasLikedProducts && (
              <button
                key={`mob-heart-${heartKey}`}
                type="button"
                className={`${styles.navIsland} ${styles.likeIsland} ${styles.likeButtonReveal}`}
                onClick={() => setIsSlideInOpen(true)}
                aria-label="Liked products"
                tabIndex={menuOpen ? -1 : undefined}
                aria-hidden={menuOpen}
              >
                <img className={styles.heartIcon} src={HeartIconNavSVG} alt="" />
              </button>
            )}

            <button
              type="button"
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

      <SlideInMenu isOpen={isSlideInOpen} onClose={() => setIsSlideInOpen(false)} />
    </>
  );
};

export default Navbar;
