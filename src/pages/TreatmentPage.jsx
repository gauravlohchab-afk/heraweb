import { Link, useParams } from 'react-router';
import { categoryPath, getCategory, getTreatment, relatedTreatments } from '../data/treatments.js';
import { site } from '../data/site.js';
import { featuredTestimonial } from '../data/testimonials.js';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Icon from '../components/ui/Icon.jsx';
import BookButton from '../components/ui/BookButton.jsx';
import TreatmentGallery from '../components/treatments/TreatmentGallery.jsx';
import TreatmentCard from '../components/treatments/TreatmentCard.jsx';
import BookingPanel from '../components/booking/BookingPanel.jsx';
import { Branch, Pebble, Ripples } from '../components/decor/Decor.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import { treatmentFaqs } from '../data/faqs.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function TreatmentPage() {
  const { category: categorySlug, treatment: slug } = useParams();
  const t = getTreatment(categorySlug, slug);
  if (!t) return <NotFoundPage />;

  const category = getCategory(t.category);
  const related = relatedTreatments(t);
  // The client video names HIFU and HydraFacial; surface her words on those pages.
  const mentioned = featuredTestimonial.treatments.some((name) => t.name.includes(name) || t.aka?.includes(name));

  return (
    <>
      <section className="tx-hero" aria-labelledby="tx-title">
        <Pebble className="tx-hero__pebble" />
        <Ripples className="tx-hero__ripples decor--faint" />
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['Treatments', '/treatments/'], [category.name, categoryPath(category.slug)], [t.name, `${categoryPath(category.slug)}${t.slug}/`]]} />

          <div className="tx-hero__grid">
            <div className="tx-hero__gallery enter">
              <TreatmentGallery media={t.media} name={t.name} />
            </div>

            <div className="tx-hero__info">
              <p className="eyebrow enter">{category.name}</p>
              <h1 className="h1 tx-hero__title">
                <span className="line-mask">
                  <span style={{ '--d': 1 }}>{t.name}</span>
                </span>
              </h1>
              {(t.signature || t.recommended || t.aka) && (
                <div className="cluster enter" style={{ '--d': 2 }}>
                  {t.signature && <span className="tag tag--solid">Signature treatment</span>}
                  {t.recommended && <span className="tag">Recommended</span>}
                  {t.aka && <span className="small text-soft">Also known as {t.aka.join(', ')}</span>}
                </div>
              )}
              {t.summary && <p className="lede enter" style={{ '--d': 3 }}>{t.summary}</p>}
              {t.details && <p className="text-soft enter" style={{ '--d': 4 }}>{t.details}</p>}
              {!t.summary && !t.details && (
                <p className="text-soft enter" style={{ '--d': 3 }}>
                  {t.name} is part of our {category.name.toLowerCase()} menu. Message us to learn more about the treatment
                  and whether it suits your goals.
                </p>
              )}

              {t.benefits && (
                <div className="tx-hero__benefits enter" style={{ '--d': 5 }}>
                  <h2 className="tx-label">Benefits</h2>
                  <ul className="check-list">
                    {t.benefits.map((b) => (
                      <li key={b}>
                        <Icon name="check" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="tx-buy enter" style={{ '--d': 6 }}>
                <div className="cluster btn-row">
                  <BookButton variant="dark" treatment={t.name}>
                    Book this treatment
                  </BookButton>
                  <BookButton variant="ghost" mode="call" treatment={t.name}>
                    Request a call
                  </BookButton>
                </div>
                <p className="small text-soft">{site.booking.policy.join(' · ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mentioned && (
        <section className="section section--tight tx-voice" aria-labelledby="tx-voice-title">
          <div className="container tx-voice__inner">
            <Icon name="quote" />
            <div>
              <h2 className="visually-hidden" id="tx-voice-title">What a client says</h2>
              <p className="h3 reveal">
                {t.slug === 'hydrafacial'
                  ? '“I also really like the HydraFacial because I felt very moisturized and refreshed.”'
                  : '“I’ve also seen better results in my face from HIFU treatment.”'}
              </p>
              <p className="small text-soft reveal">
                — {featuredTestimonial.name}, <Link to="/reviews/">watch her video</Link>
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="section bg-soft tx-book" id="book" aria-labelledby="book-title">
        <Branch className="tx-book__branch decor--soft decor--hide-m" />
        <div className="container tx-book__grid">
          <div className="stack-lg">
            <p className="eyebrow reveal">Book this treatment</p>
            <h2 className="h2 reveal" id="book-title">
              Reserve your <em>{t.name}</em> session.
            </h2>
            <p className="text-soft reveal">
              Book a date and time, or request a consultation call if you’d like advice first.
            </p>
          </div>
          <div className="contact__panel reveal">
            <BookingPanel treatment={t.name} titleId="book-title" />
          </div>
        </div>
      </section>

      <FaqSection
        faqs={treatmentFaqs(t)}
        title={
          <>
            {t.name}, <em>answered.</em>
          </>
        }
      />

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="container">
            <header className="section-head section-head--split">
              <h2 className="h2 reveal" id="related-title">
                More {category.shortName.toLowerCase()} <em>treatments.</em>
              </h2>
              <Link to={categoryPath(category.slug)} className="link-arrow reveal">
                All {category.name.toLowerCase()} <Icon name="arrow" />
              </Link>
            </header>
            <div className="tcard-grid">
              {related.map((r, i) => (
                <TreatmentCard key={r.slug} treatment={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
