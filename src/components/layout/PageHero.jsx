import Breadcrumbs from '../ui/Breadcrumbs.jsx';
import { Branch, Ripples } from '../decor/Decor.jsx';

// Inner-page hero: breadcrumbs, label, large heading, intro, optional extras.
export default function PageHero({ breadcrumbs, eyebrow, title, intro, children, aside }) {
  return (
    <section className={`page-hero${aside ? ' page-hero--aside' : ''}`}>
      <Ripples className="page-hero__ripples decor--faint" rings={7} />
      <Branch className="page-hero__branch decor--soft decor--hide-m" data-parallax="-0.06" />
      <div className="container page-hero__grid">
        <div className="page-hero__content">
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && <p className="eyebrow enter">{eyebrow}</p>}
          <h1 className="h1 page-hero__title">
            <span className="line-mask">
              <span style={{ '--d': 1 }}>{title}</span>
            </span>
          </h1>
          {intro && <p className="lede text-soft enter" style={{ '--d': 3 }}>{intro}</p>}
          {children}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  );
}
