import { Link } from 'react-router';
import { featuredTestimonial as ft, reviews } from '../data/testimonials.js';
import { treatments, treatmentPath } from '../data/treatments.js';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import VideoPlayer from '../components/ui/VideoPlayer.jsx';
import Icon from '../components/ui/Icon.jsx';
import ReviewQuote from '../components/ui/ReviewQuote.jsx';
import BookingCTA from '../components/sections/BookingCTA.jsx';
import { Branch, Pebble, Ripples } from '../components/decor/Decor.jsx';

// Treatments named in the video, linked to their pages.
const mentioned = ft.treatments
  .map((name) => treatments.find((t) => t.name === name || t.aka?.includes(name)))
  .filter(Boolean);

export default function ReviewsPage() {
  return (
    <>
      <section className="reviews-hero" aria-labelledby="reviews-title">
        <Pebble className="reviews-hero__pebble" />
        <Ripples className="reviews-hero__ripples decor--faint" rings={8} />
        <Branch className="reviews-hero__branch decor--blue decor--soft decor--hide-m" data-parallax="-0.06" />
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['Reviews', '/reviews/']]} />
          <div className="reviews-hero__grid">
            <div className="reviews-hero__video enter">
              <VideoPlayer video={ft.video} label={ft.video.title} caption={<><span><strong>{ft.name}</strong>{ft.role}</span><span>1:12</span></>} />
            </div>
            <div className="reviews-hero__text">
              <p className="eyebrow enter">Client stories</p>
              <h1 className="h1 reviews-hero__title" id="reviews-title">
                <span className="line-mask">
                  <span style={{ '--d': 1 }}>In her</span>
                </span>
                <span className="line-mask">
                  <span style={{ '--d': 2 }}>
                    <em>own words.</em>
                  </span>
                </span>
              </h1>
              <figure className="reviews-hero__quote enter" style={{ '--d': 4 }}>
                <blockquote>
                  <p>“If you’re looking for a studio that treats you with quality care and treats you gentle and kind, I really recommend Hera Wellness Studio.”</p>
                </blockquote>
                <figcaption>
                  <strong>{ft.name}</strong> · {ft.role}
                </figcaption>
              </figure>
              <div className="reviews-hero__meta enter" style={{ '--d': 5 }}>
                <span className="tx-label">Treatments she mentions</span>
                <ul className="cluster">
                  {mentioned.map((t) => (
                    <li key={t.slug}>
                      <Link to={treatmentPath(t)} className="chip">
                        {t.name} <Icon name="arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section transcript" aria-labelledby="transcript-title">
        <div className="container transcript__grid">
          <div className="transcript__head">
            <p className="eyebrow reveal">Video transcript</p>
            <h2 className="h2 reveal" id="transcript-title">
              Alexandra’s <em>experience.</em>
            </h2>
            <ul className="transcript__highlights">
              {ft.highlights.map((h, i) => (
                <li key={h} className="reveal" style={{ '--d': i }}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="transcript__body">
            {ft.transcript.map((p, i) => (
              <p key={i} className="reveal" style={{ '--d': i % 3 }}>
                {p}
              </p>
            ))}
            <p className="small text-soft reveal">Transcribed from the captions in the video.</p>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="section bg-soft" aria-labelledby="written-title">
          <div className="container">
            <header className="section-head section-head--split">
              <h2 className="h2 reveal" id="written-title">
                Written <em>reviews.</em>
              </h2>
              <p className="section-head__intro text-soft reveal">As shared by clients on Facebook and Instagram.</p>
            </header>
            <div className="grid grid--3">
              {reviews.map((r, i) => (
                <ReviewQuote key={r.name} review={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCTA />
    </>
  );
}
