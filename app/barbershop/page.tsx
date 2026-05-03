import Header from "../_components/header";
import SearchInput from "../_components/search";
import Footer from "../_components/footer";
import { MainContainer } from "../_components/spacing";
import { getBarbershopsByName } from "../_data_access/barbershop";
import BarbershopsSection from "../_components/barbershops-section";
import { capitalize } from "@/lib/helpers";
import Subtitle from "../_components/subtitle";
import BarbershopCard from "../_components/barbershop-card";

interface BarbershopPageProps {
  searchParams: Promise<{
    barbershopName?: string;
  }>;
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const { barbershopName } = await searchParams;
  const barbershops = await getBarbershopsByName(barbershopName ?? "");

  return (
    <>
      <Header />
      <MainContainer>
        <div className="mt-6"></div>
        <SearchInput />
        {barbershops && barbershops.length > 0 ? (
          <div className="space-y-3">
            <Subtitle>
              {`RESULTS FOR: "${capitalize(barbershopName ?? "")}"`}
            </Subtitle>
            <div className="flex flex-wrap justify-between gap-4">
              {barbershops.map((barbershop) => (
                <BarbershopCard key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        ) : (
          <Subtitle>
            {`NO RESULTS FOUND FOR: "${capitalize(barbershopName ?? "")}"`}
          </Subtitle>
        )}
      </MainContainer>

      <Footer />
    </>
  );
};

export default BarbershopPage;
