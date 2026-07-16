import caseImg1 from '../../assets/images/p-WhoWeAre/whoWeAreOne.avif';
import caseImg2 from '../../assets/images/p-WhoWeAre/whoWeAreTwo.avif';
import caseImg3 from '../../assets/images/p-WhoWeAre/whoWeAreThree.avif';

export const pricingHero = {
  price: '$10,000',
  currency: 'USD',
  subtitle: 'Every Product. One Price.\nYou choose how it is delivered.',
  primaryButton: { label: 'Product Finder', to: '/get-started-form' },
  secondaryButton: { label: 'Explore Products', to: '/products' },
};

export const deliveryOptions = [
  {
    title: 'Bring Us In',
    subtitle: 'Your event, run by our team — start to finish.',
    features: [
      'Certified Projectory facilitator from our network, assigned to your event',
      'Onsite crew for setup, operation, teardown',
      'Your content and theming integrated before we arrive',
      'End-to-end logistics coordinated by our team',
      'A dedicated contact from booking through debrief',
    ],
    note: 'Pricing does not include travel and accommodation for onsite team members.',
    background:
      'linear-gradient(145deg, rgba(255, 74, 120, 0.00) 33.85%, rgba(243, 118, 85, 0.43) 80.43%), #1C1C1C',
  },
  {
    title: 'Do It Yourself',
    subtitle: 'The product ships to you. Everything you need to run it arrives with it',
    features: [
      'Complete product kit, pre-configured and ready to run',
      'Your content and branding integrated before it leaves us',
      'Step-by-step facilitation guide \u2014 written for non-facilitators',
      'Explainer video walkthrough for your team',
      'Remote support available on event day',
      'Shipment coordination both ways',
    ],
    note: 'Shipping is not included and varies by product \u2014 some products don\'t require it. Printing costs may apply. Both confirmed at the quote stage.',
    background:
      'linear-gradient(145deg, rgba(43, 220, 183, 0.00) 33.85%, rgba(43, 220, 183, 0.35) 80.43%), #1C1C1C',
  },
];

export const whitelabelCta = {
  eyebrow: 'Make it Look and Feel Like Your Brand',
  title: "We\u2019ll add your logo\nat no extra cost",
  body: 'Ask us about white-labeling \u2014 custom colours, brand identity, and fully branded facilitation materials across everything we deliver.',
  button: { label: 'Contact Us', to: '/get-started' },
  image: '',
};

export const caseStudies = [
  {
    eyebrow: 'Real Projects (1)',
    image: caseImg1,
    name: 'Sales\nKickoff',
    heading: 'Internal team, fully supported on-site',
    description:
      'A Fortune 500 financial company rented two products for their annual SKO. Their internal leaders ran both sessions using our facilitation guides and remote support.',
    tags: ['One Day Event', '300 participants', 'DIY delivery'],
    price: '$22,000',
    currency: 'USD',
  },
  {
    eyebrow: 'Real Projects (2)',
    image: caseImg2,
    name: 'Leadership\nSummit',
    heading: 'Full-service, run by our team',
    description:
      'A senior leadership summit where our facilitators designed and delivered the full program end to end, integrating client content and branding throughout.',
    tags: ['Multi-Day Event', '400 participants', 'Bring Us In'],
    price: '$120,000',
    currency: 'USD',
  },
  {
    eyebrow: 'Real Projects (3)',
    image: caseImg3,
    name: 'Industry\nConference',
    heading: 'Interactive installations at scale',
    description:
      'A multi-day industry conference featuring two interactive installations with event extensions, coordinated and shipped for the client team to run.',
    tags: ['Multi-Day Event', '300 participants', 'DIY delivery'],
    price: '$35,000',
    currency: 'USD',
  },
];

export const catalogueCta = {
  title: 'Every product in our catalogue started as a client brief.',
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
