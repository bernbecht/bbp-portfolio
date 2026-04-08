import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { fontClasses } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brnd | UI/UX Engineer",
  description:
    "Senior Frontend Engineer crafting accessible, scalable React apps with strong UX and design collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${fontClasses} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
