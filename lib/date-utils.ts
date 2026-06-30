const tzRegex = /Z$|[+-]\d{2}:?\d{2}$/;

function toUTCDate(date: string): Date {
  const normalized = tzRegex.test(date) ? date : date.replace(" ", "T") + "Z";
  return new Date(normalized);
}

const dateOpts: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

const timeOpts: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
};

const dateTimeOpts: Intl.DateTimeFormatOptions = {
  ...dateOpts,
  ...timeOpts,
};

export function formatEventDate(date: string): string {
  const parsed = toUTCDate(date);
  if (isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat("en-US", dateTimeOpts).format(parsed);
}

export function formatEventDateRange(
  startDate: string,
  endDate: string
): string {
  const start = toUTCDate(startDate);
  const end = toUTCDate(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${startDate} - ${endDate}`;
  }

  const isSameDay =
    new Intl.DateTimeFormat("en-US").format(start) ===
    new Intl.DateTimeFormat("en-US").format(end);

  if (isSameDay) {
    const datePart = new Intl.DateTimeFormat("en-US", dateOpts).format(start);
    const startTime = new Intl.DateTimeFormat("en-US", timeOpts).format(start);
    const endTime = new Intl.DateTimeFormat("en-US", timeOpts).format(end);
    return `${datePart}, ${startTime} - ${endTime}`;
  }

  return `${new Intl.DateTimeFormat("en-US", dateTimeOpts).format(start)} - ${new Intl.DateTimeFormat("en-US", dateTimeOpts).format(end)}`;
}
