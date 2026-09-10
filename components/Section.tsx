interface SectionProps {
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}

export function Section({ id, label, title, children, tone = 'light' }: Readonly<SectionProps>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-${title ? 'title' : 'label'}`}
      className={`scroll-mt-24 section-space ${tone === 'dark' ? 'bg-inverse text-on-inverse' : ''}`}
    >
      <div className="content-container">
        <p id={`${id}-label`} className={`type-label mb-6 ${tone === 'dark' ? 'text-inverse-muted' : 'text-muted'}`}>{label}</p>
        {title && <h2 id={`${id}-title`} className="type-heading mb-8">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

interface ParagraphProps {
  children: React.ReactNode;
}

export function SectionParagraph({ children }: Readonly<ParagraphProps>) {
  return <p className="section__paragraph type-body mb-6">{children}</p>;
}
