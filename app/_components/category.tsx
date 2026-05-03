"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface CategoryProps {
  icon: React.ReactNode;
  label: string;
}

const Category = ({ icon, label }: CategoryProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex w-35 items-center justify-center gap-2 p-5"
      onClick={() => {
        router.push(
          `/service?category=${encodeURIComponent(label.toUpperCase())}`,
        );
      }}
    >
      {icon}
      <span className="text-md font-bold">{label}</span>
    </Button>
  );
};

export default Category;
