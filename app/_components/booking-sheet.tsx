"use client";

import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ptBR as ptDayPicker } from "react-day-picker/locale";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import createBooking from "../_actions/booking";
import { toast } from "sonner";

const DEFAULT_TIMES = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "13:00",
  "14:00",
  "15:30",
  "16:00",
];

const navButtonClass = cn(
  buttonVariants({ variant: "ghost", size: "icon" }),
  "size-8 shrink-0 text-white hover:bg-white/10 aria-disabled:opacity-40",
);

function combineDateAndTime(date: Date, timeHHmm: string): string {
  const ymd = format(date, "yyyy-MM-dd");
  return `${ymd}T${timeHHmm}:00.000Z`;
}

const BookingSheet = ({
  isOpen,
  onClose,
  serviceName = "Corte de Cabelo",
  priceBrl = 50,
  barbershopName = "Vintage Barber",
  barbershopId,
  serviceId,
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  priceBrl?: number;
  barbershopName?: string;
  barbershopId?: string;
  serviceId?: string;
}) => {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const priceLabel = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(priceBrl),
    [priceBrl],
  );

  const summaryDateLabel = useMemo(
    () => format(selectedDate, "dd 'de' MMMM", { locale: ptBR }),
    [selectedDate],
  );

  const handleCreateBooking = () => {
    if (!barbershopId || !serviceId) {
      toast.error("Dados do serviço indisponíveis para reservar.");
      return;
    }
    if (status !== "authenticated" || !session?.user?.id) {
      toast.error("Inicie sessão para criar uma reserva.");
      return;
    }

    const startsAt = combineDateAndTime(selectedDate, selectedTime as string);

    startTransition(async () => {
      const result = await createBooking({
        idBarbershop: barbershopId,
        idService: serviceId,
        startsAt: startsAt,
      });

      if (result.ok) {
        toast.success("Reserva criada com sucesso");
        onClose();
        return;
      }

      if (result.error === "UNAUTHENTICATED") {
        toast.error("Sessão expirada. Inicie sessão novamente.");
        return;
      }
      if (result.error === "INVALID_DATE") {
        toast.error("Data ou horário inválido.");
        return;
      }
      if (result.error === "SERVICE_NOT_FOUND") {
        toast.error("Serviço não encontrado nesta barbearia.");
        return;
      }
      toast.error("Erro ao criar reserva.");
    });
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        showCloseButton={false}
        className="bg-card flex h-full max-h-dvh w-full flex-col gap-0 border-white/10 px-4 py-5 text-white sm:max-w-lg"
      >
        <SheetHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0 border-0 border-b border-white/10 p-0 px-1 pb-4">
          <SheetTitle className="text-lg font-semibold tracking-tight text-white">
            Fazer Reserva
          </SheetTitle>
          <SheetDescription className="sr-only">
            Escolha data e horário para confirmar sua reserva.
          </SheetDescription>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 shrink-0 text-white hover:bg-white/10"
              aria-label="Fechar"
            >
              <XIcon className="size-5" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-1 py-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            defaultMonth={selectedDate}
            locale={ptDayPicker}
            className="w-full max-w-none bg-transparent px-0 py-1 text-white [--cell-size:2.75rem] [&_.rdp-weekday]:uppercase [&_button[data-selected-single=true]]:rounded-full"
            classNames={{
              month_caption:
                "text-sm font-medium capitalize text-white justify-start px-1",
              nav: "absolute inset-x-0 top-0 flex w-full items-center justify-end gap-0.5",
              button_previous: navButtonClass,
              button_next: navButtonClass,
              weekday:
                "text-muted-foreground text-[0.7rem] font-normal uppercase",
              day: "text-white",
              outside: "text-muted-foreground opacity-50",
              disabled: "text-muted-foreground opacity-40",
            }}
          />

          <div className="border-t border-white/10" />

          <div className="space-y-2">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {DEFAULT_TIMES.map((t) => {
                const selected = selectedTime === t;
                return (
                  <Button
                    key={t}
                    type="button"
                    variant={selected ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(t)}
                    className={cn(
                      "h-9 shrink-0 rounded-full px-4 text-sm font-medium",
                      !selected &&
                        "border-white/20 text-white hover:bg-white/10",
                    )}
                  >
                    {t}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10" />

          <div className="bg-secondary/80 space-y-4 rounded-xl border border-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold text-white">
                {serviceName}
              </span>
              <span className="text-sm font-semibold text-white">
                {priceLabel}
              </span>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">Data</dt>
                <dd className="text-right font-medium text-white">
                  {summaryDateLabel}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">Horário</dt>
                <dd className="text-right font-medium text-white">
                  {selectedTime}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">Barbearia</dt>
                <dd className="text-right font-medium text-white">
                  {barbershopName}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="shrink-0 pt-4">
          <Button
            type="button"
            className="h-11 w-full rounded-xl text-base font-semibold"
            disabled={isPending || !selectedDate || !selectedTime}
            onClick={handleCreateBooking}
          >
            {isPending ? "Salvando…" : "Confirmar"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
