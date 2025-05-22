import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and twMerge for Tailwind CSS
 * @param {...string} inputs - Class names to combine
 * @returns {string} - The combined class name string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}