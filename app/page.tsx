import Header from "./_components/header";
import { getFormattedDate } from "@/lib/helpers";
import SearchInput from "./_components/search";
import { FooterSpacing, MainContainer } from "./_components/spacing";
import Category from "./_components/category";
import { categories } from "./_constants/categories";
import CurrentBooking from "./_components/current-booking";
import BarbershopsSection from "./_components/barbershops-section";
import Footer from "./_components/footer";
import { getRecommendedBarbershops } from "./_data_access/barbershop";

export default async function Home() {
  const recommendedBarbershops = await getRecommendedBarbershops();

  const popularBarbershops = [
    {
      name: "Barbershop 2",
      location: "Barbershop 2 location",
      image: "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
    },
  ];

  return (
    <>
      <Header />
      <div className="space-y-1 px-5 py-6">
        <h2 className="text-2xl">
          Olá, <span className="font-bold">Nicolas!</span>
        </h2>
        <p>{getFormattedDate()}</p>
      </div>
      <MainContainer>
        <SearchInput />
        <div className="no-scrollbar flex touch-pan-x gap-4 overflow-x-auto overscroll-x-contain scroll-smooth">
          {categories.map((category) => (
            <Category
              key={category.label}
              icon={category.icon}
              label={category.label}
            />
          ))}
        </div>
        <CurrentBooking />
        <BarbershopsSection
          title="RECOMMENDED"
          barbershops={recommendedBarbershops}
        />
        <BarbershopsSection title="POPULAR" barbershops={popularBarbershops} />
      </MainContainer>
      <FooterSpacing />
      <Footer />
    </>
  );
}
