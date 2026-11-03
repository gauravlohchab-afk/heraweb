import { Link } from 'react-router';
import { center } from '../data/media.js';
import { site } from '../data/site.js';
import { categories, categoryPath, treatments } from '../data/treatments.js';
import PageHero from '../components/layout/PageHero.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionHead from '../components/ui/SectionHead.jsx';
import Philosophy from '../components/sections/Philosophy.jsx';
import StudioGallery from '../components/sections/StudioGallery.jsx';
import StudioFilm from '../components/sections/StudioFilm.jsx';
import BookingCTA from '../components/sections/BookingCTA.jsx';
import ReviewsSection from '../components/sections/ReviewsSection.jsx';
import BookButton from '../components/ui/BookButton.jsx';
import { ContactDetails, StudioMap } from '../components/sections/ContactSection.jsx';
import { Tree, Stones, LeafDivider } from '../components/decor/Decor.jsx';

// What the studio offers, stated only from its own material.
const reasons = [
  ['user', 'Personalized care', 'Treatments chosen around you, your concerns and your goals.'],
  ['layers', 'Face, body & hair in one place', `${treatments.length} treatments, from Thermage and HIFU to Cryo Fat Freeze and Diode Hair Removal.`],
  ['calendar', 'Reserved, unhurried visits', 'No walk-ins. Every visit is booked online, so your slot is set aside for you.'],
  ['card', 'Flexible payment', 'All payment methods are accepted.'],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[['Home', '/'], ['About', '/about/']]}
        eyebrow="About Hera Wellness Studio"
        title={
          <>
            Where beauty meets <em>true wellness.</em>
          </>
        }
        intro="A beauty and wellness studio in Diliman, Quezon City, offering facial, body and hair treatments with personalized care."
        aside={<Media image={center.plant} ratio="9 / 13" arch className="enter-img" style={{ '--d': 2 }} sizes="(min-width: 900px) 26vw, 70vw" priority />}
      >
        <div className="cluster btn-row enter" style={{ '--d': 4 }}>
          <BookButton variant="dark">Book a treatment</BookButton>
          <BookButton variant="ghost" mode="call">
            Request a call
          </BookButton>
        </div>
      </PageHero>

      <section className="section story" aria-labelledby="story-title">
        <Tree className="story__tree decor--blue decor--faint" />
        <div className="container story__grid">
          <div className="story__visual">
            <Media image={center.stairs} ratio="4 / 5" className="story__main reveal-img" sizes="(min-width: 900px) 34vw, 85vw" />
            <Media image={center.corridor} ratio="1 / 1" className="story__inset reveal-img" style={{ '--d': 2 }} sizes="(min-width: 900px) 16vw, 40vw" data-parallax="-0.05" />
          </div>
          <div className="story__text">
            <p className="eyebrow reveal">
              <span className="eyebrow__num">01</span>Our story
            </p>
            <h2 className="h2 reveal" id="story-title" style={{ '--d': 1 }}>
              Inspired by <em>Hera.</em>
            </h2>
            <p className="lede reveal" style={{ '--d': 2 }}>
              Hera Wellness Studio was founded with a simple vision — to create a sanctuary where beauty, health, and self-care
              come together.
            </p>
            <p className="text-soft reveal" style={{ '--d': 3 }}>
              Inspired by the goddess Hera, a symbol of strength, renewal, and well-being, our studio opened its doors to provide
              treatments that nurture both body and mind.
            </p>
            <p className="text-soft reveal" style={{ '--d': 4 }}>
              What started as a small wellness haven has blossomed into a studio known for personalized care, high-quality
              treatments, and a commitment to helping every client look and feel their very best.
            </p>
            <LeafDivider className="reveal" />
            <p className="story__sign reveal">Be one of our Heranians.</p>
          </div>
        </div>
      </section>

      <ReviewsSection num="02" />
      <StudioFilm num="03" showLink={false} className="bg-soft" />
      <Philosophy num="04" />

      <section className="section" aria-labelledby="studio-title">
        <div className="container">
          <SectionHead
            num="05"
            eyebrow="The studio"
            id="studio-title"
            title={
              <>
                A calm space, <em>designed for you.</em>
              </>
            }
            intro="Bright marble corridors, private treatment rooms and modern equipment — take a look inside before your visit."
          />
          <StudioGallery />
        </div>
      </section>

      <section className="section bg-soft why" aria-labelledby="why-title">
        <Stones className="why__stones decor--blue decor--faint decor--hide-m" />
        <div className="container why__grid">
          <SectionHead
            num="06"
            eyebrow="Why Hera"
            id="why-title"
            align="center"
            className="why__head"
            title={
              <>
                What to expect <em>from every visit.</em>
              </>
            }
          />
          <ul className="why__list">
            {reasons.map(([icon, title, text], i) => (
              <li key={title} className="why__item reveal" style={{ '--d': i }}>
                <Icon name={icon} />
                <h3 className="h4">{title}</h3>
                <p className="text-soft">{text}</p>
              </li>
            ))}
          </ul>
          <ul className="why__cats reveal">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={categoryPath(c.slug)} className="chip">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="info-title">
        <div className="container info__grid">
          <div className="stack-lg">
            <p className="eyebrow reveal">
              <span className="eyebrow__num">06</span>Studio information
            </p>
            <h2 className="h2 reveal" id="info-title">
              {site.name}
            </h2>
            <div className="reveal">
              <ContactDetails />
            </div>
          </div>
          <StudioMap className="info__map reveal" />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
