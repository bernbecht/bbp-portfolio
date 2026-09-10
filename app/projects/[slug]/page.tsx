import ComponentLibraryDemo from "@/components/ComponentLibraryDemo";
import {
  VisualRegressionPipelineFigure,
  VisualRegressionReviewFigure,
} from "@/components/VisualRegressionVisuals";
import {
  ShopifyDragScrollBoundaryFigure,
  ShopifyDragResolutionFigure,
  ShopifyNestedControlsFigure,
  ShopifyPreviewSelectionFigure,
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
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

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
  "shopify-preview-selection": ShopifyPreviewSelectionFigure,
  "shopify-nested-controls": ShopifyNestedControlsFigure,
  "visual-regression-pipeline": VisualRegressionPipelineFigure,
  "visual-regression-review": VisualRegressionReviewFigure,
} as const;

const caseStudyVisualPattern =
  /<!-- case-study-visual:([a-z0-9-]+) -->/g;

const markdownComponents: Components = {
  a: ({ href, children, title }) => {
    const className = cn(
      "text-foreground underline-offset-4 decoration-muted hover:underline",
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
      className="max-h-[min(28rem,70vh)] w-auto max-w-full rounded-md border border-subtle"
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
  const title = `${post.title} | Bernardo Bechtold`;
  const socialImage = post.socialImage ?? "/profile.jpeg";

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
          url: socialImage,
          width: post.socialImage ? 1200 : 100,
          height: post.socialImage ? 630 : 100,
          alt: post.socialImage
            ? `Social preview for ${post.title}`
            : "Bernardo Bechtold, portrait",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [socialImage],
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
    "prose article-prose max-w-none text-secondary",
    "prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
    "prose-pre:border prose-pre:border-subtle prose-pre:bg-surface",
    "prose-code:rounded-sm prose-code:bg-surface-hover prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
    "prose-blockquote:border-l-neutral-300 prose-blockquote:text-secondary",
    "prose-table:text-sm",
  );

  return (
    <div className="fade-up">
      <main className="content-container">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-sm text-secondary">
            <li>
              <Link
                href={backHref}
                className={cn(
                  "font-medium text-foreground underline-offset-4 decoration-muted hover:underline",
                  linkFocusClasses,
                )}
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-inverse-muted">
              /
            </li>
            <li className="min-w-0 truncate font-mono text-muted">
              {slug}
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-subtle pb-10">
          <p className="type-meta text-muted">
            {formatDisplayDate(post.date)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="section__paragraph mt-4 type-body text-secondary">
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
          <figure className="mb-12 rounded-xl border border-subtle bg-surface p-4 sm:p-6">
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
            <figcaption className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-secondary">
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
