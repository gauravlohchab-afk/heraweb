import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { brand } from '../../data/media.js';
import { site } from '../../data/site.js';
import { categories, categoryPath, treatmentsIn } from '../../data/treatments.js';
import Icon from '../ui/Icon.jsx';
import BookButton from '../ui/BookButton.jsx';
import Socials from '../ui/Socials.jsx';

export const navLinks = [
  ['About', '/about/'],
  ['Reviews', '/reviews/'],
  ['Contact', '/contact/'],
];

function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" aria-label="Hera Wellness Studio — home" onClick={onClick}>
      <img
        className="brand__logo"
        src={brand.logo.src}
        srcSet={brand.logo.srcSet}
        sizes="120px"
        width={brand.logo.width}
        height={brand.logo.height}
        alt="Hera Wellness Studio"
      />
    </Link>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on navigation
  useEffect(close, [location, close]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll lock, Escape, focus trap; focus returns to the menu button on close
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const burger = burgerRef.current;
    document.body.classList.add('is-locked');
    drawer.querySelector(FOCUSABLE)?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [...drawer.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
      burger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Brand />

          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              <li className="nav__item nav__item--drop">
                <NavLink to="/treatments/" className="nav__link">
                  Treatments <Icon name="chevron" />
                </NavLink>
                <div className="nav__menu">
                  <ul>
                    {categories.map((c, i) => (
                      <li key={c.slug}>
                        <Link to={categoryPath(c.slug)} className="nav__menu-link">
                          <span className="index-num">0{i + 1}</span>
                          {c.name}
                          <small>{treatmentsIn(c.slug).length}</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/treatments/" className="nav__menu-all">
                    All treatments <Icon name="arrow" />
                  </Link>
                </div>
              </li>
              {navLinks.map(([label, to]) => (
                <li key={to} className="nav__item">
                  <NavLink to={to} className="nav__link">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <BookButton size="sm" variant="dark" className="site-header__cta">
            Book now
          </BookButton>

          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-drawer"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Drawer lives outside the header: the header's backdrop-filter would
          otherwise trap this fixed-position panel inside its own box. */}
      <div className={`drawer${open ? ' is-open' : ''}`} inert={!open}>
        <button type="button" className="drawer__backdrop" tabIndex={-1} aria-hidden="true" onClick={close} />
        <div ref={drawerRef} id="site-drawer" className="drawer__panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="drawer__top">
            <Brand onClick={close} />
            <button type="button" className="drawer__close" onClick={close} aria-label="Close menu">
              <Icon name="close" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <p className="drawer__label">Treatments</p>
            <ul>
              {categories.map((c, i) => (
                <li key={c.slug} style={{ '--i': i }}>
                  <Link to={categoryPath(c.slug)} className="drawer__link" onClick={close}>
                    {c.name} <small>{treatmentsIn(c.slug).length}</small>
                  </Link>
                </li>
              ))}
              <li style={{ '--i': 3 }}>
                <Link to="/treatments/" className="drawer__link" onClick={close}>
                  All treatments <Icon name="arrow" />
                </Link>
              </li>
            </ul>
            <p className="drawer__label">Studio</p>
            <ul>
              <li style={{ '--i': 4 }}>
                <Link to="/" className="drawer__link" onClick={close}>Home</Link>
              </li>
              {navLinks.map(([label, to], i) => (
                <li key={to} style={{ '--i': i + 5 }}>
                  <Link to={to} className="drawer__link" onClick={close}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Close the drawer before the booking popup opens */}
          <div className="drawer__foot" onClickCapture={(e) => e.target.closest('[aria-haspopup="dialog"]') && close()}>
            <BookButton className="btn--block" />
            <a href={`mailto:${site.email}`} className="drawer__mail">{site.email}</a>
            <Socials />
          </div>
        </div>
      </div>
    </>
  );
}
