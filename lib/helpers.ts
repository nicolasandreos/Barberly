import type { ServiceCategory } from "@/generated/prisma/enums";
import { toZonedTime } from "date-fns-tz";

const SERVICE_CATEGORY_KEYS = new Set<string>([
  "HAIR",
  "BEARD",
  "EYESBROWS",
  "MASSAGE",
]);

/** Normalize query string (e.g. `hair`) to the Prisma enum (`HAIR`). */
export function parseServiceCategory(
  raw: string | undefined | null,
): ServiceCategory | undefined {
  if (!raw?.trim()) return undefined;
  const key = raw.trim().toUpperCase();
  if (!SERVICE_CATEGORY_KEYS.has(key)) return undefined;
  return key as ServiceCategory;
}

/** Formatted date for home header (e.g. Tuesday, May 5). */
export const getFormattedDate = () => {
  const date = new Date();
  let formattedDate = formatter.format(date);
  formattedDate = capitalizeFirstLetter(formattedDate);
  return formattedDate;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const formatter = new Intl.DateTimeFormat("en-US", {
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

/** Collapses newlines and runs of spaces for short UI previews (e.g. line-clamp cards). */
export function collapseTextForPreview(text: string): string {
  return text
    .replace(/\s*\n+\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const convertUTCToLocalDateAndTime = (utcTime: Date) => {
  const localDate = toZonedTime(utcTime, "America/Sao_Paulo");
  return localDate;
};
