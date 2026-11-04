import HeroSection from '../components/sections/HeroSection.jsx';
import AboutIntro from '../components/sections/AboutIntro.jsx';
import StudioFilm from '../components/sections/StudioFilm.jsx';
import Philosophy from '../components/sections/Philosophy.jsx';
import ReviewsSection from '../components/sections/ReviewsSection.jsx';
import BookingCTA from '../components/sections/BookingCTA.jsx';
import ContactPreview from '../components/sections/ContactPreview.jsx';
import TreatmentExplorer from '../components/treatments/TreatmentExplorer.jsx';
import SectionHead from '../components/ui/SectionHead.jsx';
import { Ripples } from '../components/decor/Decor.jsx';
import { treatments } from '../data/treatments.js';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="section bg-soft treatments-home" aria-labelledby="treatments-title">
        <Ripples className="treatments-home__ripples decor--faint" rings={7} />
        <div className="container">
          <SectionHead
            num="01"
            eyebrow="Treatments"
            id="treatments-title"
            title={
              <>
                Face, body <em>&amp; hair.</em>
              </>
            }
            intro={`${treatments.length} treatments across three categories. Choose a category, then open any treatment for its photos, videos and details.`}
          />
          <TreatmentExplorer />
        </div>
      </section>

      <ReviewsSection num="02" writtenOnly />
      <AboutIntro num="03" />
      <StudioFilm num="" />
      <Philosophy num="04" />
      <BookingCTA />
      <ContactPreview num="05" />
    </>
  );
}
