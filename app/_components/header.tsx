import Image from "next/image";
import MenuButton from "./menu-button";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="flex w-full items-center justify-between border-b border-white/10 px-8 py-6">
        <Link href="/">
          <Image
            src="/barberly-slogan2.png"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
        <MenuButton className="size-10" />
      </div>
    </header>
  );
};

export default Header;
