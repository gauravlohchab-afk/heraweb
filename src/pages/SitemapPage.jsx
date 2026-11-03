import { Link } from 'react-router';
import PageHero from '../components/layout/PageHero.jsx';
import { categories, categoryPath, treatmentsIn, treatmentPath } from '../data/treatments.js';

const studioPages = [
  ['Home', '/', 'Hera Wellness Studio in Diliman, Quezon City'],
  ['Treatments', '/treatments/', 'The full treatment menu'],
  ['About', '/about/', 'Our story, philosophy and studio'],
  ['Reviews', '/reviews/', 'Client video testimonial and reviews'],
  ['Contact & booking', '/contact/', 'Location, contact details and booking'],
];

// Human-readable index of every public page (the XML version is /sitemap.xml).
export default function SitemapPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[['Home', '/'], ['Sitemap', '/sitemap/']]}
        eyebrow="Sitemap"
        title={
          <>
            Every page, <em>in one place.</em>
          </>
        }
        intro="Browse all pages on the Hera Wellness Studio website, including every treatment."
      />

      <section className="section section--tight" aria-label="Site pages">
        <div className="container sitemap">
          <section className="sitemap__group" aria-labelledby="sitemap-studio">
            <h2 className="h3" id="sitemap-studio">Studio</h2>
            <ul className="sitemap__list">
              {studioPages.map(([label, to, desc]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {categories.map((c) => (
            <section key={c.slug} className="sitemap__group" aria-labelledby={`sitemap-${c.slug}`}>
              <h2 className="h3" id={`sitemap-${c.slug}`}>
                <Link to={categoryPath(c.slug)}>{c.name}</Link>
              </h2>
              <ul className="sitemap__list">
                {treatmentsIn(c.slug).map((t) => (
                  <li key={t.slug}>
                    <Link to={treatmentPath(t)}>{t.name}</Link>
                    {t.summary && <span>{t.summary}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
