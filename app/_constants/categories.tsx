import Image from "next/image";

/** SVG as <img>: `text-*` does not change fill; monochrome white via filter (except SVGs already white like beard-icon). */
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
