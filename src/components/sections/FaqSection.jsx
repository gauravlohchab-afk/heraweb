import SectionHead from '../ui/SectionHead.jsx';

/**
 * Question-and-answer list built on <details>, so every answer is in the
 * prerendered HTML (for search engines and AI assistants) while staying
 * collapsed for readers. The same items are emitted as FAQPage JSON-LD in seo.js.
 */
export default function FaqSection({ faqs, num, eyebrow = 'Questions', title, intro, id = 'faq-title', className = '' }) {
  return (
    <section className={`section faq ${className}`} aria-labelledby={id}>
      <div className="container faq__grid">
        <SectionHead num={num} eyebrow={eyebrow} id={id} title={title} intro={intro} align="center" className="faq__head" />
        <div className="faq__list">
          {faqs.map(({ q, a }, i) => (
            <details key={q} className="faq__item" open={i === 0}>
              <summary className="faq__q">
                <span>{q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p className="faq__a">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
