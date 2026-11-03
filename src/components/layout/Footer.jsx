import { Link } from 'react-router';
import { brand } from '../../data/media.js';
import { site, fullAddress, mapLinkUrl } from '../../data/site.js';
import { categories, categoryPath } from '../../data/treatments.js';
import { navLinks } from './Header.jsx';
import Socials from '../ui/Socials.jsx';
import BookButton from '../ui/BookButton.jsx';
import { Branch, Ripples } from '../decor/Decor.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Ripples className="footer__ripples decor--faint" />
      <Branch className="footer__branch decor--blue decor--soft decor--hide-m" />
      <div className="container">
        <div className="footer__cta">
          <p className="display">
            Discover your <em>best self.</em>
          </p>
          <BookButton variant="dark" />
        </div>

        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" aria-label="Hera Wellness Studio — home">
              <img
                className="footer__logo"
                src={brand.logo.src}
                srcSet={brand.logo.srcSet}
                sizes="200px"
                width={brand.logo.width}
                height={brand.logo.height}
                alt="Hera Wellness Studio"
                loading="lazy"
              />
            </Link>
            <p className="text-soft">{site.intro}</p>
            <Socials />
          </div>

          <nav aria-labelledby="footer-studio">
            <h2 className="footer__heading" id="footer-studio">Studio</h2>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              {navLinks.map(([label, to]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-treatments">
            <h2 className="footer__heading" id="footer-treatments">Treatments</h2>
            <ul className="footer__links">
              {categories.map((c) => (
                <li key={c.slug}><Link to={categoryPath(c.slug)}>{c.name}</Link></li>
              ))}
              <li><Link to="/treatments/">All treatments</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Visit</h2>
            <address className="footer__links">
              <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer">{fullAddress}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.social.messenger} target="_blank" rel="noopener noreferrer">Message us on Messenger</a>
              <span>Online reservations only</span>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="footer__sign">Be one of our Heranians.</p>
          <nav className="footer__legal" aria-label="Footer utility">
            <Link to="/sitemap/">Sitemap</Link>
            <a href="#top">Back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
