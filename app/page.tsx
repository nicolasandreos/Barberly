import Header from "./components/header";
import { getFormattedDate } from "@/lib/helpers";
import SearchInput from "./components/search";
import { FooterSpacing, MainContainer } from "./components/spacing";
import Category from "./components/category";
import { categories } from "./constants/categories";
import CurrentBooking from "./components/current-booking";
import BarbershopsSection from "./components/barbershops-section";
import Footer from "./components/footer";

export default function Home() {
  // TODO Replace with actual data
  const recommendedBarbershops = [
    {
      name: "Barbershop 1",
      location: "Barbershop 1 location",
      image: "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
    },
  ];

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
