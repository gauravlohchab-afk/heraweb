import { Outlet } from 'react-router';
import { useParallax, usePageMeta, useReveal, useScrollManager } from '../../hooks/useSiteEffects.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MobileBar from './MobileBar.jsx';
import { BookingProvider } from '../booking/BookingContext.jsx';

export default function Layout() {
  usePageMeta();
  useScrollManager();
  useReveal();
  useParallax();

  return (
    <BookingProvider>
    <div id="top">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </div>
    </BookingProvider>
  );
}
