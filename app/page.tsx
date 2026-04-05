import { CompaniesGrid } from "@/components/CompaniesGrid";
import { Hero } from "@/components/Hero";
import { Section, SectionParagraph } from "@/components/Section";

export default function Home() {
  return (
    <>
      <div className="content-container">
        <Hero />
      </div>

      <Section id="what" label="/what">
        <SectionParagraph>
          As a software engineer with a background in design, I operate at the
          intersection of experience, architecture, and delivery. I reduce
          friction, create clarity, and turn good ideas into scalable systems.
        </SectionParagraph>

        <div className="">
          <SectionParagraph>My work connects:</SectionParagraph>

          <ul className="text-3xl text-gray-700 mb-6 mb-0 leading-10">
            <li className="font-mono">↳ Design with engineering</li>
            <li className="font-mono">↳ Engineering with production code</li>
            <li className="font-mono">↳ Customers with their business goals</li>
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

          <ul className="text-4xl leading-11">
            <li>React</li>
            <li>TypeScript</li>
            <li>Node</li>
            <li>Storybook</li>
            <li>Playwright</li>
            <li>Design Tokens</li>
            <li>Material UI</li>
            <li>Accessibility</li>
          </ul>
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
    </>
  );
}
