import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { categories, categoryPath, treatmentsIn } from '../../data/treatments.js';
import TreatmentCard from './TreatmentCard.jsx';
import Icon from '../ui/Icon.jsx';

/**
 * Home-page treatments: category tabs over a carousel of treatment cards,
 * with arrows and page dots. Every panel is in the HTML; inactive ones are hidden.
 */
export default function TreatmentExplorer() {
  const [tab, setTab] = useState(0);
  const [pager, setPager] = useState({ pages: 0, page: 0 });
  const tabRefs = useRef([]);
  const railRefs = useRef([]);

  // Cards visible at once in the active rail, and the distance between card starts.
  const metrics = useCallback(() => {
    const rail = railRefs.current[tab];
    const cards = rail?.children;
    if (!cards?.length) return null;
    const stride = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
    const perView = Math.max(1, Math.floor((rail.clientWidth + 1) / stride));
    return { rail, cards, stride, perView, pages: Math.ceil(cards.length / perView) };
  }, [tab]);

  const update = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const atEnd = m.rail.scrollLeft >= m.rail.scrollWidth - m.rail.clientWidth - 2;
    const page = atEnd ? m.pages - 1 : Math.min(m.pages - 1, Math.round(m.rail.scrollLeft / (m.stride * m.perView)));
    setPager((p) => (p.pages === m.pages && p.page === page ? p : { pages: m.pages, page }));
  }, [metrics]);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const goTo = (page) => {
    const m = metrics();
    if (!m) return;
    const target = Math.max(0, Math.min(page, m.pages - 1));
    const card = m.cards[target * m.perView];
    m.rail.scrollTo({ left: card.offsetLeft - m.cards[0].offsetLeft, behavior: 'smooth' });
  };

  const onTabKey = (e, i) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + categories.length) % categories.length;
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <div className="explorer__tabs" role="tablist" aria-label="Treatment categories">
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
              className="explorer__tab"
              onClick={() => setTab(i)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <span className="explorer__tab-full">{c.name}</span>
              <span className="explorer__tab-short">{c.shortName}</span>
              <small>{treatmentsIn(c.slug).length}</small>
            </button>
          ))}
        </div>
        <div className="explorer__arrows">
          <button type="button" className="explorer__arrow" onClick={() => goTo(pager.page - 1)} disabled={pager.page === 0} aria-label="Previous treatments">
            <Icon name="arrow" />
          </button>
          <button type="button" className="explorer__arrow" onClick={() => goTo(pager.page + 1)} disabled={pager.page >= pager.pages - 1} aria-label="Next treatments">
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      {categories.map((c, i) => (
        <div
          key={c.slug}
          id={`panel-${c.slug}`}
          role="tabpanel"
          aria-labelledby={`tab-${c.slug}`}
          className="explorer__panel"
          hidden={i !== tab}
        >
          <p className="text-soft explorer__intro">{c.intro}</p>
          <div className="explorer__rail" ref={(el) => (railRefs.current[i] = el)} onScroll={i === tab ? update : undefined}>
            {treatmentsIn(c.slug).map((t) => (
              <TreatmentCard key={t.slug} treatment={t} />
            ))}
          </div>
        </div>
      ))}

      {/* Space is reserved before hydration so the dots don't shift the layout. */}
      <div className="explorer__dots">
        {pager.pages > 1 &&
          Array.from({ length: pager.pages }, (_, p) => (
            <button
              key={p}
              type="button"
              className="explorer__dot"
              aria-label={`Show treatments ${p + 1} of ${pager.pages}`}
              aria-current={p === pager.page}
              onClick={() => goTo(p)}
            />
          ))}
      </div>

      <div className="cluster explorer__actions">
        <Link to={categoryPath(categories[tab].slug)} className="btn">
          Explore {categories[tab].name.toLowerCase()} <Icon name="arrow" />
        </Link>
        <Link to="/treatments/" className="link-arrow">
          All treatments <Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}
