"use client";

import { Button } from "@/app/_components/ui/button";
import Subtitle from "@/app/_components/subtitle";
import { Phone } from "@/generated/prisma/browser";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";

type BarbershopContactSectionProps = {
  phones: Pick<Phone, "id" | "number">[];
};

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Número copiado!", {
      description: value,
    });
  } catch {
    toast.error("Não foi possível copiar", {
      description: "Verifique as permissões do navegador.",
    });
  }
}

const BarbershopContactSection = ({
  phones,
}: BarbershopContactSectionProps) => {
  if (phones.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      <Subtitle>CONTATO</Subtitle>
      <ul className="flex flex-col gap-4">
        {phones.map((phone) => (
          <li
            key={phone.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-2">
              <Smartphone
                className="text-foreground size-5 shrink-0"
                aria-hidden
              />
              <span className="truncate font-light">{phone.number}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              aria-label={`Copiar número ${phone.number}`}
              onClick={() => void copyToClipboard(phone.number)}
            >
              Copiar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarbershopContactSection;
