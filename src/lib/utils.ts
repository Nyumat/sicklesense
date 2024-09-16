import { AppRouter } from "@/server/api/root";
import { TRPCClientError } from "@trpc/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export function extractErrorMessages(
  error: TRPCClientError<AppRouter>,
): string {
  if (!error.data || !Array.isArray(error.data)) {
    return error.message;
  }

  return error.data.map((err) => err.message).join(", ");
}
