import { center } from '../../data/media.js';
import Media from '../ui/Media.jsx';
import BookButton from '../ui/BookButton.jsx';
import { Ripples } from '../decor/Decor.jsx';

// Headline from the studio's Pico Laser creative: "Ready for radiant results? Book now".
export default function BookingCTA() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-band__media" aria-hidden="true">
        <Media image={center.bed} alt="" sizes="(min-width: 900px) 40vw, 100vw" data-parallax="0.06" />
      </div>
      <div className="cta-band__body">
        <Ripples className="cta-band__ripples decor--blue decor--faint" />
        <p className="eyebrow reveal">Book your visit</p>
        <h2 className="display reveal" id="cta-title" style={{ '--d': 1 }}>
          Ready for <em>radiant results?</em>
        </h2>
        <p className="text-soft reveal" style={{ '--d': 2 }}>
          Book a time online or request a consultation call — we’ll help you choose the right treatment. All payment methods accepted.
        </p>
        <div className="cluster btn-row reveal" style={{ '--d': 3 }}>
          <BookButton variant="dark">Book a treatment</BookButton>
          <BookButton variant="ghost" mode="call">
            Request a consultation call
          </BookButton>
        </div>
      </div>
    </section>
  );
}
