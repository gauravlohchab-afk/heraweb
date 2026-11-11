// Builds /llms.txt (https://llmstxt.org): a plain-Markdown summary of the studio
// and every treatment, so AI assistants can answer questions about Hera Wellness
// Studio accurately and link to the right page. Generated at build time from the
// same data as the site, so it never drifts. Facts only, as in seo.js.

import { SITE_URL, site, fullAddress } from './site.js';
import { categories, categoryPath, treatmentPath, treatmentsIn, treatments } from './treatments.js';
import { studioFaqs } from './faqs.js';
import { featuredTestimonial } from './testimonials.js';

const abs = (path) => `${SITE_URL}${path}`;

export function buildLlmsTxt() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a beauty and wellness studio in ${fullAddress}, Philippines, offering ${treatments.length} facial, body and hair treatments with personalized care. ${site.intro}`,
    '',
    '## Key facts',
    '',
    `- Location: ${fullAddress}, Philippines (map: ${site.location.mapsDirections.split('/@')[0]})`,
    `- Coordinates: ${site.location.lat}, ${site.location.lng}`,
    `- Booking: ${site.booking.policy.join('. ')}.`,
    '- How to book: online at the website ("Book now" on any page) — choose a preferred date and time, or request a consultation call for advice first.',
    `- Email: ${site.email}`,
    `- Facebook / Messenger: ${site.social.facebook} (${site.social.messenger})`,
    `- Instagram: ${site.social.instagram}`,
    `- TikTok: ${site.social.tiktok}`,
    '',
    '## Treatments',
    '',
  ];

  for (const c of categories) {
    lines.push(`### [${c.name}](${abs(categoryPath(c.slug))})`, '', c.intro, '');
    for (const t of treatmentsIn(c.slug)) {
      const about = [t.summary, t.details].filter(Boolean).join(' ');
      const aka = t.aka ? ` Also known as ${t.aka.join(', ')}.` : '';
      const benefits = t.benefits ? ` Benefits: ${t.benefits.join('; ')}.` : '';
      const desc = `${about}${aka}${benefits}`.trim();
      lines.push(`- [${t.name}](${abs(treatmentPath(t))})${desc ? `: ${desc}` : ''}`);
    }
    lines.push('');
  }

  lines.push('## Frequently asked questions', '');
  for (const { q, a } of studioFaqs) lines.push(`**${q}**`, a, '');

  lines.push(
    '## Pages',
    '',
    `- [Home](${abs('/')}): overview of the studio and its treatments`,
    `- [All treatments](${abs('/treatments/')}): the full treatment menu`,
    `- [About](${abs('/about/')}): the studio's story and a look inside`,
    `- [Reviews](${abs('/reviews/')}): client video testimonial from ${featuredTestimonial.name}, with transcript`,
    `- [Contact & booking](${abs('/contact/')}): book a date and time or request a consultation call`,
    `- [Sitemap](${abs('/sitemap/')}): every page on the site`,
    '',
  );

  return lines.join('\n');
}
