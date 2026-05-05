"server-only";

import { BookingStatus } from "@/generated/prisma/enums";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const getUserCurrentBookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  const bookings = await db.booking.findMany({
    include: {
      service: true,
      barbershop: true,
    },
    where: {
      idUser: session.user.id,
      status: BookingStatus.CONFIRMED,
    },
    orderBy: {
      startsAt: "asc",
    },
  });
  console.log(bookings);
  return bookings;
};
