// Treatment catalogue — source of truth for names and categories. Prices are
// intentionally not published on the website.
//
// Sources:
//   summary   — the one-line descriptions on the live website (HIFU 12D, Organic
//               Botox, Melasma and Anti-Acne had none; theirs are plain
//               descriptions written for the site — confirm with the studio)
//   details / benefits — copy printed on the studio's own treatment creatives
//                        (CO2 Laser copy is from the brand guidelines)
// Fields that were not supplied are omitted, never guessed.

import { treatmentMedia } from './media.js';

export const categories = [
  {
    slug: 'facial',
    name: 'Facial Treatments',
    shortName: 'Face',
    cover: { slug: 'hydrafacial' },
    intro: 'From an instant glow to non-surgical lifting — treatments for skin that looks and feels renewed.',
    seoDescription:
      'Facial treatments at Hera Wellness Studio in Diliman, Quezon City: Thermage, HIFU 12D, Ultimate HIFU 7D, Exilift Face, CO2 Laser, Pico Laser, Carbon Laser, HydraFacial, Organic Botox, melasma and acne treatments.',
  },
  {
    slug: 'body',
    name: 'Body & Slimming',
    shortName: 'Body',
    cover: { slug: 'cryo-fat-freeze' },
    intro: 'Toning, contouring and fat-freezing treatments tailored to your goals.',
    seoDescription:
      'Body and slimming treatments at Hera Wellness Studio in Diliman, Quezon City: Cryo Fat Freeze, EMS Express, EMS Sculpt Neo and 10D Laser.',
  },
  {
    slug: 'hair',
    name: 'Hair Treatments',
    shortName: 'Hair',
    cover: { slug: 'hair-regrowth' },
    intro: 'Care for the hair and scalp — from regrowth therapy to smooth, hair-free skin.',
    seoDescription:
      'Hair and scalp treatments at Hera Wellness Studio in Diliman, Quezon City: Hair Regrowth, Diode Hair Removal and Anti-Dandruff.',
  },
];

const list = [
  // ---------- Facial ----------
  {
    slug: 'thermage',
    name: 'Thermage',
    category: 'facial',
    signature: true,
    details: 'Transform your skin today. Feel confident in your skin again with Thermage at Hera Wellness Studio.',
  },
  { slug: 'hifu-12d', name: 'HIFU 12D', category: 'facial', summary: 'High-intensity focused ultrasound for a lifted, firmer-looking face.' },
  {
    slug: 'hifu-7d',
    name: 'Ultimate HIFU 7D',
    aka: ['HIFU 7D', 'HIFU'],
    category: 'facial',
    signature: true,
    summary: 'Lifts, tightens, and sculpts the face without surgery.',
    details: 'Achieve smooth, youthful skin with HIFU 7D at Hera Wellness Studio — where science meets beauty.',
    benefits: ['Lifts and firms the skin', 'Reduces wrinkles', 'Provides instant visible results', 'Improves the jawline'],
  },
  {
    slug: 'exilift-face',
    name: 'Exilift Face',
    category: 'facial',
    details: 'Let your skin shine as brightly as you do. Exilift Face is the perfect way to refresh and renew.',
  },
  {
    slug: 'co2-laser',
    name: 'CO2 Laser',
    category: 'facial',
    details:
      'CO2 Laser can precisely remove thin layers of skin with minimal damage to the surrounding structures. It treats sun damage, wrinkles, scars, warts, birthmarks and other skin conditions.',
  },
  {
    slug: 'pico-laser',
    name: 'Pico Laser',
    category: 'facial',
    details: 'Experience smoother, clearer skin with this advanced treatment.',
  },
  {
    slug: 'carbon-laser',
    name: 'Carbon Laser',
    category: 'facial',
    recommended: true,
    summary: 'Deep cleans, tightens pores, brightens skin.',
  },
  {
    slug: 'hydrafacial',
    name: 'HydraFacial',
    category: 'facial',
    summary: 'Cleanses, hydrates, and gives instant glow.',
  },
  { slug: 'organic-botox', name: 'Organic Botox', category: 'facial', summary: 'A facial treatment for the look of fine lines and wrinkles.' },
  { slug: 'melasma-pigmentation', name: 'Melasma / Pigmentation', category: 'facial', summary: 'Targeted care for melasma, dark spots and uneven skin tone.' },
  { slug: 'anti-acne', name: 'Anti-Acne / Pimples', category: 'facial', summary: 'Targeted care for acne-prone skin and breakouts.' },

  // ---------- Body & Slimming ----------
  {
    slug: 'cryo-fat-freeze',
    name: 'Cryo Fat Freeze',
    aka: ['Cryotherapy'],
    category: 'body',
    recommended: true,
    signature: true,
    summary: 'Freezes fat, firms skin, and boosts body recovery.',
  },
  {
    slug: 'ems-express',
    name: 'EMS Express',
    category: 'body',
    summary: 'Tones muscles, burns fat, and sculpts the body fast.',
  },
  {
    slug: 'ems-sculpt-neo',
    name: 'EMS Sculpt Neo',
    aka: ['EMSculpt Neo'],
    category: 'body',
    details: 'Sculpt your dream body. Achieve a toned, sculpted body without the intense workouts.',
  },
  {
    slug: '10d-laser',
    name: '10D Slimming Laser',
    aka: ['10D Laser', '10D Elite'],
    category: 'body',
    summary: 'Melts fat, contours, and shapes the body.',
  },

  // ---------- Hair ----------
  {
    slug: 'hair-regrowth',
    name: 'Hair Regrowth',
    aka: ['Hair Regrowth Therapy'],
    category: 'hair',
    summary: 'Stimulates follicles, promotes natural growth, and strengthens hair.',
    details:
      'Myth: only people with complete baldness need hair regrowth treatment. Fact: treatments can help with thinning hair, receding hairlines, and even early-stage hair loss — prevention is key.',
  },
  {
    slug: 'diode-hair-removal',
    name: 'Diode Hair Removal',
    aka: ['Hair Removal'],
    category: 'hair',
    recommended: true,
    signature: true,
    summary: 'Bye razors, hello laser.',
    details:
      'Say goodbye to daily shaving and painful waxing, and hello to smooth, flawless skin that lasts. Experience the precision and comfort of Diode Hair Removal at Hera Wellness Studio.',
  },
  {
    slug: 'anti-dandruff',
    name: 'Anti-Dandruff',
    category: 'hair',
    summary: 'Eliminates flakes, reduces itch, and restores scalp balance.',
    details:
      "Dandruff isn't just a surface issue — treat it at the source with our advanced care and a personalized anti-dandruff solution.",
  },
];

export const treatments = list.map((t) => {
  const media = treatmentMedia[t.slug] ?? [];
  return { ...t, media, image: media.find((m) => m.type === 'image') ?? null };
});

export const categoryCover = (c) => ({ image: treatments.find((t) => t.slug === c.cover.slug)?.image ?? null, position: c.cover.position });
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const treatmentsIn = (slug) => treatments.filter((t) => t.category === slug);
export const treatmentPath = (t) => `/treatments/${t.category}/${t.slug}/`;
export const getTreatment = (category, slug) => treatments.find((t) => t.category === category && t.slug === slug);
export const relatedTreatments = (t, count = 3) => treatmentsIn(t.category).filter((x) => x.slug !== t.slug).slice(0, count);
export const categoryPath = (slug) => `/treatments/${slug}/`;
export const signatureTreatments = treatments.filter((t) => t.signature);
