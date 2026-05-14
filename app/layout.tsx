import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/cn";
import { resolveSiteUrl } from "@/lib/site-url";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { fontClasses } from "./fonts";
import "./globals.css";

const siteTitle = "Bernardo Bechtold | Front-end Engineer & UI/UX Designer";
const siteDescription =
  "Bernardo Bechtold is a senior front-end engineer and UI/UX designer who builds accessible, scalable React applications with strong design collaboration.";

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
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
    <html lang="pt-br">
      <body className={cn(fontClasses, "font-sans antialiased")}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
