import { differenceInDays, format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const DAY_7 = 7;
const DAY_15 = 15;
const DAY_30 = 30;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViDate(date: Date | null) {
  if (!date) {
    return "";
  }
  return format(date, "dd/MM/yyyy");
}

export function formatBadgeColorByDate(date: Date | null) {
  // const dateObject = parseISO(date);
  if (!date) {
    return "text-gray-500";
  }
  const today = new Date();
  const soNgayConLai = differenceInDays(date, today);
  if (soNgayConLai < DAY_7) {
    return "bg-red-500";
  } else if (soNgayConLai < DAY_15) {
    return "bg-orange-500";
  } else if (soNgayConLai < DAY_30) {
    return "bg-yellow-500";
  } else {
    return "text-blue-500";
  }
}
