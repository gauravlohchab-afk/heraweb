import { Link, useParams } from 'react-router';
import { categories, categoryPath, getCategory, treatmentsIn } from '../data/treatments.js';
import PageHero from '../components/layout/PageHero.jsx';
import TreatmentCard from '../components/treatments/TreatmentCard.jsx';
import BookingCTA from '../components/sections/BookingCTA.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import { categoryFaqs } from '../data/faqs.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function CategoryPage() {
  const { category: slug } = useParams();
  const category = getCategory(slug);
  if (!category) return <NotFoundPage />;
  const items = treatmentsIn(slug);

  return (
    <>
      <PageHero
        breadcrumbs={[['Home', '/'], ['Treatments', '/treatments/'], [category.name, categoryPath(slug)]]}
        eyebrow={`${items.length} treatments`}
        title={category.name}
        intro={category.intro}
      >
        <nav className="chips enter" style={{ '--d': 4 }} aria-label="Treatment categories">
          {categories.map((c) => (
            <Link key={c.slug} to={categoryPath(c.slug)} className="chip" aria-current={c.slug === slug ? 'page' : undefined}>
              {c.name}
            </Link>
          ))}
          <Link to="/treatments/" className="chip">
            All treatments
          </Link>
        </nav>
      </PageHero>

      <section className="section section--tight" aria-label={`${category.name} list`}>
        <div className="container">
          <div className="tcard-grid">
            {items.map((t, i) => (
              <TreatmentCard key={t.slug} treatment={t} index={i} headingLevel={2} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        className="bg-soft"
        faqs={categoryFaqs(category)}
        title={
          <>
            {category.name}, <em>answered.</em>
          </>
        }
      />

      <BookingCTA />
    </>
  );
}
