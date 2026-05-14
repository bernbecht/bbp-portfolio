import { Card, WorkCardContent } from "@/components/Card";
import { CompaniesGrid } from "@/components/CompaniesGrid";
import { Hero } from "@/components/Hero";
import HowTechList from "@/components/HowTechList";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { Section, SectionParagraph } from "@/components/Section";

export default function Home() {
  return (
    <div className="fade-up">
      <PersonJsonLd />
      <div className="content-container">
        <Hero />
      </div>

      <Section id="what" label="/about">
        <SectionParagraph>
          As a software engineer with a background in design, I operate at the
          intersection of experience, architecture, and delivery. I reduce
          friction, create clarity, and turn good ideas into scalable systems.
        </SectionParagraph>

        <div className="">
          <SectionParagraph>My work connects:</SectionParagraph>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li>
              <Card>
                <WorkCardContent
                  header="Design with Engineering"
                  icon="🎨"
                  subtitle="design systems, accessibility, consistency"
                />
              </Card>
            </li>
            <li>
              <Card>
                <WorkCardContent
                  header="Engineering with Code"
                  icon="⚙️"
                  subtitle="scalable, tested, maintainable"
                />
              </Card>
            </li>
            <li>
              <Card>
                <WorkCardContent
                  header="Customers with Goals"
                  icon="📈"
                  subtitle="outcomes, not just features"
                />
              </Card>
            </li>
          </ul>
        </div>
      </Section>

      <Section id="where" label="/where">
        <SectionParagraph>
          I have worked with global teams across product, design, and
          engineering, building systems and interfaces used in real production
          environments.
        </SectionParagraph>

        <CompaniesGrid />
      </Section>

      <Section id="how" label="/how">
        <div className="flex flex-wrap sm:flex-nowrap gap-10">
          <SectionParagraph>
            I build and evolve design systems, create reusable React
            architectures, improve CI/CD pipelines, introduce visual testing,
            and help teams align design and engineering.
          </SectionParagraph>

          <HowTechList className="text-4xl leading-11 font-mono" />
        </div>

        <div className="sm:text-right text-3xl mt-10 font-bold">
          ...and everything in between!
        </div>
      </Section>

      <Section id="next" label="/what's next">
        <SectionParagraph>
          Lately I have been researching how medical professionals interact with
          digital tools in high-pressure environments.
        </SectionParagraph>

        <SectionParagraph>
          If you are building in healthcare or other complex domains where
          clarity and experience matter, let&apos;s talk.
        </SectionParagraph>
      </Section>
    </div>
  );
}
