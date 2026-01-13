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
    <ul
      className="
        grid
        grid-cols-2
        items-center
      "
    >
      {companies.map((company, index) => (
        <li
          key={company.name}
          className={`flex items-center justify-center border-t border-l border-gray-700 p-4 ${
            index % 2 === 1 ? 'border-r' : ''
          } ${
            index >= companies.length - 2 ? 'border-b' : ''
          }`}
        >
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-auto"
          />
        </li>
      ))}
    </ul>
  );
}
