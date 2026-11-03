import { Link } from 'react-router';
import { center } from '../../data/media.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import { ContactDetails, StudioMap } from './ContactSection.jsx';

// Home-page location preview; the full form lives on /contact/.
export default function ContactPreview({ num = '06' }) {
  return (
    <section className="section contact-preview" aria-labelledby="visit-title">
      <div className="container contact-preview__grid">
        <div className="contact-preview__text">
          <p className="eyebrow reveal">
            <span className="eyebrow__num">{num}</span>Visit the studio
          </p>
          <h2 className="h2 reveal" id="visit-title" style={{ '--d': 1 }}>
            Your wellness journey <em>starts here.</em>
          </h2>
          <div className="reveal" style={{ '--d': 2 }}>
            <ContactDetails />
          </div>
          <div className="cluster reveal" style={{ '--d': 3 }}>
            <Link to="/contact/" className="btn btn--dark">
              Contact &amp; booking <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="contact-preview__visual">
          <Media image={center.entrance} ratio="4 / 5" className="contact-preview__photo reveal-img" sizes="(min-width: 900px) 24vw, 60vw" />
          <StudioMap className="contact-preview__map reveal" />
        </div>
      </div>
    </section>
  );
}
