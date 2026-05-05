import { Avatar, AvatarImage } from "./ui/avatar";
import Subtitle from "./subtitle";
import { Prisma } from "@/generated/prisma/client";
import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

const CurrentBooking = async ({
  bookings: userCurrentBookings,
}: {
  bookings: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Subtitle>BOOKINGS</Subtitle>

      <div className="no-scrollbar flex gap-4 overflow-x-auto">
        {userCurrentBookings.map((booking) => (
          <>
            <div
              className={`bg-card flex shrink-0 justify-between overflow-hidden rounded-xl border border-white/10 ${userCurrentBookings.length > 1 ? "min-w-[400px]" : "w-full"}`}
            >
              <div className="flex flex-col gap-2 p-4">
                <span className="text-muted-foreground w-max rounded-full bg-[#221C3D] px-2 py-1 text-center text-[12px]">
                  {booking.status}
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
          </>
        ))}
      </div>
    </div>
  );
};

export default CurrentBooking;
