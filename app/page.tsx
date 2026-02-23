import { CompaniesGrid } from "@/components/CompaniesGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Section, SectionParagraph } from "@/components/Section";
import { StatusBar } from "@/components/StatusBar";

export default function Home() {
  return (
    <>
      <div className="content-container">
        <Hero />
        <div className="hidden sm:block">
          <StatusBar />
        </div>
      </div>
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
      <Section id="how" label="/how">
        <div className="flex flex-wrap sm:flex-nowrap gap-10">
          <SectionParagraph>
            Pesquisa de usuário, criação e implementação de jornadas de usuário,
            criação e desenvolvimento de design systems, melhoramento da
            developer experience, aproximando design e engenharia e facilitando
            workshops e treinamentos de Design Thinking.
          </SectionParagraph>
          <ul className="text-4xl leading-11">
            <li>ReactJS</li>
            <li>Typescript</li>
            <li>NodeJS</li>
            <li>Storybook</li>
            <li>Playwright</li>
            <li>Figma</li>
            <li>MaterialUI</li>
            <li>ExpressJS</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
        <div className="sm:text-right text-3xl mt-10 font-bold">
          ... and everything in between!
        </div>
      </Section>
      <Section id="next" label="/what's next">
        <SectionParagraph>
          Recently I'm researching the current status of medical professionals
          and observing them in the wild. It's a area where professionals and
          resources are stretch thin but I still believe that it's possible to
          bring some joy to the digital tools they need to interact to get the
          job done.
        </SectionParagraph>
        <SectionParagraph>
          Still, I'm always up for making the process of creating and using
          products more fun, regardless the are.
        </SectionParagraph>
        <SectionParagraph>
          If you need a hand, I'm up for chat (specially if you have a medical
          product).
        </SectionParagraph>
      </Section>
      <Footer />
    </>
  );
}
