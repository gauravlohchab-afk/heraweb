import Icon from './Icon.jsx';

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

// Text review card with a letter avatar (no client photos).
export default function ReviewQuote({ review: r, index = 0 }) {
  return (
    <figure className="quote reveal" style={{ '--d': index }}>
      <Icon name="quote" />
      <blockquote>
        <p>{r.quote}</p>
      </blockquote>
      <figcaption>
        <span className="quote__avatar" aria-hidden="true">
          {initials(r.name)}
        </span>
        <span>
          <span className="quote__name">{r.name}</span>
          <span className="quote__source">{r.source}</span>
        </span>
      </figcaption>
    </figure>
  );
}
