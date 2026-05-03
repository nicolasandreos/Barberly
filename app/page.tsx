import Header from "./_components/header";
import { getFormattedDate } from "@/lib/helpers";
import SearchInput from "./_components/search";
import { FooterSpacing, MainContainer } from "./_components/spacing";
import Category from "./_components/category";
import { categories } from "./_constants/categories";
import CurrentBooking from "./_components/current-booking";
import BarbershopsSection from "./_components/barbershops-section";
import Footer from "./_components/footer";
import {
  getPopularBarbershops,
  getRecommendedBarbershops,
} from "./_data_access/barbershop";
import Image from "next/image";
import UserGreetings from "./_components/user-greetings";

export default async function Home() {
  const recommendedBarbershops = await getRecommendedBarbershops();

  const popularBarbershops = await getPopularBarbershops();

  return (
    <>
      <Header />
      <div className="space-y-1 px-5 py-6">
        <UserGreetings />
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
        <div className="relative h-[175px] w-full overflow-hidden rounded-2xl">
          <Image src="/banner.jpg" alt="Banner" fill className="object-cover" />
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
