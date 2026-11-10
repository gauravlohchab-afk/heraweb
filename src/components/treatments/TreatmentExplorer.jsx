import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { categories, treatmentPath, treatmentsIn } from '../../data/treatments.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import BookButton from '../ui/BookButton.jsx';

/**
 * Home-page treatments, as an editorial index: category pills over a large
 * featured image beside a numbered list. Hovering or focusing a row swaps the
 * featured treatment; every row links to its page. On phones the image stage
 * is dropped and each row carries a thumbnail instead.
 * Every panel is in the HTML; inactive ones are hidden.
 */
export default function TreatmentExplorer() {
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const selectTab = (i) => {
    setTab(i);
    setActive(0);
  };

  const onTabKey = (e, i) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + categories.length) % categories.length;
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="tx reveal">
      <div className="tx__bar">
        <div className="tx__tabs" role="tablist" aria-label="Treatment categories">
          {categories.map((c, i) => (
            <button
              key={c.slug}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${c.slug}`}
              aria-selected={i === tab}
              aria-controls={`panel-${c.slug}`}
              tabIndex={i === tab ? 0 : -1}
              className="tx__tab"
              onClick={() => selectTab(i)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <span className="tx__tab-full">{c.name}</span>
              <span className="tx__tab-short">{c.shortName}</span>
              <span className="tx__count">{treatmentsIn(c.slug).length}</span>
            </button>
          ))}
        </div>

        <Link to="/treatments/" className="link-arrow tx__all">
          View all treatments <Icon name="arrow" />
        </Link>
      </div>

      {categories.map((c, i) => {
        const items = treatmentsIn(c.slug);
        const current = items[i === tab ? active : 0] ?? items[0];
        return (
          <div key={c.slug} id={`panel-${c.slug}`} role="tabpanel" aria-labelledby={`tab-${c.slug}`} className="tx__panel" hidden={i !== tab}>
            {/* Featured image stage (tablet and up). Images are stacked and crossfade. */}
            <div className="tx__stage">
              {items.map((t) => (
                <Media
                  key={t.slug}
                  image={t.image}
                  alt=""
                  ratio="4 / 5"
                  className={`tx__shot${t === current ? ' is-active' : ''}`}
                  sizes="(min-width: 900px) 45vw, 100vw"
                  aria-hidden="true"
                />
              ))}
              <div className="tx__overlay">
                <p className="tx__kicker">
                  <span>{String(items.indexOf(current) + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
                  {current.signature && <span className="tx__badge">Signature</span>}
                  {current.recommended && <span className="tx__badge">Recommended</span>}
                </p>
                <h3 className="tx__name">
                  {current.name}
                </h3>
                {(current.summary || current.details) && <p className="tx__summary">{current.summary ?? current.details}</p>}
                <div className="tx__cta">
                  <BookButton size="sm" variant="light" treatment={current.name}>
                    Book now
                  </BookButton>
                  <Link to={treatmentPath(current)} className="tx__details">
                    View details <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="tx__side">
              <p className="tx__intro">{c.intro}</p>
              <ol className="tx__list">
                {items.map((t, n) => (
                  <li key={t.slug}>
                    <Link
                      to={treatmentPath(t)}
                      className={`tx__row${t === current ? ' is-active' : ''}`}
                      onMouseEnter={() => setActive(n)}
                      onFocus={() => setActive(n)}
                    >
                      <span className="tx__thumb" aria-hidden="true">
                        <Media image={t.image} alt="" ratio="1 / 1" sizes="64px" />
                      </span>
                      <span className="tx__num">{String(n + 1).padStart(2, '0')}</span>
                      <span className="tx__row-text">
                        <span className="tx__row-name">{t.name}</span>
                        {(t.summary || t.details) && <span className="tx__row-sum">{t.summary ?? t.details}</span>}
                      </span>
                      <span className="tx__go" aria-hidden="true">
                        <Icon name="arrow" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
}
