import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAiSecret() {
  return import.meta.env['VITE_AI_SECRET'];
}

export async function wait(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
