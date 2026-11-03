import PageHero from '../components/layout/PageHero.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import { fullAddress } from '../data/site.js';

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[['Home', '/'], ['Contact', '/contact/']]}
        eyebrow="Contact & booking"
        title={
          <>
            Let’s plan your <em>visit.</em>
          </>
        }
        intro={`Hera Wellness Studio, ${fullAddress}. Request a consultation call or book a time below.`}
      />
      <ContactSection />
    </>
  );
}
