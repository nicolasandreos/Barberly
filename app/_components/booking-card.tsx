import { Avatar, AvatarImage } from "./ui/avatar";
import { Prisma } from "@/generated/prisma/client";
import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { BookingStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";

type BookingCardProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
  compact?: boolean;
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  CONFIRMED: "Confirmed",
  DONE: "Finished",
  CANCELLED: "Cancelled",
};

const BookingCard = ({ booking, compact = false }: BookingCardProps) => {
  const statusLabel = STATUS_LABELS[booking.status];
  const isConfirmed = booking.status === BookingStatus.CONFIRMED;

  return (
    <div
      className={cn(
        "bg-card flex shrink-0 justify-between overflow-hidden rounded-xl border border-white/10",
        compact ? "min-w-[400px]" : "w-full",
      )}
    >
      <div className="flex flex-col gap-2 p-4">
        <span
          className={cn(
            "w-max rounded-full px-2 py-1 text-center text-[12px]",
            isConfirmed
              ? "text-primary bg-[#221C3D]"
              : "text-muted-foreground bg-white/10",
          )}
        >
          {statusLabel}
        </span>
        <p className="text-md font-bold">{booking.service.name}</p>
        <div className="flex items-center justify-start gap-2">
          <Avatar>
            <AvatarImage src={booking.barbershop.imageUrl} />
          </Avatar>
          {booking.barbershop.name}
        </div>
      </div>

      <div className="flex min-h-0 shrink-0 flex-col items-center justify-center self-stretch border-l border-white/10 px-10 py-4">
        <p className="text-lg">
          {formatInTimeZone(booking.startsAt, "UTC", "MMMM", {
            locale: ptBR,
          })}
        </p>
        <p className="text-2xl">
          {formatInTimeZone(booking.startsAt, "UTC", "dd")}
        </p>
        <p className="text-sm">
          {formatInTimeZone(booking.startsAt, "UTC", "HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
