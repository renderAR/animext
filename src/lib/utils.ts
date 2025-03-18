import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fuzzyDateToString({ year, month, day }: { year: number, month: number, day: number }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthString = month && months[month];
  return [monthString, day && `${day}${year && ","}`, year].filter(Boolean).join(" ");
}

export function durationToString(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return [
    !!hours && `${hours} hr${hours > 1 ? "s" : ""}`,
    !!minutes && `${minutes} min${minutes > 1 ? "s" : ""}`,
  ].filter(Boolean).join(" ");
}
