import ButtonBook from "@/app/_components/book-button";
import { Button } from "@/app/_components/ui/button";
import { Service } from "@/generated/prisma/browser";
import { formatCurrency } from "@/lib/helpers";
import Image from "next/image";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="bg-card flex gap-3 rounded-xl p-2">
      <div className="relative h-[110px] w-[110px] shrink-0 self-start overflow-hidden rounded-xl">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex min-h-[110px] min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="space-y-2">
          <h3 className="text-lg leading-tight font-bold">{service.name}</h3>
          <p className="text-muted-foreground line-clamp-2 min-h-11 text-sm leading-snug font-light">
            {service.description}
          </p>
        </div>
        <div className="flex w-full shrink-0 items-center justify-between gap-2">
          <p className="text-primary font-bold">
            {formatCurrency(Number(service.price))}
          </p>
          <ButtonBook />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
