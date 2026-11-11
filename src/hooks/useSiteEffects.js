import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageMeta } from '../data/seo.js';
import { SITE_URL, site } from '../data/site.js';
import { brand } from '../data/media.js';

// Keep page metadata in sync on client-side navigation. The initial values come
// from the prerendered HTML.
export function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getPageMeta(pathname);
    const url = `${SITE_URL}${meta.path}`;
    const image = `${SITE_URL}${meta.image ?? brand.ogImage}`;

    document.title = meta.title;

    const setMeta = (attribute, key, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (meta.noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = url;
    }

    [
      ['og:type', 'website'],
      ['og:site_name', site.name],
      ['og:title', meta.title],
      ['og:description', meta.description],
      ['og:url', url],
      ['og:image', image],
      ['og:image:alt', meta.title],
      ['og:image:width', '1200'],
      ['og:image:height', '630'],
      ['og:locale', 'en_PH'],
    ].forEach(([key, value]) => setMeta('property', key, value));

    [
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', meta.title],
      ['twitter:description', meta.description],
      ['twitter:image', image],
    ].forEach(([key, value]) => setMeta('name', key, value));

    let jsonLd = document.getElementById('page-jsonld');
    if (!meta.jsonLd) {
      jsonLd?.remove();
    } else {
      if (!jsonLd) {
        jsonLd = document.createElement('script');
        jsonLd.id = 'page-jsonld';
        jsonLd.type = 'application/ld+json';
        document.head.append(jsonLd);
      }
      jsonLd.textContent = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
    }
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
