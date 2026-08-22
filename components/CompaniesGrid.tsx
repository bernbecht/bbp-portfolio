import AxonifyLogo from "./icons/AxonifyLogo";
import CitLogo from "./icons/CitLogo";
import SapLogo from "./icons/SapLogo";
import ShopifyLogo from "./icons/ShopifyLogo";

type Company = {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  link: string;
};

const companies: Company[] = [
  { name: "Shopify", logo: ShopifyLogo, link: "https://www.shopify.com" },
  { name: "SAP", logo: SapLogo, link: "https://www.sap.com" },
  { name: "CIT", logo: CitLogo, link: "https://ciandt.com" },
  { name: "Axonify", logo: AxonifyLogo, link: "https://axonify.com" },
];

export function CompaniesGrid() {
  return (
    <>
      <ul
        className="
          grid grid-cols-1 sm:grid-cols-2
          border border-gray-950
        [&>li]:border-gray-300
          [&>li]:border-b
          [&>li:last-child]:border-b-0
          sm:[&>li:nth-last-child(-n+2)]:border-b-0
          sm:[&>li:nth-child(odd)]:border-r"
      >
        {companies.map((company) => (
          <li key={company.name}>
            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company.name}`}
              className="group relative flex min-h-40 items-center justify-center overflow-hidden py-8 text-black transition-colors hover:bg-gray-900 hover:text-white"
            >
              <company.logo className="h-24 w-52 transition-transform duration-300 motion-safe:group-hover:scale-105" />
              <span className="absolute right-3 top-3 font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="dither w-full h-3" />
    </>
  );
}
