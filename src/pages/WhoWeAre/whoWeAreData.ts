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
  title: 'Who We Are,\nAnyway?',
  videoSrc: null as string | null, // set to Cloudinary/local URL
};

export const introSection = {
  paragraphs: [
    'Our closets are full of event badges and lanyards. Yes, we know that there are better uses for the space, but some of us are sentimental. We’ve been to some great events.',
    'We’ve also been to some not-so-great events. Like you, we know the ones that just blast information don’t actually work – and if we’re being honest, they’re a drag to sit through.',
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

export type TeamLinkType = 'email' | 'phone' | 'website';

export type TeamLink = {
  type: TeamLinkType;
  href: string;
};

export type TeamMember = {
  image: string;
  firstName: string;
  lastName: string;
  imageBg: string;
  bio: string;
  email?: string;
  phone?: string;
  website?: string;
};

export const getMemberLinks = (member: TeamMember): TeamLink[] => {
  const links: TeamLink[] = [];

  if (member.email) {
    links.push({ type: 'email', href: `mailto:${member.email}` });
  }
  if (member.phone) {
    links.push({ type: 'phone', href: `tel:${member.phone.replace(/\s/g, '')}` });
  }
  if (member.website) {
    links.push({ type: 'website', href: member.website });
  }

  return links;
};

export const teamSection = {
  title: 'Meet Our Team',
  intro:
    'We’re a team of facilitators, designers, and producers who joined forces to turn in-person meetings and conferences into engaging, memorable, and momentum-building experiences.',
  members: [
    {
      image: personOne,
      firstName: 'Oren',
      lastName: 'Berkovich',
      imageBg: '#2f6fd6',
      bio: 'Oren manages the client experience at Projectory. He is the founder of Bepossible, a design studio for impactful learning experiences and is the former president and CEO of Singularity University Canada.',
      email: 'oren@projectory.com',
      phone: '+1-000-000-0001',
      website: 'https://bepossible.com',
    },
    {
      image: personThree,
      firstName: 'Paddy',
      lastName: 'Harrington',
      imageBg: '#5a6d8f',
      bio: 'Paddy leads the experience and installation design at Projectory, with members of his design office, Frontier. He was formerly SVP Digital Innovation and Digital Creative Director at Indigo Books, and, prior to that, Executive Creative Director of Bruce Mau Design.',
      email: 'paddy@projectory.com',
      phone: '+1-000-000-0002',
      website: 'https://frontier.design',
    },
    {
      image: personTwo,
      firstName: 'Jeffrey',
      lastName: 'Rogers',
      imageBg: '#7b4fa8',
      bio: 'Jeff leads the facilitation and on-stage programming at Projectory. He is a partner at be Radical, an innovation and learning consultancy, and has been a futures education advisor at the Stanford Design School.',
      email: 'jeff@projectory.com',
      phone: '+1-000-000-0003',
      website: 'https://beradical.com',
    },
  ] satisfies TeamMember[],
};

export const ctaBanner = {
  title: 'Don’t know where to start?',
  body: 'Use this simple tool to quickly match your\nevent with the best mix of our experiences.',
  primary: { label: 'Product Finder', to: '/get-started-form' },
  secondary: { label: 'Contact Us', to: '/get-started#contact-form' },
};
