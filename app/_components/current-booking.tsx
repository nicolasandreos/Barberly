import Subtitle from "./subtitle";
import type { BookingWithDetails } from "./booking-card";
import BookingCardOpenable from "./booking-card-openable";

const CurrentBooking = async ({
  bookings: userCurrentBookings,
}: {
  bookings: BookingWithDetails[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Subtitle>BOOKINGS</Subtitle>

      <div className="no-scrollbar flex gap-4 overflow-x-auto">
        {userCurrentBookings.map((booking) => (
          <BookingCardOpenable key={booking.id} booking={booking} compact />
        ))}
      </div>
    </div>
  );
};

export default CurrentBooking;
