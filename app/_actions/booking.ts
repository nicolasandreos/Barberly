"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { addMinutes } from "date-fns";
import { BookingStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

export type CreateBookingResult =
  | { ok: true; bookingId: string }
  | {
      ok: false;
      error:
        | "UNAUTHENTICATED"
        | "INVALID_DATE"
        | "SERVICE_NOT_FOUND"
        | "SLOT_TAKEN";
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

  const existingBooking = await db.booking.findFirst({
    where: {
      idService: input.idService,
      idBarbershop: input.idBarbershop,
      startsAt,
      status: BookingStatus.CONFIRMED,
    },
  });
  if (existingBooking) {
    return { ok: false, error: "SLOT_TAKEN" };
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

  revalidatePath("/");
  revalidatePath("/bookings");

  return { ok: true, bookingId: booking.id };
}

export type CancelBookingResult =
  | { ok: true }
  | {
      ok: false;
      error: "UNAUTHENTICATED" | "NOT_FOUND" | "INVALID_STATE";
    };

export async function cancelBooking(
  bookingId: string,
): Promise<CancelBookingResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { ok: false, error: "UNAUTHENTICATED" };
  }

  const booking = await db.booking.findFirst({
    where: { id: bookingId, idUser: session.user.id },
  });
  if (!booking) {
    return { ok: false, error: "NOT_FOUND" };
  }
  if (booking.status !== BookingStatus.CONFIRMED) {
    return { ok: false, error: "INVALID_STATE" };
  }

  await db.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });

  revalidatePath("/");
  revalidatePath("/bookings");

  return { ok: true };
}

export default createBooking;
