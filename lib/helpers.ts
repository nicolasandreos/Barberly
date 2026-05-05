import type { ServiceCategory } from "@/generated/prisma/enums";
import { toZonedTime } from "date-fns-tz";

const SERVICE_CATEGORY_KEYS = new Set<string>([
  "HAIR",
  "BEARD",
  "EYESBROWS",
  "MASSAGE",
]);

/** Normaliza query string (ex.: `hair`) para o enum do Prisma (`HAIR`). */
export function parseServiceCategory(
  raw: string | undefined | null,
): ServiceCategory | undefined {
  if (!raw?.trim()) return undefined;
  const key = raw.trim().toUpperCase();
  if (!SERVICE_CATEGORY_KEYS.has(key)) return undefined;
  return key as ServiceCategory;
}

// Pega a data formatada em Sexta, 2 de fevereiro
export const getFormattedDate = () => {
  const date = new Date();
  let formattedDate = formatter.format(date);
  formattedDate = formattedDate.replace("-feira", "");
  formattedDate = capitalizeFirstLetter(formattedDate);
  return formattedDate;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const formatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const capitalize = (string: string) => {
  return string.toUpperCase();
};

export const convertUTCToLocalDateAndTime = (utcTime: Date) => {
  const localDate = toZonedTime(utcTime, "America/Sao_Paulo");
  return localDate;
};
