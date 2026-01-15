import AxonifyLogo from "./icons/AxonifyLogo";
import CitLogo from "./icons/CitLogo";
import SapLogo from "./icons/SapLogo";
import ShopifyLogo from "./icons/ShopifyLogo";

type Company = {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
};

const companies: Company[] = [
  { name: "Axonify", logo: AxonifyLogo },
  { name: "CIT", logo: CitLogo },
  { name: "SAP", logo: SapLogo },
  { name: "Shopify", logo: ShopifyLogo },
];

export function CompaniesGrid() {
  return (
    <ul className="grid grid-cols-2 border border-solid border-gray-950">
      {companies.map((company, index) => {
        const isOdd = index % 2 === 1;

        return (
          <li
            key={company.name}
            className={`
              border-b border-b-gray-300
              ${!isOdd ? "border-r border-r-gray-300 " : ""}
            `}
          >
            <a href="#" className="flex items-center justify-center">
              <company.logo className="w-32 h-16" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
