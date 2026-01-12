import { Section } from "@/components/Section";
import { Literata } from "next/font/google";

const literata = Literata({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Section id="what" label="/what">
        <p className={literata.className + " text-2xl text-gray-700"}>
          Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo
          é motivis de denguis. Sapien in monti palavris qui num significa nadis
          i pareci latim. Todo mundo vê os porris que eu tomo, mas ninguém vê os
          tombis que eu levo! Bota 1 metro de cachacis aí pra viagem!
        </p>
      </Section>
    </>
  );
}
