"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { addMinutes } from "date-fns";
import { BookingStatus } from "@/generated/prisma/client";

export type CreateBookingResult =
  | { ok: true; bookingId: string }
  | {
      ok: false;
      error: "UNAUTHENTICATED" | "INVALID_DATE" | "SERVICE_NOT_FOUND";
    };

export type CreateBookingInput = {
  idBarbershop: string;
  idService: string;
  /** Instante único em ISO 8601 UTC (ex.: 9h em Brasília → …T12:00:00.000Z). */
  startsAt: string;
};

async function createBooking(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  console.log(input);
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { ok: false, error: "UNAUTHENTICATED" };
  }

  const startsAt = new Date(input.startsAt);
  if (Number.isNaN(startsAt.getTime())) {
    return { ok: false, error: "INVALID_DATE" };
  }

  const service = await db.service.findFirst({
    where: {
      id: input.idService,
      idBarbershop: input.idBarbershop,
    },
  });
  if (!service) {
    return { ok: false, error: "SERVICE_NOT_FOUND" };
  }

  const booking = await db.booking.create({
    data: {
      idUser: session.user.id,
      idBarbershop: input.idBarbershop,
      idService: input.idService,
      startsAt,
      endsAt: addMinutes(startsAt, 30),
      status: BookingStatus.CONFIRMED,
    },
  });

  return { ok: true, bookingId: booking.id };
}

export default createBooking;
