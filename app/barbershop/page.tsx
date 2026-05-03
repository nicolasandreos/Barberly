import Header from "../_components/header";
import SearchInput from "../_components/search";
import Footer from "../_components/footer";
import { MainContainer } from "../_components/spacing";
import { getBarbershopsByName } from "../_data_access/barbershop";
import BarbershopsSection from "../_components/barbershops-section";
import { capitalize } from "@/lib/helpers";

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
        <BarbershopsSection
          title={`RESULTS FOR: "${capitalize(barbershopName ?? "")}"`}
          barbershops={barbershops ?? []}
        />
      </MainContainer>

      <Footer />
    </>
  );
};

export default BarbershopPage;
