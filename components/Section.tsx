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
      className="scroll-mt-24 py-24 grid grid-cols-[1fr_900px_1fr]"
    >
      <span className="block font-mono text-gray-500 text-right leading-9">
        {label}
      </span>
      <div className="w-[var(--layout-nav)] px-4">
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
