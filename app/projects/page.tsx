import { SectionParagraph } from '@/components/Section';
import type { ProjectEntry } from '@/lib/projects';
import { PROJECT_GROUPS } from '@/lib/projects';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';

const pageTitle = 'Projects | Bernardo Bechtold | Front-end Engineer & UI/UX Designer';
const pageDescription =
  'Selected client work and side projects—links, timelines, and short notes on what shipped.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/projects',
    type: 'website',
    images: [
      {
        url: '/profile.jpeg',
        width: 100,
        height: 100,
        alt: 'Bernardo Bechtold, portrait',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/profile.jpeg'],
  },
};

const linkFocusClasses =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2';

function ProjectTitle({ entry }: Readonly<{ entry: ProjectEntry }>): React.ReactNode {
  const { title, href } = entry;

  if (!href) {
    return (
      <span className="text-xl font-semibold tracking-tight text-neutral-900">{title}</span>
    );
  }

  const className = `text-xl font-semibold tracking-tight text-neutral-900 underline-offset-4 decoration-neutral-400 hover:underline ${linkFocusClasses}`;

  if (href.startsWith('/')) {
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

function ProjectRow({ entry }: Readonly<{ entry: ProjectEntry }>): React.ReactNode {
  const companyLine = entry.company?.trim();
  const tagItems = (entry.tags ?? []).filter((tag) => tag.trim().length > 0);

  return (
    <li className="border-b border-neutral-200 py-8 last:border-b-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <ProjectTitle entry={entry} />
          {companyLine ? (
            <p className="mt-1 text-sm text-neutral-500">{companyLine}</p>
          ) : null}
        </div>
        <span className="block shrink-0 font-mono text-sm text-gray-500 sm:text-right">
          {entry.period}
        </span>
      </div>
      {tagItems.length > 0 ? (
        <ul
          className="mt-3 flex list-none flex-wrap gap-2 p-0"
          aria-label="Project tags"
        >
          {tagItems.map((tag) => (
            <li key={tag}>
              <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 font-mono text-xs text-neutral-700">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {entry.summary ? (
        <p className="section__paragraph mt-4 text-lg leading-relaxed text-gray-700">
          {entry.summary}
        </p>
      ) : null}
    </li>
  );
}

export default function ProjectsPage(): React.ReactNode {
  return (
    <div className="fade-up">
      <main className="content-container pb-24 pt-8">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900">Projects</h1>

        <SectionParagraph>
          Selected work and side projects—names, time ranges, and links where there is something to
          share publicly.
        </SectionParagraph>

        <div className="mt-12 space-y-16">
          {PROJECT_GROUPS.map((group, index) => (
            <Fragment key={group.title}>
              {index > 0 ? (
                <hr className="border-neutral-200" aria-hidden="true" />
              ) : null}
              <section aria-labelledby={`projects-group-${index}-heading`}>
                {group.monoLabel ? (
                  <p className="mb-2 font-mono text-sm leading-9 text-gray-500">{group.monoLabel}</p>
                ) : null}

                <h2
                  id={`projects-group-${index}-heading`}
                  className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900"
                >
                  {group.title}
                </h2>

                <ul className="list-none p-0">
                  {group.entries.map((entry) => (
                    <ProjectRow key={`${group.title}-${entry.title}`} entry={entry} />
                  ))}
                </ul>
              </section>
            </Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}
