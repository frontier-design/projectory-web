// Shared FAQ content, previously declared verbatim in both CaseStudies.tsx and
// GetStarted.tsx.
//
// KNOWN CONTENT BUG (left as-is, needs a human decision):
// "What discounts can you provide?" below is answered with the text that
// pricingData.ts uses for "How do you create an estimate?" — it describes the
// estimate process and never mentions a discount. pricingData.ts has both a
// real discounts answer and this estimate answer, filed under the correct
// questions. So the question label here is the wrong one, not the answer.
// Fixing it changes visible page copy, so it is deliberately not touched.
export const caseStudiesFAQ = [
  {
    question: 'What if I want to mix different experiences?',
    answer:
      'Combining in-room Facilitated Sessions with interactive installations outside the room enables Projectory to create a unique and integrated experience for your audience. Multiple experiences generate more output, leading to more meaningful post-event activation. During our discovery process, we’ll be able to curate together the best set of experiences for your event within your budget.',
  },
  {
    question: 'Can you create custom experiences?',
    answer:
      "Absolutely! All our Facilitated Sessions and Interactive Installations started with a specific challenge or objective one of our clients shared with us. Custom designs usually start with a $20K USD investment, but the final price depends on the complexity and materials used. We'll work closely with your team to create something impactful within your budget.",
  },
  {
    question: 'Can I do it myself?',
    answer:
      'Some of our products are easy to ship and build, allowing your team and volunteers to manage them without Projectory Staff on-site. We also license some of our frameworks so skilled facilitators can run a Projectory session with our tools and canvases after a brief training. Self-Service pricing (“You Do”) is more economical but requires some involvement from your team.',
  },
  {
    question: 'What discounts can you provide?',
    answer:
      'Good question! Once we learn about your project, we’ll be able to come back with a few initial ideas. After we get you excited about what we have in mind, we can either send you a budget estimate or work backwards from whatever budget you can invest in this work.',
  },
  {
    question: 'Would you consider emceeing my event?',
    answer:
      'Yes, especially if your agenda already includes a few Projectory Facilitated Sessions. As emcees, we do more than introduce speakers; we connect the dots between sessions and guide the program, taking attendees on a journey from inspiration to action.',
  },
];
