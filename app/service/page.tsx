import Header from "../_components/header";
import SearchInput from "../_components/search";
import Footer from "../_components/footer";
import { MainContainer } from "../_components/spacing";
import { capitalize } from "@/lib/helpers";
import Subtitle from "../_components/subtitle";
import { getSercivesByCategory } from "../_data_access/services";
import ServiceCard from "../_components/service-card";

interface ServicePageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const ServicePage = async ({ searchParams }: ServicePageProps) => {
  const { category: categoryParam } = (await searchParams) ?? {};
  const services = await getSercivesByCategory(categoryParam);

  return (
    <>
      <Header />
      <MainContainer>
        <div className="mt-6"></div>
        <SearchInput />
        {services && services.length > 0 ? (
          <div className="space-y-3">
            <Subtitle>
              {`RESULTS FOR: "${capitalize(categoryParam ?? "")}"`}
            </Subtitle>
            <div className="flex flex-wrap justify-between gap-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ) : (
          <Subtitle>
            {`NO RESULTS FOUND FOR: "${capitalize(categoryParam ?? "")}"`}
          </Subtitle>
        )}
      </MainContainer>

      <Footer />
    </>
  );
};

export default ServicePage;
