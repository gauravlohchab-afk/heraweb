import Icon from './Icon.jsx';

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

// Five stars, each filled by its share of the rating (4.5 fills the last by half).
function Rating({ value }) {
  return (
    <span className="rating" role="img" aria-label={`Rated ${value} out of 5`}>
      <span className="rating__stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="rating__star">
            <Icon name="star" />
            <span className="rating__fill" style={{ width: `${Math.min(1, Math.max(0, value - i)) * 100}%` }}>
              <Icon name="star" />
            </span>
          </span>
        ))}
      </span>
      <span className="rating__value">{value}/5</span>
    </span>
  );
}

// Text review card. Shows the client's photo and rating when supplied;
// otherwise a letter avatar and no stars.
export default function ReviewQuote({ review: r, index = 0 }) {
  return (
    <figure className="quote reveal" style={{ '--d': index }}>
      <div className="quote__top">
        <Icon name="quote" />
        {r.rating != null && <Rating value={r.rating} />}
      </div>
      <blockquote>
        <p>{r.quote}</p>
      </blockquote>
      <figcaption>
        {r.photo ? (
          <img className="quote__avatar" src={r.photo} width="56" height="56" alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="quote__avatar" aria-hidden="true">
            {initials(r.name)}
          </span>
        )}
        <span>
          <span className="quote__name">{r.name}</span>
          <span className="quote__source">{r.source}</span>
        </span>
      </figcaption>
    </figure>
  );
}
