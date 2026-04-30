"server-only";

import { Barbershop } from "@/generated/prisma/browser";
import { db } from "@/lib/db";

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
