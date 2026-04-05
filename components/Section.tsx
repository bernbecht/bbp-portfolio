type SectionProps = {
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
};

export function Section({ id, label, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined} // @TODO: add smart default
      className="scroll-mt-24 mb-24 section-grid min-[900px]:grid"
    >
      <span
        className="
        hidden 
        min-[900px]:block
        font-mono 
        text-gray-500 
        leading-9
        text-right
        "
      >
        {label}
      </span>
      <div className="content-container">
        <span
          className="
          block 
          min-[900px]:hidden
          font-mono 
        text-gray-500 
          leading-9"
        >
          {label}
        </span>
        {title && (
          <h2
            id={`${id}-title`}
            className="mb-8 text-2xl font-semibold tracking-tight"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
type ParagraphProps = {
  children: React.ReactNode;
};

export function SectionParagraph({ children }: ParagraphProps) {
  return (
    <p className={`section__paragraph text-2xl text-gray-700 mb-6`}>
      {children}
    </p>
  );
}
