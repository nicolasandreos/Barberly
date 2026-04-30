import { MainContainer } from "@/app/_components/spacing";
import { getBarbershopById } from "@/app/_data_access/barbershop";
import { MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BarbershopHeader from "./components/barbershop-header";

const BarbershopPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);
  if (!barbershop) {
    notFound();
  }

  return (
    <>
      <div className="relative h-[250px] w-full overflow-hidden rounded-2xl">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
      </div>
      <MainContainer>
        <BarbershopHeader barbershop={barbershop} />
      </MainContainer>
    </>
  );
};

export default BarbershopPage;
