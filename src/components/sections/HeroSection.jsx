import { Link } from 'react-router';
import { brand, center } from '../../data/media.js';
import { site } from '../../data/site.js';
import { featuredTestimonial } from '../../data/testimonials.js';
import { categories, categoryCover, categoryPath, getTreatment, treatmentsIn } from '../../data/treatments.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import BookButton from '../ui/BookButton.jsx';
import { Ripples, Sprig } from '../decor/Decor.jsx';

// HydraFacial LED-mask photo from the studio, beside the corridor shot.
const treatmentShot = getTreatment('facial', 'hydrafacial').image;

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__panel" aria-hidden="true" />
      <Ripples className="hero__ripples decor--faint" rings={8} />

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow enter">Beauty &amp; wellness studio · Diliman, Quezon City</p>

          <h1 className="h1 hero__title" id="hero-title">
            <span className="line-mask">
              <span style={{ '--d': 1 }}>Discover your</span>
            </span>
            <span className="line-mask">
              <span style={{ '--d': 2 }}>
                <em>best self.</em>
              </span>
            </span>
          </h1>

          <p className="lede hero__lede enter" style={{ '--d': 4 }}>
            {site.intro}
          </p>

          <div className="hero__ctas enter" style={{ '--d': 5 }}>
            <BookButton variant="dark">Book a treatment</BookButton>
            <Link to="/treatments/" className="btn btn--ghost">
              Explore treatments <Icon name="arrow" />
            </Link>
          </div>

          <nav className="hero__cats enter" style={{ '--d': 7 }} aria-label="Treatment categories">
            {categories.map((c) => {
              const cover = categoryCover(c);
              return (
                <Link key={c.slug} to={categoryPath(c.slug)} className="hero__cat">
                  <span className="media hero__cat-img">
                    {cover.image && <img src={cover.image.src.replace(/\.webp$/, '-140.webp')} width="52" height="52" alt="" loading="lazy" decoding="async" />}
                  </span>
                  <span>
                    <strong>{c.shortName}</strong>
                    <small>{treatmentsIn(c.slug).length} treatments</small>
                  </span>
                  <Icon name="arrow" />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hero__visual">
          <span className="hero__frame" aria-hidden="true" />
          <Media
            image={center.corridor}
            arch
            ratio="4 / 5"
            className="hero__main enter-img"
            style={{ '--d': 1 }}
            sizes="(min-width: 900px) 34vw, 78vw"
            priority
          />
          <Media
            image={treatmentShot}
            alt="HydraFacial LED light therapy mask treatment at Hera Wellness Studio"
            arch
            ratio="3 / 5"
            position="center"
            className="hero__second enter-img"
            style={{ '--d': 3 }}
            sizes="(min-width: 900px) 14vw, 34vw"
            priority
          />
          <Sprig className="hero__sprig decor--blue decor--soft" />

          <div className="hero__badge" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="hero__badge-ring">
              <defs>
                <path id="hero-badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#hero-badge-circle" textLength="286" lengthAdjust="spacing">
                  Where beauty meets wellness · Hera Wellness Studio ·
                </textPath>
              </text>
            </svg>
            <img src={brand.emblem.src} width={brand.emblem.width} height={brand.emblem.height} alt="" />
          </div>

          <figure className="hero__quote enter" style={{ '--d': 8 }}>
            <blockquote>
              <p>“The atmosphere here is very relaxed and you really feel at ease.”</p>
            </blockquote>
            <figcaption>
              <Link to="/reviews/" className="hero__quote-link">
                <span className="hero__quote-play" aria-hidden="true">
                  <Icon name="play" />
                </span>
                <span>
                  <strong>{featuredTestimonial.name}</strong>
                  Watch her story
                </span>
              </Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
