import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="flex w-full items-center justify-between border-b border-white/10 px-8 py-6">
        <Image src="/barberly-slogan2.png" alt="logo" width={70} height={70} />
        <Menu className="size-7" />
      </div>
    </header>
  );
};

export default Header;
