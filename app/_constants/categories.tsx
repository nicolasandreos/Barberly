import Image from "next/image";

/** SVG como <img>: `text-*` não altera fill; monocromático branco via filtro (exceto SVG já branco como beard-icon). */
const iconWhiteFilter = "brightness-0 invert";

export const categories = [
  {
    label: "Hair",
    icon: (
      <Image
        src="/hair-icon.svg"
        alt=""
        width={20}
        height={20}
        className={iconWhiteFilter}
        aria-hidden
      />
    ),
  },
  {
    label: "Beard",
    icon: (
      <Image src="/beard-icon.svg" alt="" width={20} height={20} aria-hidden />
    ),
  },
  {
    label: "EyesBrows",
    icon: (
      <Image
        src="/eyebrow-icon.svg"
        alt=""
        width={20}
        height={20}
        className={iconWhiteFilter}
        aria-hidden
      />
    ),
  },
  {
    label: "Massage",
    icon: (
      <Image
        src="/massage-icon.svg"
        alt=""
        width={20}
        height={20}
        className={iconWhiteFilter}
        aria-hidden
      />
    ),
  },
];
