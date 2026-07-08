import Marquee from 'react-fast-marquee';
import styles from './WhoWeAre.module.css';
import '../../styles/global.css';
import imageOne from '../../assets/images/p-WhoWeAre/whoWeAreOne.avif';
import imageTwo from '../../assets/images/p-WhoWeAre/whoWeAreTwo.avif';
import imageThree from '../../assets/images/p-WhoWeAre/whoWeAreThree.avif';
import marqueeIconBottom from '../../assets/images/shapes/pMonograms/whoWeAre-pMonogram.avif';
import marqueeIconTop from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';
import TealCTASection from '../../components/CTAs/TealCTA/TealCTA';

import personOne from '../../assets/images/oren.webp';
import personTwo from '../../assets/images/jeff.webp';
import personThree from '../../assets/images/paddy.webp';

const CAROUSEL_IMAGES = [
  { src: imageOne, alt: 'Projectory team on stage at an event' },
  { src: imageTwo, alt: 'Facilitator presenting with a tablet' },
  { src: imageThree, alt: 'Attendees at a Projectory experience' },
];

const TEAM_MEMBERS = [
  {
    image: personOne,
    firstName: 'Oren',
    lastName: 'Berkovich',
    imageBg: '#2f6fd6',
    bio: 'Oren manages the client experience at Projectory. He is the founder of Bepossible, a design studio for impactful learning experiences and is the former president and CEO of Singularity University Canada.',
  },
  {
    image: personThree,
    firstName: 'Paddy',
    lastName: 'Harrington',
    imageBg: '#5a6d8f',
    bio: 'Paddy leads the experience and installation design at Projectory, with members of his design office, Frontier. He was formerly SVP Digital Innovation and Digital Creative Director at Indigo Books, and, prior to that, Executive Creative Director of Bruce Mau Design.',
  },
  {
    image: personTwo,
    firstName: 'Jeffrey',
    lastName: 'Rogers',
    imageBg: '#7b4fa8',
    bio: 'Jeff leads the facilitation and on-stage programming at Projectory. He is a partner at be Radical, an innovation and learning consultancy, and has been a futures education advisor at the Stanford Design School.',
  },
];

const WhoWeAre = () => {
  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <div className={styles.introHeadings}>
          <p className={styles.introLabel}>About Us</p>
          <h2 className={styles.introTitle}>Who We Are</h2>
        </div>
        <div className={styles.introBody}>
          <p>
            Our closets are full of event badges and lanyards. Yes, we know that there are better uses for the space, but some of us are sentimental. We’ve been to some great events.
          </p>
          <p>
            We’ve also been to some not-so-great events. Like you, we know the ones that just blast information don’t actually work – and if we’re being honest, they’re a drag to sit through.
          </p>
          <p>
            We believe that live events can be and do more. They can (and should!) be participatory experiences that drive conversation, action and learning, even after the event is over.
          </p>
        </div>
      </section>

      <div className={styles.carouselSection}>
        <section className={styles.carousel} aria-label="Who we are photo gallery">
          <Marquee
            speed={45}
            autoFill
            gradient
            className={styles.marquee}
            gradientColor="#131313"
            gradientWidth={120}
          >
            {CAROUSEL_IMAGES.map((image, index) => (
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
        <img
          src={marqueeIconBottom}
          alt=""
          className={styles.marqueeIconBottom}
          aria-hidden
          draggable={false}
        />
        <img
          src={marqueeIconTop}
          alt=""
          className={styles.marqueeIconTop}
          aria-hidden
          draggable={false}
        />
      </div>

      <section className={styles.peopleSection}>
        <header className={styles.teamHeader}>
          <h2 className={styles.teamTitle}>Meet Our Team</h2>
          <p className={styles.teamIntro}>
            We’re a team of facilitators, designers, and producers who joined forces to turn in-person meetings and conferences into engaging, memorable, and momentum-building experiences.
          </p>
        </header>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <article key={member.lastName} className={styles.personCard}>
              <div
                className={styles.personImageWrap}
                style={{ backgroundColor: member.imageBg }}
              >
                <img
                  src={member.image}
                  alt={`${member.firstName} ${member.lastName}`}
                  className={styles.personImage}
                />
              </div>
              <div className={styles.personBody}>
                <div className={styles.personNameBlock}>
                  <h3 className={styles.personFirstName}>{member.firstName}</h3>
                  <h4 className={styles.personLastName}>{member.lastName}</h4>
                </div>
                <p className={styles.personBio}>{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.ctaSection}>
        <TealCTASection
          title="Don’t know where to start?"
          description="Use this simple tool to quickly match your event with the best mix of of experiences."
          buttonText="Product Finder"
          buttonLink="/get-started-form"
        />
      </div>
    </div>
  );
};

export default WhoWeAre;
