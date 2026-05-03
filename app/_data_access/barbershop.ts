"server-only";

import type { Prisma } from "@/generated/prisma/client";
import { Barbershop } from "@/generated/prisma/browser";
import { db } from "@/lib/db";

export type BarbershopWithPhones = Prisma.BarbershopGetPayload<{
  include: { phones: true };
}>;

export const getRecommendedBarbershops = async (): Promise<Barbershop[]> => {
  const barbershops = await db.barbershop.findMany({});
  const shuffledBarbershops = barbershops.sort(() => Math.random() - 0.5);
  return shuffledBarbershops.slice(0, 5);
};

// TODO GET POPULAR CORRECTLY
export const getPopularBarbershops = async (): Promise<Barbershop[]> => {
  const barbershops = await db.barbershop.findMany({});
  const shuffledBarbershops = barbershops.sort(() => Math.random() - 0.5);
  return shuffledBarbershops.slice(0, 5);
};

export const getBarbershopById = async (
  id: string,
): Promise<BarbershopWithPhones | null> => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      phones: true,
    },
  });
  return barbershop;
};

export const getBarbershopsByName = async (
  name: string,
): Promise<Barbershop[] | null> => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  return barbershops ?? null;
};
