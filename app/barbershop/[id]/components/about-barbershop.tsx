import Subtitle from "@/app/_components/subtitle";
import { Barbershop } from "@/generated/prisma/browser";

const AboutBarbershop = ({ barbershop }: { barbershop: Barbershop }) => {
  return (
    <div className="-mx-5 border-b border-white/10 px-5 pb-5">
      <div className="space-y-3">
        <Subtitle>ABOUT</Subtitle>
        <p className="font-extralight">{barbershop.description}</p>
      </div>
    </div>
  );
};

export default AboutBarbershop;
