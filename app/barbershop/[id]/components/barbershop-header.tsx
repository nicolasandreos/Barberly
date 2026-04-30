import { MapPinIcon, StarIcon } from "lucide-react";
import { Barbershop } from "@/generated/prisma/browser";

const BarbershopHeader = ({ barbershop }: { barbershop: Barbershop }) => {
  return (
    <div className="-mx-5 border-b border-white/10 px-5 py-5">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{barbershop.name}</h2>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPinIcon className="text-primary h-4 w-4" />
            <p className="font-light">{barbershop.address}</p>
          </div>
          {/* TODO ADD RATE AND REVIEWS CORRECTLY */}
          <div className="flex items-center gap-2">
            <StarIcon className="text-primary h-4 w-4" />
            <p className="font-light">5.0 (100 reviews)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopHeader;
