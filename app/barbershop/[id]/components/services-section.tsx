import Subtitle from "@/app/_components/subtitle";
import { Service } from "@/generated/prisma/browser";
import ServiceCard from "./service-card";

const ServicesSection = ({
  services,
  barbershopName,
}: {
  services: Service[];
  barbershopName: string;
}) => {
  return (
    <div className="space-y-3">
      <Subtitle>SERVICES</Subtitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            barbershopName={barbershopName}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
