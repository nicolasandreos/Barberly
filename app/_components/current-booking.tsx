import Subtitle from "./subtitle";
import { Prisma } from "@/generated/prisma/client";
import BookingCard from "./booking-card";

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
          <BookingCard key={booking.id} booking={booking} compact />
        ))}
      </div>
    </div>
  );
};

export default CurrentBooking;
