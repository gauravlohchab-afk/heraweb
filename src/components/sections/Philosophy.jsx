import { featuredTestimonial } from '../../data/testimonials.js';
import { Stones, Ripples } from '../decor/Decor.jsx';

// The three ideas the studio describes itself by (About copy), framed by a
// client's own words from the testimonial video.
export const principles = [
  {
    title: 'Personalized care',
    text: 'The studio is known for personalized care — every treatment chosen around you and your goals.',
  },
  {
    title: 'Body and mind',
    text: 'Inspired by Hera — strength, renewal and well-being — with treatments that nurture both body and mind.',
  },
  {
    title: 'High-quality treatments',
    text: 'A commitment to helping every client look and feel their very best.',
  },
];

export default function Philosophy({ num = '03' }) {
  return (
    <section className="section philosophy bg-blue on-dark" aria-labelledby="philosophy-title">
      <Ripples className="philosophy__ripples decor--white decor--faint" rings={8} />
      <Stones className="philosophy__stones decor--white decor--soft" data-parallax="-0.05" />

      <div className="container">
        <h2 className="eyebrow reveal" id="philosophy-title">
          <span className="eyebrow__num">{num}</span>Our philosophy
        </h2>
        <figure className="philosophy__quote">
          <blockquote>
            <p className="display reveal" style={{ '--d': 1 }}>
              “Not only do they focus on making you <em>look good,</em> they also focus on making you <em>feel good.</em>”
            </p>
          </blockquote>
          <figcaption className="reveal" style={{ '--d': 2 }}>
            — {featuredTestimonial.name}, Hera client
          </figcaption>
        </figure>

        <ol className="philosophy__list">
          {principles.map((p, i) => (
            <li key={p.title} className="reveal" style={{ '--d': i }}>
              <span className="index-num">0{i + 1}</span>
              <h3 className="h4">{p.title}</h3>
              <p className="text-soft">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
