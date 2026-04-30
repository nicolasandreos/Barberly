import Image from "next/image";
import { Button } from "./ui/button";

export interface BarbershopCardProps {
  name: string;
  location: string;
  image: string;
}

const BarbershopCard = ({ name, location, image }: BarbershopCardProps) => {
  return (
    <div className="bg-card flex h-[291px] w-full max-w-[200px] flex-col overflow-hidden rounded-xl border border-white/10">
      <div className="relative h-[60%] w-full shrink-0">
        <Image
          src={image}
          alt="Barbershop 1"
          fill
          sizes="200px"
          className="rounded-xl object-cover"
          priority={false}
        />
      </div>
      <div className="flex h-[40%] min-h-0 w-full flex-col justify-between gap-1 p-2">
        <div className="min-w-0">
          <p className="truncate text-lg leading-tight font-bold">{name}</p>
          <p className="text-muted-foreground truncate text-sm">{location}</p>
        </div>
        <Button variant="outline" className="h-9 w-full shrink-0 text-sm">
          Book
        </Button>
      </div>
    </div>
  );
};

export default BarbershopCard;
