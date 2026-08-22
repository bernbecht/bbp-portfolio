type SectionProps = {
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
};

export function Section({ id, label, title, children, tone = "light" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined} // @TODO: add smart default
      className={`scroll-mt-24 section-grid layout:grid ${tone === "dark" ? "bg-black py-20 text-white md:py-28" : "py-20 md:py-28"}`}
    >
      <span
        className="
        hidden 
        layout:block
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
          layout:hidden
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
    <p className="section__paragraph mb-6 text-lg leading-relaxed text-current opacity-75 md:text-xl">
      {children}
    </p>
  );
}
