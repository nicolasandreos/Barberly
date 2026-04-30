import BarbershopCard, { BarbershopCardProps } from "./barbershop-card";

interface BarbershopsSectionProps {
  title: string;
  barbershops: BarbershopCardProps[];
}

const BarbershopsSection = ({
  title,
  barbershops,
}: BarbershopsSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm font-bold">{title}</p>
      <div className="flex gap-4 overflow-x-auto">
        {barbershops.map((barbershop) => (
          <BarbershopCard key={barbershop.name} {...barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopsSection;
