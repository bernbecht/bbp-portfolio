import { CompaniesGrid } from "@/components/CompaniesGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Section, SectionParagraph } from "@/components/Section";

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="what" label="/what">
        <SectionParagraph>
          Jornadas de usuários mobile, elevando a usabilidade, promovendo e
          implementando design systems, melhorando a development experience,
          <b>aproximando times de design com o de engenharia e facilitando</b>
          treinamentos de design thinking.
        </SectionParagraph>
        <SectionParagraph>
          Atuei em empresas globais, dentro de times diversos e multiculturais.
        </SectionParagraph>
        <CompaniesGrid />
      </Section>
      <Footer />
    </>
  );
}
