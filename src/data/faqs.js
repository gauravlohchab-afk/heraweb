// Frequently asked questions, shown on the page and mirrored as FAQPage JSON-LD.
// Answers are assembled only from facts already on the site (site.js,
// treatments.js and the studio's booking policy). Nothing medical (sessions,
// downtime, prices, results) is stated unless the studio supplied it.

import { site, fullAddress } from './site.js';
import { categories, getCategory, relatedTreatments, treatments, treatmentsIn } from './treatments.js';

const listNames = (items) => {
  const names = items.map((t) => t.name);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0] ?? '';
};

const bookingAnswer = (what = 'a treatment') =>
  `Book ${what} online: use “Book now” on any page to choose a preferred date and time, or request a consultation call if you’d like advice first. The studio confirms your slot. There are no walk-ins — online reservations only.`;

/** Studio-wide questions (home page). */
export const studioFaqs = [
  {
    q: 'Where is Hera Wellness Studio located?',
    a: `Hera Wellness Studio is in ${fullAddress}, Philippines. Open the map on the Contact page for directions to the studio.`,
  },
  {
    q: 'What treatments does Hera Wellness Studio offer?',
    a: `${treatments.length} treatments across three categories. ${categories
      .map((c) => `${c.name}: ${listNames(treatmentsIn(c.slug))}.`)
      .join(' ')}`,
  },
  {
    q: 'Do you accept walk-ins?',
    a: 'No. Hera Wellness Studio works by reservation only — please book online before your visit.',
  },
  {
    q: 'How do I book an appointment?',
    a: bookingAnswer(),
  },
  {
    q: 'Can I get advice before choosing a treatment?',
    a: 'Yes. Request a consultation call from any page and the studio will call you back to help you choose the right treatment for your goals.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'All payment methods are accepted.',
  },
  {
    q: 'How can I contact Hera Wellness Studio?',
    a: `Email ${site.email}, message the studio on Facebook Messenger (${site.handles.facebook}), or reach it on Instagram (${site.handles.instagram}) and TikTok (${site.handles.tiktok}).`,
  },
];

/** Questions for a treatment category page. */
export function categoryFaqs(category) {
  const items = treatmentsIn(category.slug);
  return [
    {
      q: `What ${category.name.toLowerCase()} are available at Hera Wellness Studio?`,
      a: `${items.length} ${category.name.toLowerCase()}: ${items
        .map((t) => (t.summary ? `${t.name} — ${t.summary.replace(/\.$/, '')}` : t.name))
        .join('; ')}.`,
    },
    {
      q: `Where can I get ${category.name.toLowerCase()} in Quezon City?`,
      a: `At Hera Wellness Studio in ${fullAddress}. ${category.intro}`,
    },
    {
      q: `Which ${category.shortName.toLowerCase()} treatment is right for me?`,
      a: 'Request a consultation call and the studio will help you choose based on your goals. You can also open any treatment for its photos, videos and details.',
    },
    {
      q: `How do I book ${category.name.toLowerCase()}?`,
      a: bookingAnswer('any of these treatments'),
    },
  ];
}

/** Questions for a single treatment page. */
export function treatmentFaqs(t) {
  const category = getCategory(t.category);
  const about = [t.summary, t.details].filter(Boolean).join(' ');
  const related = relatedTreatments(t);
  return [
    {
      q: `What is ${t.name}?`,
      a: `${about || `${t.name} is one of the ${category.name.toLowerCase()} at Hera Wellness Studio.`}${
        t.aka ? ` It is also known as ${listNames(t.aka.map((name) => ({ name })))}.` : ''
      }`,
    },
    t.benefits && {
      q: `What are the benefits of ${t.name}?`,
      a: `${t.benefits.join('. ')}.`,
    },
    {
      q: `Where can I get ${t.name} in Quezon City?`,
      a: `${t.name} is available at Hera Wellness Studio in ${fullAddress}, as part of its ${category.name.toLowerCase()}.`,
    },
    {
      q: `How do I book ${t.name}?`,
      a: bookingAnswer(t.name),
    },
    {
      q: `Is ${t.name} right for me?`,
      a: `Request a consultation call and the studio will talk through your goals and whether ${t.name} suits you${
        related.length ? `, or recommend an alternative such as ${listNames(related.slice(0, 3))}` : ''
      }.`,
    },
  ].filter(Boolean);
}

export const faqJsonLd = (faqs, id) => ({
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
