"use server";

import { getBookedTimesForService } from "@/app/_data_access/bookings";

export async function fetchBookedTimes(params: {
  idService: string;
  idBarbershop: string;
}): Promise<string[]> {
  return await getBookedTimesForService(params);
}
