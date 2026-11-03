import { site, fullAddress, mapEmbedUrl, mapLinkUrl } from '../../data/site.js';
import Icon from '../ui/Icon.jsx';
import Socials from '../ui/Socials.jsx';
import BookButton from '../ui/BookButton.jsx';
import BookingPanel from '../booking/BookingPanel.jsx';

export function ContactDetails() {
  return (
    <ul className="detail-list">
      <li>
        <Icon name="pin" />
        <span>
          <span className="detail-list__label">Studio</span>
          <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer">{fullAddress}</a>
        </span>
      </li>
      <li>
        <Icon name="chat" />
        <span>
          <span className="detail-list__label">Messenger</span>
          <a href={site.social.messenger} target="_blank" rel="noopener noreferrer">{site.handles.facebook}</a>
        </span>
      </li>
      <li>
        <Icon name="mail" />
        <span>
          <span className="detail-list__label">Email</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
      </li>
      <li>
        <Icon name="calendar" />
        <span>
          <span className="detail-list__label">Reservations</span>
          {site.booking.policy.join(' · ')}
        </span>
      </li>
    </ul>
  );
}

export function StudioMap({ className = '' }) {
  return (
    <div className={`media studio-map ${className}`}>
      <iframe
        src={mapEmbedUrl}
        title={`Map showing Hera Wellness Studio in ${site.location.locality}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

// Full contact block: details, map and booking form.
export default function ContactSection({ defaultTreatment }) {
  return (
    <section className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow reveal">Visit &amp; contact</p>
          <h2 className="h2 reveal" id="contact-title" style={{ '--d': 1 }}>
            Find us in <em>Diliman.</em>
          </h2>
          <div className="reveal" style={{ '--d': 2 }}>
            <ContactDetails />
          </div>
          <div className="cluster reveal" style={{ '--d': 3 }}>
            <BookButton />
            <Socials />
          </div>
          <StudioMap className="reveal" />
        </div>

        <div className="contact__panel reveal" id="booking">
          <h2 className="h3" id="contact-booking-title">
            Book your <em>treatment</em>
          </h2>
          <p className="text-soft">Request a consultation call, or choose a date and time for your visit.</p>
          <BookingPanel treatment={defaultTreatment} titleId="contact-booking-title" />
        </div>
      </div>
    </section>
  );
}
