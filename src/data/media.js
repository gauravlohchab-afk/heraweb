// Central media registry. All site assets live in /public/images:
//   center/        studio photography
//   treatments/    real treatment photos, one folder per treatment group
//   testimonials/  client testimonial video + poster
//   general/       brand marks, social image, studio films
// Components never hardcode paths. Anything missing renders a branded
// placeholder at the same aspect ratio.

const img = (path, width, height, smallWidth) => ({
  type: 'image',
  src: `/images/${path}.webp`,
  srcSet: smallWidth ? `/images/${path}-${smallWidth}.webp ${smallWidth}w, /images/${path}.webp ${width}w` : undefined,
  thumb: smallWidth ? `/images/${path}-${smallWidth}.webp` : undefined,
  width,
  height,
});

const video = ({ src, poster, posterSmall, width, height, title, duration }) => ({ type: 'video', src, poster, posterSmall, width, height, title, duration });

export const brand = {
  // Combined logo (emblem + wordmark in one image) for header and footer.
  logo: { src: '/images/general/hera-logo.webp', srcSet: '/images/general/hera-logo-300.webp 300w, /images/general/hera-logo.webp 600w', width: 600, height: 486 },
  emblem: { src: '/images/general/hera-emblem.webp', width: 240, height: 233 },
  ogImage: '/images/general/og-image.jpg',
};

// Photography of the studio.
export const center = {
  corridor: { ...img('center/center-1', 1000, 1000, 600), alt: 'Bright marble corridor leading to the private treatment rooms at Hera Wellness Studio' },
  stairs: { ...img('center/center-2', 1000, 1000, 600), alt: 'Marble staircase with an indoor plant at Hera Wellness Studio' },
  bed: { ...img('center/center-3', 1000, 1000, 600), alt: 'Treatment bed prepared with fresh towels' },
  entrance: { ...img('center/center-4', 1000, 1000, 600), alt: 'Glass entrance of Hera Wellness Studio seen from the treatment room hallway' },
  room: { ...img('center/center-5', 1000, 1000, 600), alt: 'Treatment room at Hera Wellness Studio with body sculpting and facial equipment' },
  doors: { ...img('center/center-6', 1000, 1000, 600), alt: 'Lit sliding doors to the private treatment rooms' },
  plant: {
    type: 'image',
    src: '/images/center/plant.webp',
    srcSet: '/images/center/plant-500.webp 500w, /images/center/plant.webp 900w',
    width: 900,
    height: 1600,
    alt: 'Potted plant by the window at the entrance of Hera Wellness Studio',
  },
};

// The one client testimonial video (web version of the 4K original).
export const testimonialVideo = video({
  src: '/images/testimonials/alexandra-constantino.mp4',
  poster: '/images/testimonials/alexandra-constantino-poster.webp',
  width: 720,
  height: 1280,
  title: 'Alexandra Constantino on her experience at Hera Wellness Studio',
  duration: 'PT1M12S',
});

// Clinic film (720p web version).
export const clinicVideo = video({
  src: '/images/general/clinic-video.mp4',
  poster: '/images/general/clinic-video-poster.webp',
  posterSmall: '/images/general/clinic-video-poster-640.webp',
  width: 1280,
  height: 720,
  title: 'Inside Hera Wellness Studio',
  duration: 'PT0M35S',
});

// Studio walk-through from the live website (videos/about us.mp4, transcoded).
export const studioVideo = video({
  src: '/images/general/studio-walkthrough.mp4',
  poster: '/images/general/studio-walkthrough-poster.webp',
  width: 720,
  height: 720,
  title: 'A walk to Hera Wellness Studio and its reception',
  duration: 'PT0M40S',
});

// Treatment images: public/images/treatments/<group>/<group>-N.webp
// (1000px) plus <group>-N-600.webp. To add photos, drop the next numbered
// files into the folder and raise the count below.
const photos = (group, count) =>
  Array.from({ length: count }, (_, i) => img(`treatments/${group}/${group}-${i + 1}`, 1000, 1000, 600));

// Images not photographed at the studio (illustrative or stock). Flagged
// `generated: true`: described as illustrative and excluded from structured data.
const illustrative = (group, count) => photos(group, count).map((m) => ({ ...m, generated: true }));

// Per-treatment media, in display order: images and videos only, no
// promotional posters. Empty arrays show a branded placeholder.
export const treatmentMedia = {
  thermage: illustrative('thermage', 3),
  'hifu-12d': photos('hifu-12d', 5),
  'hifu-7d': [...photos('hifu-7d', 5), testimonialVideo],
  'exilift-face': photos('exilift-face', 5),
  'co2-laser': illustrative('co2-laser', 3),
  'pico-laser': photos('pico-laser', 4),
  'carbon-laser': photos('carbon-laser', 4),
  hydrafacial: [...photos('hydra-facial', 6), testimonialVideo],
  'organic-botox': illustrative('organic-botox', 3),
  'melasma-pigmentation': illustrative('melasma', 4),
  'anti-acne': illustrative('anti-acne', 4),
  'cryo-fat-freeze': photos('cryotherapy', 6),
  'ems-express': photos('ems-express', 6),
  'ems-sculpt-neo': photos('ems-sculpt', 6),
  '10d-laser': photos('10d-laser', 6),
  'hair-regrowth': photos('hair-growth', 7),
  'diode-hair-removal': photos('diode', 6),
  'anti-dandruff': photos('anti-dandruff', 6),
};

// Before & after pairs (files in public/images/before-after/). Not shown on the
// site for now: the Results page and home section were removed until genuine
// client results are available (BeforeAfterGallery is kept for that). Real pairs:
// { treatment: 'pico-laser', before: img('before-after/pico-1-before', 900, 1125), after: img('before-after/pico-1-after', 900, 1125), caption: 'After 3 sessions' }
// Non-genuine examples add `illustrative: true`, captioned "Illustrative example".
// Until then, the gallery shows clearly labelled placeholders.
// The current three pairs are not confirmed as client photos, so they are
// marked illustrative. For genuine client photos set `illustrative: false`.
const pair = (slug) => ({
  before: img(`before-after/${slug}-before`, 1000, 1000, 600),
  after: img(`before-after/${slug}-after`, 1000, 1000, 600),
});

export const beforeAfter = [
  { treatment: 'hydrafacial', ...pair('hydrafacial'), illustrative: true },
  { treatment: 'diode-hair-removal', ...pair('diode-hair-removal'), illustrative: true },
  { treatment: 'anti-dandruff', ...pair('anti-dandruff'), illustrative: true },
];

// True when every pair is illustrative; section copy then avoids "real results".
export const beforeAfterIllustrative = beforeAfter.length > 0 && beforeAfter.every((p) => p.illustrative);
