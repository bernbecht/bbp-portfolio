import ComponentLibraryDemo from "@/components/ComponentLibraryDemo";
import {
  ShopifyDragScrollBoundaryFigure,
  ShopifyDragResolutionFigure,
  ShopifySheetStatesFigure,
  ShopifyViewportAnatomyFigure,
  ShopifyViewportConflictFigure,
} from "@/components/ShopifyMobileStoreEditorVisuals";
import { cn } from "@/lib/cn";
import { getAllSlugs, getPostBySlug } from "@/lib/project-posts";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const linkFocusClasses =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2";

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
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(time));
}

function splitLeadSection(content: string): readonly [string, string] {
  const nextHeadingIndex = content.indexOf("\n## ", 1);
  if (nextHeadingIndex === -1) {
    return [content, ""];
  }
  return [content.slice(0, nextHeadingIndex), content.slice(nextHeadingIndex + 1)];
}

const caseStudyVisuals = {
  "shopify-viewport-conflict": ShopifyViewportConflictFigure,
  "shopify-sheet-states": ShopifySheetStatesFigure,
  "shopify-viewport-anatomy": ShopifyViewportAnatomyFigure,
  "shopify-drag-resolution": ShopifyDragResolutionFigure,
  "shopify-drag-scroll-boundary": ShopifyDragScrollBoundaryFigure,
} as const;

const caseStudyVisualPattern =
  /<!-- case-study-visual:([a-z0-9-]+) -->/g;

const markdownComponents: Components = {
  a: ({ href, children, title }) => {
    const className = cn(
      "text-neutral-900 underline-offset-4 decoration-neutral-400 hover:underline",
      linkFocusClasses,
    );
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} title={title}>
          {children}
        </Link>
      );
    }
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        title={title}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element -- markdown figures (SVG, ad-hoc paths)
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="max-h-[min(28rem,70vh)] w-auto max-w-full rounded-md border border-neutral-200"
      loading="lazy"
      decoding="async"
    />
  ),
};

function renderPostContent(content: string): React.ReactNode[] {
  const rendered: React.ReactNode[] = [];
  let previousIndex = 0;

  for (const match of content.matchAll(caseStudyVisualPattern)) {
    const markerIndex = match.index;
    const visualName = match[1] as keyof typeof caseStudyVisuals;
    const Visual = caseStudyVisuals[visualName];

    if (!Visual) {
      throw new Error(`Unknown case-study visual: ${match[1]}`);
    }

    const markdown = content.slice(previousIndex, markerIndex);
    if (markdown.trim()) {
      rendered.push(
        <ReactMarkdown
          key={`markdown-${previousIndex}`}
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {markdown}
        </ReactMarkdown>,
      );
    }

    rendered.push(<Visual key={`visual-${visualName}-${markerIndex}`} />);
    previousIndex = markerIndex + match[0].length;
  }

  const remainingMarkdown = content.slice(previousIndex);
  if (remainingMarkdown.trim()) {
    rendered.push(
      <ReactMarkdown
        key={`markdown-${previousIndex}`}
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {remainingMarkdown}
      </ReactMarkdown>,
    );
  }

  return rendered;
}

export function generateStaticParams(): PageParams[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Project write-up",
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
      type: "article",
      publishedTime: post.date,
      siteName: "Bernardo Bechtold",
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
      title: post.title,
      description: post.description,
      images: ["/profile.jpeg"],
    },
  };
}

export default async function ProjectPostPage({
  params,
}: PageProps): Promise<React.ReactNode> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const backHref = "/projects";
  const [leadContent, bodyContent] = post.leadSectionBeforeHero
    ? splitLeadSection(post.content)
    : ["", post.content];
  const proseClasses = cn(
    "prose prose-neutral max-w-none text-gray-700",
    "prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-900",
    "prose-pre:border prose-pre:border-neutral-200 prose-pre:bg-neutral-50",
    "prose-code:rounded-sm prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
    "prose-blockquote:border-l-neutral-300 prose-blockquote:text-neutral-700",
    "prose-table:text-sm",
  );

  return (
    <div className="fade-up">
      <main className="content-container">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-sm text-neutral-600">
            <li>
              <Link
                href={backHref}
                className={cn(
                  "font-medium text-neutral-900 underline-offset-4 decoration-neutral-400 hover:underline",
                  linkFocusClasses,
                )}
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400">
              /
            </li>
            <li className="min-w-0 truncate font-mono text-neutral-500">
              {slug}
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-neutral-200 pb-10">
          <p className="font-mono text-sm text-neutral-500">
            {formatDisplayDate(post.date)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="section__paragraph mt-4 text-lg leading-relaxed text-gray-700">
            {post.description}
          </p>
        </header>

        {post.heroDemo === "component-library" ? (
          <ComponentLibraryDemo />
        ) : null}

        {leadContent ? (
          <div className={cn(proseClasses, "mb-12")}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {leadContent}
            </ReactMarkdown>
          </div>
        ) : null}

        {post.heroVideo ? (
          <figure className="mb-12 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6">
            <div className="mx-auto max-w-[22rem] overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-xl">
              <video
                className="aspect-[9/16] w-full bg-neutral-950 object-cover"
                controls
                playsInline
                preload="metadata"
                poster={post.heroVideo.poster}
                aria-label={post.heroVideo.ariaLabel}
              >
                <source src={post.heroVideo.src} type="video/mp4" />
                Your browser does not support embedded video.{" "}
                <a href={post.heroVideo.src}>Open the product walkthrough</a>.
              </video>
            </div>
            <figcaption className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-neutral-600">
              {post.heroVideo.caption}
            </figcaption>
          </figure>
        ) : null}

        <article className={proseClasses}>
          {renderPostContent(bodyContent)}
        </article>
      </main>
    </div>
  );
}
