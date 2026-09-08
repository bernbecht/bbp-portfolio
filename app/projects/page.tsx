import type { ProjectEntry } from "@/lib/projects";
import { PROJECT_GROUPS } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

const pageTitle =
  "Projects | Bernardo Bechtold | Front-end Engineer & UI/UX Designer";
const pageDescription =
  "Selected client work and side projects—links, timelines, and short notes on what shipped.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/projects",
    type: "website",
    images: [
      {
        url: "/profile.jpeg",
        width: 100,
        height: 100,
        alt: "Bernardo Bechtold, portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/profile.jpeg"],
  },
};

const linkFocusClasses =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

function ProjectTitle({
  entry,
}: Readonly<{ entry: ProjectEntry }>): React.ReactNode {
  const { title, href } = entry;
  const journalSlug = entry.journalSlug?.trim();
  const journalHref = journalSlug ? `/projects/${journalSlug}` : null;

  const className = `text-xl font-semibold tracking-tight text-foreground underline-offset-4 decoration-muted hover:underline ${linkFocusClasses}`;

  if (journalHref) {
    return (
      <Link href={journalHref} className={className}>
        {title}
      </Link>
    );
  }

  if (!href) {
    return (
      <span className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </span>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {title}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {title}
    </a>
  );
}

function ProjectRow({
  entry,
}: Readonly<{ entry: ProjectEntry }>): React.ReactNode {
  const companyLine = entry.company?.trim();
  // const tagItems = (entry.tags ?? []).filter((tag) => tag.trim().length > 0);
  const journalSlug = entry.journalSlug?.trim();
  const journalHref = journalSlug ? `/projects/${journalSlug}` : null;
  const href = entry.href?.trim();
  const showSecondaryHref = Boolean(
    journalHref && href && href !== journalHref,
  );
  const secondaryClassName = `text-sm font-medium text-secondary underline-offset-4 decoration-muted hover:underline ${linkFocusClasses}`;

  return (
    <li className="border-b border-subtle py-8 last:border-b-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <ProjectTitle entry={entry} />
          {companyLine ? (
            <p className="mt-1 text-sm text-muted">{companyLine}</p>
          ) : null}
        </div>
        <span className="block shrink-0 type-meta text-muted sm:text-right">
          {entry.period}
        </span>
      </div>
      {/* {tagItems.length > 0 ? (
        <ul
          className="mt-3 flex list-none flex-wrap gap-2 p-0"
          aria-label="Project tags"
        >
          {tagItems.map((tag) => (
            <li key={tag}>
              <span className="inline-flex rounded-full border border-subtle bg-surface px-2.5 py-0.5 font-mono text-xs text-secondary">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null} */}
      {entry.summary ? (
        <p className="section__paragraph mt-4 type-body text-secondary">
          {entry.summary}
        </p>
      ) : null}
      {showSecondaryHref && href ? (
        <p className="mt-3">
          {href.startsWith("/") ? (
            <Link href={href} className={secondaryClassName}>
              {href === "/" ? "Site home" : "Related page"}
            </Link>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryClassName}
            >
              Project link
            </a>
          )}
        </p>
      ) : null}
    </li>
  );
}

export default function ProjectsPage(): React.ReactNode {
  return (
    <div className="fade-up">
      <main className="content-container">
        <section className="pb-12">
          <h1 className="mb-4 text-4xl font-bold font-mono tracking-tight text-foreground">
            Projects
          </h1>
          <p className="type-body text-muted">
            Things I have made or learned at the companies I have worked for.
          </p>
        </section>
        <section>
          {PROJECT_GROUPS.map((group, index) => (
            <Fragment key={group.title}>
              {index > 0 ? (
                <hr className="border-subtle" aria-hidden="true" />
              ) : null}
              <section aria-labelledby={`projects-group-${index}-heading`}>
                {group.monoLabel ? (
                  <p className="mb-2 type-meta leading-9 text-muted">
                    {group.monoLabel}
                  </p>
                ) : null}

                <h2
                  id={`projects-group-${index}-heading`}
                  className="font-mono tracking-tight text-muted border-b border-subtle pb-4"
                >
                  {group.title}
                </h2>

                <ul className="list-none p-0">
                  {group.entries.map((entry) => {
                    return (
                      entry.active && (
                        <ProjectRow
                          key={`${group.title}-${entry.title}`}
                          entry={entry}
                        />
                      )
                    );
                  })}
                </ul>
              </section>
            </Fragment>
          ))}
        </section>
      </main>
    </div>
  );
}
