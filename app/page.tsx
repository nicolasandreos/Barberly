import Header from "./components/header";
import { getFormattedDate } from "@/lib/helpers";
import SearchInput from "./components/search";
import { MainContainer } from "./components/spacing";
import Category from "./components/category";
import { categories } from "./constants/categories";

export default function Home() {
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
      </MainContainer>
    </>
  );
}
