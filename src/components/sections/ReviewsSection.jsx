import { Link } from 'react-router';
import { featuredTestimonial as ft, reviews } from '../../data/testimonials.js';
import SectionHead from '../ui/SectionHead.jsx';
import ReviewQuote from '../ui/ReviewQuote.jsx';
import Icon from '../ui/Icon.jsx';

// The video client's own words plus the written reviews. `writtenOnly` (home page) drops the video client's card.
const allReviews = [{ name: ft.name, source: 'Video testimonial', quote: ft.pullQuote }, ...reviews];

export default function ReviewsSection({ num = '02', writtenOnly = false }) {
  const shown = writtenOnly ? reviews : allReviews;
  return (
    <section className="section reviews-home" aria-labelledby="reviews-home-title">
      <div className="container">
        <SectionHead
          num={num}
          eyebrow="Client reviews"
          id="reviews-home-title"
          title={
            <>
              Kind words from <em>our Heranians.</em>
            </>
          }
          action={
            <Link to="/reviews/" className="link-arrow">
              All reviews <Icon name="arrow" />
            </Link>
          }
        />
        <div className={`reviews-home__grid${writtenOnly ? ' reviews-home__grid--3' : ''}`}>
          {shown.map((r, i) => (
            <ReviewQuote key={r.name} review={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
