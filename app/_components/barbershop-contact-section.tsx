"use client";

import { Button } from "@/app/_components/ui/button";
import Subtitle from "@/app/_components/subtitle";
import { Phone } from "@/generated/prisma/browser";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type BarbershopContactSectionProps = {
  phones: Pick<Phone, "id" | "number">[];
  className?: string;
};

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Number copied", {
      description: value,
    });
  } catch {
    toast.error("Could not copy", {
      description: "Check your browser clipboard permissions.",
    });
  }
}

const BarbershopContactSection = ({
  phones,
  className,
}: BarbershopContactSectionProps) => {
  if (phones.length === 0) {
    return null;
  }

  return (
    <div className={cn("mb-6 flex flex-col gap-4", className)}>
      <Subtitle>PHONES</Subtitle>
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
              aria-label={`Copy number ${phone.number}`}
              onClick={() => void copyToClipboard(phone.number)}
            >
              Copy
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarbershopContactSection;
