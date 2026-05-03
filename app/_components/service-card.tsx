import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Service } from "@/generated/prisma/client";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="bg-card flex h-[350px] w-[220px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 sm:w-[320px]">
      <div className="relative h-[60%] w-full shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          sizes="200px"
          className="rounded-xl object-cover"
          priority={false}
        />
      </div>
      <div className="flex h-[40%] min-h-0 w-full flex-col justify-between gap-1 p-2">
        <div className="min-w-0">
          <p className="truncate text-lg leading-tight font-bold">
            {service.name}
          </p>
          <p className="text-muted-foreground truncate text-sm">
            {service.description}
          </p>
        </div>
        <Button
          variant="outline"
          className="text-md h-9 w-full shrink-0"
          asChild
        >
          <Link href={`/barbershop/${service.idBarbershop}`}>Book</Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
