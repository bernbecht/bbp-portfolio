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

        <SectionParagraph>My work connects:</SectionParagraph>

        <ul className="section__paragraph text-2xl text-gray-700 mb-6 mb-0">
          <li>design and engineering</li>
          <li>engineering and production-ready code</li>
          <li>customers and their business goals</li>
        </ul>
      </Section>

      <Section id="where" label="/where">
        <SectionParagraph>
          I have worked at global companies within multidisciplinary and
          distributed teams, collaborating closely with product, design,
          engineering, and leadership.
        </SectionParagraph>

        <CompaniesGrid />
      </Section>

      <Section id="how" label="/how">
        <div className="flex flex-wrap sm:flex-nowrap gap-10">
          <SectionParagraph>
            I combine systems thinking with hands-on execution. I build and
            evolve design systems, create reusable React architectures, improve
            CI/CD pipelines, introduce visual testing strategies, and facilitate
            workshops to align design and engineering.
          </SectionParagraph>

          <ul className="text-4xl leading-11">
            <li>React</li>
            <li>TypeScript</li>
            <li>Node</li>
            <li>Storybook</li>
            <li>Playwright</li>
            <li>Design Tokens</li>
            <li>Material UI</li>
            <li>Accessibility (WCAG)</li>
          </ul>
        </div>

        <div className="sm:text-right text-3xl mt-10 font-bold">
          ...and everything in between!
        </div>
      </Section>

      <Section id="next" label="/what's next">
        <SectionParagraph>
          I am currently researching the day-to-day reality of medical
          professionals and observing how they interact with digital tools in
          high-pressure environments.
        </SectionParagraph>

        <SectionParagraph>
          It is a space where resources are stretched thin and decisions carry
          weight. I believe there is still significant room to improve clarity,
          efficiency, and even joy in the tools they rely on.
        </SectionParagraph>

        <SectionParagraph>
          If you are building in healthcare or in complex domains where
          experience and architecture truly matter, let’s talk.
        </SectionParagraph>
      </Section>
    </>
  );
}
