import Marquee from 'react-fast-marquee';
import { carouselIcons, carouselImages } from '../../whoWeAreData';
import styles from './ImageCarousel.module.css';

const ImageCarousel = () => {
  return (
    <div className={styles.carouselSection}>
      <section className={styles.carousel} aria-label="Who we are photo gallery">
        <Marquee
          speed={45}
          autoFill
          gradient={false}
          className={styles.marquee}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className={styles.marqueeSlide}>
              <img
                src={image.src}
                alt={image.alt}
                className={styles.marqueeImage}
                draggable={false}
              />
            </div>
          ))}
        </Marquee>
      </section>
      <div className={styles.edgeOverlay} aria-hidden />
      <img
        src={carouselIcons.bottom}
        alt=""
        className={styles.marqueeIconBottom}
        aria-hidden
        draggable={false}
      />
      <img
        src={carouselIcons.top}
        alt=""
        className={styles.marqueeIconTop}
        aria-hidden
        draggable={false}
      />
    </div>
  );
};

export default ImageCarousel;
