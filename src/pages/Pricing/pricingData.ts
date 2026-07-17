import caseImg1 from './assets/leadership-summit.webp';
import caseImg2 from './assets/PCMA-2024-CEMA-Summit.png';
import caseImg3 from './assets/Deloitte-Connect-2024.png';
import whitelabelImg from './assets/projectory-CIBC-img.webp';

export const pricingHero = {
  title: 'Every Product.\nOne Price.',
  subtitle: "You decide how it's delivered.\nWe'll make it work either way.",
};

export const deliveryOptions = [
  {
    eyebrow: 'Rental',
    title: 'Do It Yourself',
    subtitle: 'The product ships to you. Everything you need to run it arrives with it',
    features: [
      'Complete product kit, pre-configured and ready to run',
      'Your content and branding integrated before it leaves us',
      'Step-by-step facilitation guide \u2014 written for non-facilitators',
      'Explainer video walkthrough for your team',
      'A dedicated contact from booking through debrief',
      'End-to-end logistics coordinated by our team',
    ],
    cta: {
      title: '$10,000',
      currency: 'USD',
      caption: 'per product \u00b7 per rental',
      button: { label: 'Explore Products', to: '/products' },
    },
    background:
      'linear-gradient(145deg, rgba(255, 74, 120, 0.00) 33.85%, rgba(243, 118, 85, 0.43) 80.43%), #1C1C1C',
  },
  {
    eyebrow: 'Optional add-ons',
    title: 'Bring Us In',
    subtitle: 'Your event, run by our team — start to finish.',
    features: [
      'Certified Projectory facilitator assigned to your event',
      'Onsite crew for setup, operation, and teardown',
      'Your content and theming integrated before we arrive',
      'Projectory as your event emcee',
      'White-label branding across all materials',
      'Interactive post-event report delivered to leadership',
    ],
    cta: {
      title: 'Rental fee\n+ services',
      button: { label: 'Get an Estimate', to: '/get-estimate' },
    },
    background:
      'linear-gradient(145deg, rgba(43, 220, 183, 0.00) 33.85%, rgba(43, 220, 183, 0.35) 80.43%), #1C1C1C',
  },
];

export const whitelabelCta = {
  eyebrow: 'Make it Look and Feel Like Your Brand',
  title: "We\u2019ll add your logo\nat no extra cost",
  body: 'Ask us about white-labeling \u2014 custom colours, brand identity, and fully branded facilitation materials across everything we deliver.',
  button: { label: 'Contact Us', to: '/get-started' },
  image: whitelabelImg,
};

export const caseStudies = [
  {
    image: caseImg1,
    name: 'Sales\nKickoff',
    heading: 'Internal team, fully\nsupported on-site',
    description:
      'A Fortune 500 financial company rented two products for their annual SKO. Their internal leaders ran both sessions using our facilitation guides and remote support.',
    tags: ['One Day Event', '300 participants', 'DIY delivery'],
    price: '$22,000',
    currency: 'USD',
  },
  {
    image: caseImg2,
    name: 'Leadership\nSummit',
    heading: 'Full-service,\nrun by our team',
    description:
      'A senior leadership summit where our facilitators designed and delivered the full program end to end, integrating client content and branding throughout.',
    tags: ['Multi-Day Event', '400 participants', 'Bring Us In'],
    price: '$120,000',
    currency: 'USD',
  },
  {
    image: caseImg3,
    name: 'Industry\nConference',
    heading: 'Interactive\ninstallations at scale',
    description:
      'A multi-day industry conference featuring two interactive installations with event extensions, coordinated and shipped for the client team to run.',
    tags: ['Multi-Day Event', '300 participants', 'DIY delivery'],
    price: '$35,000',
    currency: 'USD',
  },
];

export const catalogueCta = {
  body: 'Tell Us what you are trying to solve and we\u2019ll get to work',
  button: { label: 'Contact Us', to: '/get-started' },
};

export const faqSection = {
  title: 'Frequently asked\nquestions',
  items: [
    {
      question: 'What is included in the $10,000 price?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    },
    {
      question: 'Does pricing include travel and accommodation?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud.',
    },
    {
      question: 'Can we white-label the experience?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.',
    },
    {
      question: 'How far in advance should we book?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.',
    },
    {
      question: 'What delivery options are available?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit.',
    },
  ],
};
