"use client";

type LocalDateTimeProps = {
  value: string | null | undefined;
  fallback?: string;
  options?: Intl.DateTimeFormatOptions;
};

export function LocalDateTime({
  value,
  fallback = "—",
  options,
}: LocalDateTimeProps) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return date.toLocaleString(undefined, options);
}
