import { Barbershop } from "@/generated/prisma/browser";
import BarbershopCard from "./barbershop-card";

interface BarbershopsSectionProps {
  title: string;
  barbershops: Barbershop[];
}

const BarbershopsSection = ({
  title,
  barbershops,
}: BarbershopsSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm font-bold">{title}</p>
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto pb-1">
        {barbershops.map((barbershop) => (
          <BarbershopCard key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopsSection;
