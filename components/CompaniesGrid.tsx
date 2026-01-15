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
      <ul className="grid grid-cols-2 border border-solid border-gray-950">
        {companies.map((company, index) => {
          const isOdd = index % 2 === 1;
          const isLastRow = index > 1;
          return (
            <li
              key={company.name}
              className={`
              ${!isLastRow ? "border-b border-b-gray-300" : ""}
              ${!isOdd ? "border-r border-r-gray-300 " : ""}
            `}
            >
              <a
                href={company.link}
                className="flex items-center justify-center"
              >
                <div className="py-8">
                  <company.logo className="w-64 h-32" />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="dither w-full h-3"></div>
    </>
  );
}
