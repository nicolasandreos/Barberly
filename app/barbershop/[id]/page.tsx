import { MainContainer } from "@/app/_components/spacing";
import { getBarbershopById } from "@/app/_data_access/barbershop";
import Image from "next/image";
import { notFound } from "next/navigation";
import BarbershopHeader from "./components/barbershop-header";
import AboutBarbershop from "./components/about-barbershop";
import ServicesSection from "./components/services-section";
import BarbershopContactSection from "@/app/_components/barbershop-contact-section";
import { getServicesByBarbershopId } from "@/app/_data_access/services";
import Footer from "@/app/_components/footer";
import ButtonBack from "./components/button-back";
import MenuButton from "@/app/_components/menu-button";

const BarbershopPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: idBarbershop } = await params;
  const barbershop = await getBarbershopById(idBarbershop);
  if (!barbershop) {
    notFound();
  }

  const services = await getServicesByBarbershopId(idBarbershop);

  return (
    <>
      <div className="relative h-[250px] w-full overflow-hidden rounded-2xl">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <ButtonBack />
        <MenuButton className="absolute top-6 right-8" />
      </div>
      <MainContainer>
        <BarbershopHeader barbershop={barbershop} />
        <AboutBarbershop barbershop={barbershop} />
        {services.length > 0 ? (
          <ServicesSection
            services={services}
            barbershopName={barbershop.name}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground font-light">
              No services found
            </p>
          </div>
        )}
        <BarbershopContactSection phones={barbershop.phones} />
      </MainContainer>
      <Footer />
    </>
  );
};

export default BarbershopPage;
