import { db } from "@/lib/db";
import { parseServiceCategory } from "@/lib/helpers";

export const getServicesByBarbershopId = async (idBarbershop: string) => {
  const services = await db.service.findMany({
    where: {
      idBarbershop,
    },
  });
  return services;
};

export const getSercivesByCategory = async (
  categoryParam: string | undefined | null,
) => {
  const category = parseServiceCategory(categoryParam);
  if (!category) {
    return [];
  }
  const services = await db.service.findMany({
    where: {
      category,
    },
  });
  return services;
};
