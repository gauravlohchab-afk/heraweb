import { Link } from 'react-router';
import { categories, categoryCover, categoryPath, treatments, treatmentsIn, treatmentPath } from '../data/treatments.js';
import { site } from '../data/site.js';
import PageHero from '../components/layout/PageHero.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import BookingCTA from '../components/sections/BookingCTA.jsx';

// The complete menu: every treatment on one crawlable page.
export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[['Home', '/'], ['Treatments', '/treatments/']]}
        eyebrow="Treatments"
        title={
          <>
            The treatment <em>menu.</em>
          </>
        }
        intro={`All ${treatments.length} facial, body and hair treatments offered at ${site.name}. Open any treatment for its photos, videos and full details.`}
      >
        <nav className="chips enter" style={{ '--d': 4 }} aria-label="Jump to a category">
          {categories.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="chip">
              {c.name} <small>{treatmentsIn(c.slug).length}</small>
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          {categories.map((c, ci) => {
            const cover = categoryCover(c);
            return (
              <section key={c.slug} className="menu-section" id={c.slug} aria-labelledby={`menu-${c.slug}`}>
                <div className="menu-section__head">
                  <Link to={categoryPath(c.slug)} className="hover-zoom menu-section__cover" tabIndex={-1} aria-hidden="true">
                    <Media image={cover.image} position={cover.position} ratio="4 / 5" alt="" sizes="(min-width: 900px) 26vw, 80vw" className="reveal-img" />
                  </Link>
                  <p className="index-num reveal">0{ci + 1}</p>
                  <h2 className="h2 reveal" id={`menu-${c.slug}`}>{c.name}</h2>
                  <p className="text-soft reveal">{c.intro}</p>
                  <Link to={categoryPath(c.slug)} className="link-arrow reveal">
                    View {c.name.toLowerCase()} <Icon name="arrow" />
                  </Link>
                </div>
                <ul className="menu-list">
                  {treatmentsIn(c.slug).map((t, i) => (
                    <li key={t.slug} className="menu-row reveal" style={{ '--d': i % 4 }}>
                      <h3 className="menu-row__name">
                        <Link to={treatmentPath(t)}>{t.name}</Link>
                        {t.signature && <span className="tag tag--solid">Signature</span>}
                        {t.recommended && <span className="tag">Recommended</span>}
                      </h3>
                      {(t.summary || t.details) && <p className="menu-row__desc">{t.summary ?? t.details}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
