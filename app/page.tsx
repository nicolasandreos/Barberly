import Header from "./components/header";
import { getFormattedDate } from "@/lib/helpers";

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
    </>
  );
}
