"server-only";

import { BookingStatus } from "@/generated/prisma/enums";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { formatInTimeZone } from "date-fns-tz";

async function markPastConfirmedAsDone(idUser: string) {
  const localNowAsUTC = new Date(
    formatInTimeZone(new Date(), "America/Sao_Paulo", "yyyy-MM-dd'T'HH:mm:ss") +
      ".000Z",
  );
  await db.booking.updateMany({
    where: {
      idUser,
      status: BookingStatus.CONFIRMED,
      startsAt: { lt: localNowAsUTC },
    },
    data: { status: BookingStatus.DONE },
  });
}

export const getUserCurrentBookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  await markPastConfirmedAsDone(session.user.id);
  const bookings = await db.booking.findMany({
    include: {
      service: true,
      barbershop: { include: { phones: true } },
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

export const getUserBookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  await markPastConfirmedAsDone(session.user.id);
  const [confirmed, finished] = await Promise.all([
    db.booking.findMany({
      include: {
        service: true,
        barbershop: { include: { phones: true } },
      },
      where: { idUser: session.user.id, status: BookingStatus.CONFIRMED },
      orderBy: { startsAt: "asc" },
    }),
    db.booking.findMany({
      include: {
        service: true,
        barbershop: { include: { phones: true } },
      },
      where: { idUser: session.user.id, status: BookingStatus.DONE },
      orderBy: { startsAt: "desc" },
    }),
  ]);
  return { confirmed, finished };
};
