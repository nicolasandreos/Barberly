import { HandHeart, ScanEye, ScanFace, Scissors } from "lucide-react";

export const categories = [
  {
    label: "Hair",
    icon: <Scissors className="size-5" aria-hidden />,
  },
  {
    label: "Beard",
    icon: <ScanFace className="size-5" aria-hidden />,
  },
  {
    label: "EyesBrows",
    icon: <ScanEye className="size-5" aria-hidden />,
  },
  {
    label: "Massage",
    icon: <HandHeart className="size-5" aria-hidden />,
  },
];
