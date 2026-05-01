import { db } from "@/lib/db";

export const getServicesByBarbershopId = async (idBarbershop: string) => {
  const services = await db.service.findMany({
    where: {
      idBarbershop,
    },
  });
  return services;
};
