import { Link } from 'react-router';
import { getCategory, treatmentPath } from '../../data/treatments.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import BookButton from '../ui/BookButton.jsx';

export default function TreatmentCard({ treatment: t, index = 0, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const portrait = t.image && t.image.height > t.image.width;

  return (
    <article className="tcard reveal" style={{ '--d': index % 3 }}>
      <Link to={treatmentPath(t)} className="tcard__link hover-zoom">
        <div className="tcard__media">
          <Media
            image={t.image}
            alt={`${t.name} treatment at Hera Wellness Studio`}
            ratio="4 / 5"
            position={portrait ? 'center top' : undefined}
            sizes="(min-width: 900px) 30vw, (min-width: 600px) 45vw, 90vw"
          />
          {(t.signature || t.recommended) && (
            <span className="tcard__tags">
              {t.signature && <span className="tag tag--solid">Signature</span>}
              {t.recommended && <span className="tag tag--light">Recommended</span>}
            </span>
          )}
        </div>
        <div className="tcard__body">
          <p className="tcard__cat">{getCategory(t.category).shortName}</p>
          <Heading className="tcard__title">{t.name}</Heading>
          {(t.summary || t.details) && <p className="tcard__summary">{t.summary ?? t.details}</p>}
        </div>
      </Link>
      <div className="tcard__foot">
        <div className="tcard__actions">
          <BookButton size="sm" treatment={t.name}>
            Book this treatment
          </BookButton>
          <Link to={treatmentPath(t)} className="tcard__go" aria-label={`${t.name} details`}>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
