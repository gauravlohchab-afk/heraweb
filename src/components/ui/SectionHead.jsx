// Editorial section header: numbered label, heading, optional intro or action.
export default function SectionHead({ num, eyebrow, title, intro, action, id, level = 2, align = 'split', className = '' }) {
  const Heading = `h${level}`;
  const side = intro ? <p className="section-head__intro text-soft reveal" style={{ '--d': 2 }}>{intro}</p> : action;

  return (
    <header className={`section-head section-head--${align} ${className}`}>
      <div className="stack-lg">
        {eyebrow && (
          <p className="eyebrow reveal">
            {num && <span className="eyebrow__num">{num}</span>}
            {eyebrow}
          </p>
        )}
        <Heading className="h2 reveal" id={id} style={{ '--d': 1 }}>
          {title}
        </Heading>
        {align === 'center' && side}
      </div>
      {align !== 'center' && side && <div className="reveal" style={{ '--d': 2 }}>{side}</div>}
    </header>
  );
}
