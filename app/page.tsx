import { DualModeHome } from '@/components/DualModeHome';
import { PersonJsonLd } from '@/components/PersonJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <DualModeHome />
    </>
  );
}
