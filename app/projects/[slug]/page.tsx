import { getAllSlugs, getPostBySlug } from '@/lib/project-posts';
import { cn } from '@/lib/cn';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const linkFocusClasses =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2';

type PageParams = Readonly<{
  slug: string;
}>;

type PageProps = Readonly<{
  params: Promise<PageParams>;
}>;

function formatDisplayDate(isoDate: string): string {
  const time = Date.parse(isoDate);
  if (Number.isNaN(time)) {
    return isoDate;
  }
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(time));
}

const markdownComponents: Components = {
  a: ({ href, children, title }) => {
    const className = cn(
      'text-neutral-900 underline-offset-4 decoration-neutral-400 hover:underline',
      linkFocusClasses,
    );
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} title={title}>
          {children}
        </Link>
      );
    }
    const external = href?.startsWith('http');
    return (
      <a
        href={href}
        className={className}
        title={title}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element -- markdown figures (SVG, ad-hoc paths)
    <img
      src={typeof src === 'string' ? src : undefined}
      alt={alt ?? ''}
      className="max-h-[min(28rem,70vh)] w-auto max-w-full rounded-md border border-neutral-200"
      loading="lazy"
      decoding="async"
    />
  ),
};

export function generateStaticParams(): PageParams[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Project write-up',
      robots: { index: false, follow: false },
    };
  }

  const path = `/projects/${slug}`;
  const title = `${post.title} | Bernardo Bechtold | Front-end Engineer & UI/UX Designer`;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: path,
      type: 'article',
      publishedTime: post.date,
      siteName: 'Bernardo Bechtold',
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
      title: post.title,
      description: post.description,
      images: ['/profile.jpeg'],
    },
  };
}

export default async function ProjectPostPage({ params }: PageProps): Promise<React.ReactNode> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const backHref = '/projects';

  return (
    <div className="fade-up">
      <main className="content-container pb-24 pt-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-sm text-neutral-600">
            <li>
              <Link
                href={backHref}
                className={cn(
                  'font-medium text-neutral-900 underline-offset-4 decoration-neutral-400 hover:underline',
                  linkFocusClasses,
                )}
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400">
              /
            </li>
            <li className="min-w-0 truncate font-mono text-neutral-500">{slug}</li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-neutral-200 pb-10">
          <p className="font-mono text-sm text-neutral-500">{formatDisplayDate(post.date)}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="section__paragraph mt-4 text-lg leading-relaxed text-gray-700">
            {post.description}
          </p>
        </header>

        <article
          className={cn(
            'prose prose-neutral max-w-none text-gray-700',
            'prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-900',
            'prose-pre:border prose-pre:border-neutral-200 prose-pre:bg-neutral-50',
            'prose-code:rounded-sm prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none',
            'prose-blockquote:border-l-neutral-300 prose-blockquote:text-neutral-700',
            'prose-table:text-sm',
          )}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
