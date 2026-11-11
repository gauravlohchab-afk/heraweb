import { useState } from 'react';
import Media, { Placeholder } from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import MediaDialog from '../ui/MediaDialog.jsx';

// Square frame; portrait creatives are shown whole rather than cropped.
const fitFor = (item) => (item.height > item.width ? 'contain' : undefined);

/**
 * Treatment media gallery: featured item, thumbnails for every image and
 * video, and a full-screen viewer. Works with any number of items, including
 * none (branded placeholder).
 */
export default function TreatmentGallery({ media, name }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(null);
  const items = media.map((m, i) => ({
    ...m,
    alt:
      m.type !== 'image'
        ? m.title
        : m.generated
          ? `Illustrative image of the ${name} treatment`
          : `${name} at Hera Wellness Studio — image ${i + 1}`,
  }));

  if (!items.length) {
    return (
      <div className="gallery">
        <Placeholder ratio="1 / 1" />
      </div>
    );
  }

  const current = items[active];
  const isVideo = current.type === 'video';

  return (
    <div className="gallery">
      <button
        type="button"
        className={`gallery__main${isVideo ? ' gallery__main--video' : ''}`}
        onClick={() => setViewer(active)}
      >
        <span className="visually-hidden">{isVideo ? `Play video: ${current.title}` : `View ${name} image ${active + 1} full screen`}</span>
        {isVideo ? (
          <div className="media" style={{ '--ratio': '1 / 1', background: 'var(--c-black)' }}>
            <img src={current.poster} alt="" loading="lazy" decoding="async" style={{ objectFit: 'contain' }} />
            <span className="video-poster__play" aria-hidden="true">
              <Icon name="play" />
            </span>
          </div>
        ) : (
          <Media image={current} alt={current.alt ?? `${name} treatment at Hera Wellness Studio, Quezon City${items.length > 1 ? ` (photo ${active + 1})` : ''}`} fit={fitFor(current)} sizes="(min-width: 900px) 50vw, 100vw" priority={active === 0} />
        )}
        {items.length > 1 && (
          <span className="gallery__count" aria-hidden="true">
            {active + 1} / {items.length}
          </span>
        )}
        {!isVideo && (
          <span className="gallery__expand" aria-hidden="true">
            <Icon name="expand" />
          </span>
        )}
      </button>

      {items.length > 1 && (
        <ul className="gallery__thumbs" aria-label={`${name} media`}>
          {items.map((m, i) => (
            <li key={m.src + i}>
              <button
                type="button"
                className="gallery__thumb"
                aria-current={i === active}
                aria-label={m.type === 'video' ? `Show video ${i + 1}: ${m.title}` : `Show image ${i + 1}`}
                onClick={() => setActive(i)}
              >
                <img src={m.type === 'video' ? m.poster : m.thumb ?? m.src} width="120" height="120" alt="" loading="lazy" decoding="async" />
                {m.type === 'video' && (
                  <span className="gallery__thumb-play" aria-hidden="true">
                    <Icon name="play" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <MediaDialog items={items} index={viewer} onChange={(i) => { setViewer(i); setActive(i); }} onClose={() => setViewer(null)} title={name} />
    </div>
  );
}
