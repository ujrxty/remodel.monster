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

/**
 * Formats a phone number string into (xxx) xxx-xxxx format
 * @param {string} value - Raw phone number (digits only)
 * @returns {string} - Formatted phone number
 */
export function formatPhone(value) {
  if (!value) return value;
  
  // Remove all non-digits
  const phoneNumber = value.replace(/[^\d]/g, '');
  
  // Limit to 10 digits
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

/**
 * Removes formatting from phone number to get digits only
 * @param {string} value - Formatted phone number
 * @returns {string} - Digits only
 */
export function unformatPhone(value) {
  if (!value) return '';
  return value.replace(/[^\d]/g, '');
}