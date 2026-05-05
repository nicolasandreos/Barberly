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
  return bookings;
};

export const getBookedTimesForService = async (params: {
  idService: string;
  idBarbershop: string;
}) => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);
  const bookings = await db.booking.findMany({
    where: {
      idService: params.idService,
      idBarbershop: params.idBarbershop,
      status: BookingStatus.CONFIRMED,
      startsAt: { gte: startOfToday },
    },
    select: { startsAt: true },
  });
  return bookings.map((b) => b.startsAt.toISOString());
};
