import caseImg1 from './assets/leadership-summit.webp';
import caseImg2 from './assets/PCMA-2024-CEMA-Summit.png';
import caseImg3 from './assets/Deloitte-Connect-2024.png';
import whitelabelImg from './assets/projectory-CIBC-img.webp';

export const pricingHero = {
  title: 'Every Product.\nOne Price.',
  subtitle: "Rent it or bring us in. We'll deliver a\nfantastic experience either way.",
};

export const deliveryOptions = [
  {
    eyebrow: 'Run it yourself',
    title: 'Base Rental',
    subtitle:
      'The product ships to you with everything your team needs to confidently install and facilitate',
    features: [
      'Complete product kit, pre-configured and ready to run',
      'Seamless integration with your theme, content, and audience',
      'Step-by-step facilitation guide and supporting slides',
      'Explainer video walkthrough for your team',
      'A dedicated contact from booking through debrief',
      'End-to-end logistics coordinated by our team',
    ],
    cta: {
      title: '$9,000',
      currency: 'USD',
      caption: 'per product \u00b7 per rental',
      note: 'Bundling multiple products lowers the cost per product',
      button: { label: 'Rent Products', to: '/get-started-form' },
    },
  },
  {
    eyebrow: 'Ask us about',
    title: 'Optional Add-Ons',
    subtitle:
      "Pick what you need from us, and we'll show up and make it happen",
    featureGroups: [
      {
        title: 'Bring us in',
        items: [
          'Expert Projectory Facilitator\nassigned to your event',
          'Onsite crew for setup, operations,\nand teardown',
          'Projectory as your event emcee',
        ],
      },
      {
        title: 'Personalize it',
        items: [
          'Custom new product design for your\nspecific challenge',
          'Custom Branding and design\nservices',
          "Interactive post-event report with\nparticipants' outputs",
        ],
      },
    ],
    cta: {
      title: 'Rental fee\n+ services',
      button: { label: 'Get an Estimate', to: '/get-started-form' },
    },
  },
];

export const whitelabelCta = {
  eyebrow: 'Custom Branding?',
  title: "We\u2019ll Make it Look\nand Feel Like Your Brand",
  body: 'Ask us about white-labeling \u2014 custom colours, brand identity, and fully branded facilitation materials across everything we deliver.',
  button: { label: 'Contact Us', to: '/get-started#contact-form' },
  image: whitelabelImg,
};

export const caseStudiesHeader = {
  eyebrow: 'Real Projects, Real numbers',
  heading: 'What engagements\nlooked like in practice',
};

export const caseStudies = [
  {
    image: caseImg1,
    name: 'Sales Kickoff',
    heading: 'Internal team, fully\nsupported on-site',
    description:
      'A Fortune 500 financial company rented two products for their annual SKO. Their internal leaders ran both sessions using our facilitation guides and remote support.',
    tags: [
      'One Day Event',
      '300 participants',
      'Rent-and-run delivery',
      'Two products',
    ],
    price: '$22,000',
    currency: 'USD',
  },
  {
    image: caseImg3,
    name: 'Industry event',
    heading: 'Interactive\ninstallations at scale',
    description:
      'A multi-day industry conference featuring two installations with post event reports, coordinated and shipped for the client team to run on their own.',
    tags: [
      'Multi-Day Event',
      '300 participants',
      'Rent-and-run delivery',
      'Two Products',
      'Post event report',
    ],
    price: '$35,000',
    currency: 'USD',
  },
  {
    image: caseImg2,
    name: 'Leadership Summit',
    heading: 'Full-service,\nrun by our team',
    description:
      'A senior leadership summit where our facilitators designed and delivered the full program end to end, integrating client content and branding throughout.',
    tags: [
      'Multi-Day Event',
      'Six products',
      'Post event report',
      '500 participants',
      'Onsite crew and facilitators',
      'Custom branding',
    ],
    price: '$120,000',
    currency: 'USD',
  },
  {
    image:
      'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1749519214/Program_Feature1_o2kgpw_r7wxiw.webp',
    name: 'Association Conference',
    heading: 'Installations on the floor,\nsessions in the breakouts',
    description:
      "A national association's annual gathering featured two interactive installations on the show floor and two facilitated breakout sessions \u2014 with an onsite crew handling setup, operation, and teardown throughout.",
    tags: [
      'Multi-Day Event',
      '1200 participants',
      'Onsite crew and facilitators',
      'Four Products',
    ],
    price: '$45,000',
    currency: 'USD',
  },
];

export const catalogueCta = {
  body: 'Tell Us what you are trying to solve and we\u2019ll get to work',
  button: { label: 'Contact Us', to: '/get-started#contact-form' },
};

export const faqSection = {
  title: 'Questions\nwe get a lot',
  items: [
    {
      question: 'Is $10,000 the total cost, or just the starting point?',
      answer:
        "It's the full rental fee for one product. If you run it yourself, you're mostly done, aside from shipping and any printing. If you bring our team in, facilitator and crew day rates are added on top. We'll always give you the full number before you commit.",
    },
    {
      question: 'What discounts can you provide?',
      answer:
        "A few, actually. First-time clients get a discount to make trying us out easier, and returning clients get one too, because loyalty should pay off. We can't give an exact quote without knowing more about your event, but we're confident we can add immediate experiential value across a wide range of budgets. That's kind of our thing.",
    },
    {
      question: 'How do you create an estimate?',
      answer:
        "Good question! Once we learn about your project, we'll be able to come back with a few initial ideas. After we get you excited about what we have in mind, we can either send you a budget breakdown or work backwards from whatever budget you can invest in this work.",
    },
    {
      question: 'Does the price change for longer events?',
      answer:
        'No. The rental fee is flat whether your event is one day or four. The only thing that scales with time is our team, since the facilitator and crew are billed by the day.',
    },
    {
      question: 'Can I book more than one product?',
      answer:
        "Yes, and most of our best events do. Bundling two or more products lowers the cost per product and creates a richer experience. We'll help you find the right combination.",
    },
    {
      question: 'How far in advance should I book?',
      answer:
        "The earlier the better, especially during conference season. Most clients book 10 to 16 weeks out, but if your event is around the corner, reach out anyway. We've pulled off impressive things on short timelines.",
    },
  ],
};
