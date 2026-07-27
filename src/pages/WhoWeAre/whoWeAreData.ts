import carouselImageOne from './assets/whoWeAreOne.avif';
import carouselImageTwo from './assets/whoWeAreTwo.avif';
import carouselImageThree from './assets/whoWeAreThree.avif';
import marqueeIconBottom from './assets/whoWeAre-pMonogram.avif';
import marqueeIconTop from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';
import personOne from './assets/oren.webp';
import personTwo from './assets/jeff.webp';
import personThree from './assets/paddy.webp';

export const heroSection = {
  eyebrow: 'About Us',
  title: 'Who We Are, Anyway?',
  videoSrc:
    'https://res.cloudinary.com/dazzkestf/video/upload/v1784911599/who-we-are_bxxyva.mp4',
};

export const introSection = {
  paragraphs: [
    'We’re a team of facilitators, designers, and producers who joined forces to turn in-person meetings and conferences into engaging, memorable, and momentum-building experiences.',
  ],
};

export const carouselImages = [
  { src: carouselImageOne, alt: 'Projectory team on stage at an event' },
  { src: carouselImageTwo, alt: 'Facilitator presenting with a tablet' },
  { src: carouselImageThree, alt: 'Attendees at a Projectory experience' },
];

export const carouselIcons = {
  bottom: marqueeIconBottom,
  top: marqueeIconTop,
};

export type TeamMember = {
  image: string;
  firstName: string;
  lastName: string;
  imageBg: string;
  bio: string;
};

export const teamSection = {
  title: 'Meet Our Founders',
  intro:
    'We’re a team of facilitators, designers, and producers who joined forces to turn in-person meetings and conferences into engaging, memorable, and momentum-building experiences.',
  members: [
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
      bio: 'Paddy leads the experience and installation design at Projectory with his team at Frontier. He’s formerly SVP Innovation and Digital Creative Director at Indigo Books and, prior, Executive Creative Director of Bruce Mau Design.',
    },
    {
      image: personTwo,
      firstName: 'Jeffrey',
      lastName: 'Rogers',
      imageBg: '#7b4fa8',
      bio: 'Jeff leads the facilitation and on-stage programming at Projectory. He is a partner at be Radical, an innovation and learning consultancy, and has been a futures education advisor at the Stanford Design School.',
    },
  ] satisfies TeamMember[],
};

export const whyWeStartedSection = {
  title: 'Why We Started\nProjectory',
  videoSrc: '/videos/why-did-we-start-projectory.mp4',
  paragraphs: [
    'We believe that live events can be and do more.',
    'They can (and should!) be participatory experiences that drive conversation, action and learning, even after the event is over.',
  ],
};

export const ctaBanner = {
  title: 'Don’t know where to start?',
  body: 'Use this simple tool to quickly match your\nevent with the best mix of our experiences.',
  primary: { label: 'Product Finder', to: '/get-started-form' },
  secondary: { label: 'Contact Us', to: '/get-started#contact-form' },
};
