import { yellowCoral as marqueeIconTop } from '@/assets/images/shapes/floaters';

const carouselImageOne =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648779/who-we-are/whoWeAreOne_kvumjk.avif';
const carouselImageTwo =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648779/who-we-are/whoWeAreTwo_s3r83i.avif';
const carouselImageThree =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648778/who-we-are/whoWeAreThree_emflfj.avif';
const marqueeIconBottom =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648778/who-we-are/whoWeAre-pMonogram_it3mqy.avif';
const personOne =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648779/who-we-are/oren_ydya3j.webp';
const personTwo =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648778/who-we-are/jeff_hsflgg.webp';
const personThree =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786648779/who-we-are/paddy_trshsw.webp';

export const heroSection = {
  eyebrow: 'About Us',
  title: 'Who We Are, Anyway?',
  videoSrc: 'https://res.cloudinary.com/dazzkestf/video/upload/v1784911599/who-we-are_bxxyva.mp4',
  /* First frame while the MP4 loads */
  posterSrc:
    'https://res.cloudinary.com/dazzkestf/video/upload/so_0,f_jpg,q_auto/v1784911599/who-we-are_bxxyva.jpg',
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
    'An event producer, an educator, and a designer with closets full of events lanyards decided it was time to help event leaders design experiences people actually want to join, not just watch..',
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
  videoSrc:
    'https://res.cloudinary.com/dazzkestf/video/upload/q_auto/v1786648620/why-did-we-start-projectory_ipw5n3.mp4',
  paragraphs: [
    'We believe that live events can be and do more. They can (and should!) be participatory experiences that drive conversation, action and learning, even after the event is over.',
  ],
};

export const ctaBanner = {
  title: 'Don’t know where to start?',
  body: 'Use this simple tool to quickly match your\nevent with the best mix of our experiences.',
  primary: { label: 'Product Finder', to: '/get-started-form' },
  secondary: { label: 'Contact Us', to: '/get-started#contact-form' },
};
