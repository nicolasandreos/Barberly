import Image from "next/image";
import { Button } from "./ui/button";
import { Barbershop } from "@/generated/prisma/browser";

const BarbershopCard = ({ barbershop }: { barbershop: Barbershop }) => {
  return (
    <div className="bg-card flex h-[350px] w-[220px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 sm:w-[320px]">
      <div className="relative h-[60%] w-full shrink-0">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          sizes="200px"
          className="rounded-xl object-cover"
          priority={false}
        />
      </div>
      <div className="flex h-[40%] min-h-0 w-full flex-col justify-between gap-1 p-2">
        <div className="min-w-0">
          <p className="truncate text-lg leading-tight font-bold">
            {barbershop.name}
          </p>
          <p className="text-muted-foreground truncate text-sm">
            {barbershop.address}
          </p>
        </div>
        <Button variant="outline" className="h-9 w-full shrink-0 text-sm">
          Book
        </Button>
      </div>
    </div>
  );
};

export default BarbershopCard;
