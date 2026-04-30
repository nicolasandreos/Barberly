import { Barbershop } from "@/generated/prisma/browser";
import BarbershopCard from "./barbershop-card";
import Subtitle from "./subtitle";

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
      <Subtitle>{title}</Subtitle>
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto pb-1">
        {barbershops.map((barbershop) => (
          <BarbershopCard key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopsSection;
