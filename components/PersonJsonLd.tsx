import { resolveSiteUrl } from '@/lib/site-url';

const PERSON_NAME = 'Bernardo Bechtold';
const JOB_TITLE = 'Front-end Engineer & UI/UX Designer';
const LINKEDIN_URL = 'https://br.linkedin.com/in/bbechtold';

export function PersonJsonLd() {
  const siteUrl = resolveSiteUrl();
  const personUrl = `${siteUrl}/`;
  const imageUrl = `${siteUrl}/profile.jpeg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON_NAME,
    url: personUrl,
    image: imageUrl,
    jobTitle: JOB_TITLE,
    sameAs: [LINKEDIN_URL],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
