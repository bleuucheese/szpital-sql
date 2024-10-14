import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const convertDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',  // '2-digit' is also valid
    month: 'long',   // 'numeric', '2-digit', 'narrow', 'short' are also valid
    year: 'numeric'  // '2-digit' is also valid
  };
  const utcDate = new Date(date).toISOString().slice(0, 10);  // Converts to UTC and strips time
  const formattedDate = new Date(utcDate).toLocaleDateString('en-US', options);
  return formattedDate;
};
export const convertDateSpecific = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',    // '2-digit' is also valid
    month: 'long',     // 'numeric', '2-digit', 'narrow', 'short' are also valid
    year: 'numeric',   // '2-digit' is also valid
    hour: 'numeric',   // 24-hour format by default, can be adjusted using 'hour12' key
    minute: '2-digit', // Ensures minute is always two digits
    hour12: false      // Optional, set to false for 24-hour format or true for 12-hour format
  };

  // The 'en-US' locale will format the date in an American way, adjust as necessary for other locales
  const formattedDate = new Date(date).toLocaleString('en-US', options);

  return formattedDate;
};