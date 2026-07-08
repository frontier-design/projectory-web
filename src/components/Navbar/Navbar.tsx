// src/components/Navbar/Navbar.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
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

  const toggleMenu = () => {
    setMenuOpen(open => !open);
  };

  return (
    <>
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
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
          </ul>

          <div className={styles.navActions}>
            <Link to="/get-started" className={styles.ctaButton}>
              <span className={styles.ctaButtonLabel}>Get Started</span>
            </Link>
            {hasLikedProducts && (
              <button
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

        {/* Mobile toggles */}
        <div className={styles.mobileMenuWrapper}>
          {hasLikedProducts && (
            <button
              className={`${styles.slideInToggleBtnMobile} ${styles.likeButtonReveal}`}
              onClick={() => {
                setMenuOpen(false);
                setIsSlideInOpen(true);
              }}
              aria-label="Liked products"
            >
              <img
                className={styles.heartIcon}
                src={HeartIconNavSVG}
                alt=""
              />
            </button>
          )}

          <button className={styles.menuToggle} onClick={toggleMenu}>
            {menuOpen ? <FiX className={styles.menuIcon} /> : <FiMenu className={styles.menuIcon} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
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
            <Link
              to="/get-started"
              className={styles.mobileCtaButton}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.ctaButtonLabel}>Get Started</span>
            </Link>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://ca.linkedin.com/company/theprojectory"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
          </a>
          <a
            href="https://www.youtube.com/@projectorylive/playlists?app=desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/projectory.live/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram className={styles.icon} />
          </a>
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
