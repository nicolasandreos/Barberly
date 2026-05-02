"use client";

import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute top-6 left-8 size-10"
      aria-label="Barbershop back"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
};

export default ButtonBack;
