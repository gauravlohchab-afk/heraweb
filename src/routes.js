import { categories, categoryPath, treatments, treatmentPath } from './data/treatments.js';

// Every indexable route; used for prerendering and the sitemap.
export const staticRoutes = [
  '/',
  '/treatments/',
  ...categories.map((c) => categoryPath(c.slug)),
  ...treatments.map(treatmentPath),
  '/about/',
  '/reviews/',
  '/contact/',
  '/sitemap/',
];
