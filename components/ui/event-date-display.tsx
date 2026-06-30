"use client";

import { useEffect, useState } from "react";
import { formatEventDate, formatEventDateRange } from "@/lib/date-utils";

interface EventDateDisplayProps {
  date: string;
  endDate?: string | null;
}

export function EventDateDisplay({ date, endDate }: EventDateDisplayProps) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    if (endDate) {
      setFormatted(formatEventDateRange(date, endDate));
    } else {
      setFormatted(formatEventDate(date));
    }
  }, [date, endDate]);

  if (!formatted) return null;

  return <>{formatted}</>;
}
