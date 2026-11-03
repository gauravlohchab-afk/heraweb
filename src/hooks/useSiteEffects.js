import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageMeta } from '../data/seo.js';
import { SITE_URL } from '../data/site.js';

// Keeps <title>, description and canonical in sync on client-side navigation.
// The initial values come from the prerendered HTML.
export function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}${meta.path}`);
  }, [pathname]);
}

// Scroll to top on page change, or to the #hash target when present.
export function useScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
}

// Phones get a calmer page: no scroll reveals and no parallax (see booking.css).
const isPhone = () => window.matchMedia('(max-width: 767px)').matches;

// Reveal-on-scroll for .reveal, .reveal-img and decorative SVGs (.decor).
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!('IntersectionObserver' in window) || isPhone()) return;
    document.documentElement.classList.add('reveal-ready');
    const els = document.querySelectorAll('.reveal:not(.is-visible), .reveal-img:not(.is-visible), .decor:not(.is-visible)');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

// Subtle parallax: elements with data-parallax="0.08" drift against the scroll.
export function useParallax() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isPhone()) return;
    const els = [...document.querySelectorAll('[data-parallax]')];
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const offset = (rect.top + rect.height / 2 - vh / 2) * Number(el.dataset.parallax);
        el.style.setProperty('--py', `${offset.toFixed(1)}px`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);
}
