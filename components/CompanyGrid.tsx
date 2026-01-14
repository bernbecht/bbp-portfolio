type Company = {
  name: string;
  logo: string;
};

type CompaniesGridProps = {
  companies?: Company[];
};

const mockCompanies: Company[] = [
  { name: "TechCorp", logo: "https://picsum.photos/seed/tech1/200/200.jpg" },
  { name: "DataFlow", logo: "https://picsum.photos/seed/data2/200/200.jpg" },
  { name: "CloudBase", logo: "https://picsum.photos/seed/cloud3/200/200.jpg" },
  { name: "NetWorks", logo: "https://picsum.photos/seed/net4/200/200.jpg" },
];

export function CompaniesGrid({
  companies = mockCompanies,
}: CompaniesGridProps) {
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
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-auto"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
