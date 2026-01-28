import { Geist, Geist_Mono, IBM_Plex_Serif, Limelight, Literata } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const limelight = Limelight({
  weight: "400",
  variable: "--font-limelight-400",
});

export const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif-400",
  weight: "400",
});

export const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
});

export const fontClasses = [
  geistSans.variable,
  geistMono.variable,
  limelight.variable,
  ibmPlexSerif.variable,
  literata.variable,
].join(" ");