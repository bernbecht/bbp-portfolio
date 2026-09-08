import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/cn";
import { resolveSiteUrl } from "@/lib/site-url";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { fontClasses } from "./fonts";
import "./globals.css";

const siteTitle = "Bernardo Bechtold | Senior Frontend & UI Engineer";
const siteDescription =
  "Senior frontend and UI engineer specializing in design systems, accessibility, and frontend architecture. Explore Bernardo Bechtold's work and projects.";

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    url: "/",
    title: siteTitle,
    description: siteDescription,
    siteName: "Bernardo Bechtold",
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
    title: siteTitle,
    description: siteDescription,
    images: ["/profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="GtY3LNDFgGqkMEHr_LVhK9WhyblMkcve52dJ5BaFliI"
      />
      <body
        className={cn(
          fontClasses,
          "font-sans antialiased flex min-h-dvh flex-col",
        )}
      >
        <Header />
        <div className="flex-1 pt-8 md:pt-12">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
