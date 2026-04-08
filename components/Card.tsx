type Card = {
  children: React.ReactNode;
};

export function Card({ children }: Card) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col py-6 px-8 border gap-4 font-mono flex-1">
        {children}
      </div>
      <div className="dither w-full h-2" />
    </div>
  );
}

type WorkCardContent = {
  icon?: string | React.ReactNode;
  header?: string;
  subtitle?: string;
};

export function WorkCardContent({ icon, header, subtitle }: WorkCardContent) {
  return (
    <>
      <div className="text-4xl">{icon}</div>
      <div className="text-4xl md:text-2xl">{header}</div>
      <div className="text-xl md:text-base">{subtitle}</div>
    </>
  );
}
