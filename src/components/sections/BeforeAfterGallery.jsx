import { useState } from 'react';
import { beforeAfter } from '../../data/media.js';
import { categories, treatments } from '../../data/treatments.js';
import BeforeAfterSlider from './BeforeAfterSlider.jsx';

// Until real pairs are added to media.js, show labelled placeholders per category.
// Interleaved (face, body, hair, face, …) so any preview shows every category.
const placeholderPairs = [1, 2].flatMap((n) =>
  categories.map((c) => ({ key: `${c.slug}-${n}`, category: c.slug, title: `${c.name} result ${n}`, label: c.name })),
);

const realPairs = beforeAfter.map((p, i) => {
  const t = treatments.find((x) => x.slug === p.treatment);
  return { ...p, key: `${p.treatment}-${i}`, category: t?.category, title: t?.name ?? 'Treatment result', label: t?.name };
});

/**
 * Before & after grid with optional category filter. `limit` trims the list
 * (home preview); `filters` shows the category chips (results page).
 */
export default function BeforeAfterGallery({ limit, filters = false }) {
  const [filter, setFilter] = useState('all');
  const hasResults = realPairs.length > 0;
  const all = hasResults ? realPairs : placeholderPairs;
  const shown = (filter === 'all' ? all : all.filter((p) => p.category === filter)).slice(0, limit ?? all.length);

  return (
    <div className="ba-gallery">
      {filters && (
        <div className="chips ba-gallery__filters" role="group" aria-label="Filter results by category">
          {[{ slug: 'all', name: 'All results' }, ...categories].map((c) => (
            <button key={c.slug} type="button" className="chip" aria-pressed={filter === c.slug} onClick={() => setFilter(c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className={`ba-gallery__grid ba-gallery__grid--${Math.min(shown.length, 3)}`}>
        {shown.map((p, i) => (
          <figure key={p.key} className="ba-item reveal" style={{ '--d': i % 3 }}>
            <BeforeAfterSlider before={p.before} after={p.after} title={p.title} />
            <figcaption>
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <strong>{p.label}</strong>
              {p.illustrative ? <span>Illustrative example</span> : p.caption && <span>{p.caption}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      {!hasResults && <p className="ba-note">Real client before-and-after photos are being prepared and will appear here.</p>}
    </div>
  );
}
