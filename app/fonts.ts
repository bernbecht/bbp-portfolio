import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif-400",
  weight: "400",
});

export const fontClasses = [
  geistSans.variable,
  geistMono.variable,
  ibmPlexSerif.variable,
].join(" ");
