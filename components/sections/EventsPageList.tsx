"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Video } from "lucide-react";

import type { EventItem } from "@/type/supabase";
import { useEvents } from "@/hooks/useevent";

interface EventsPageListProps {
  readonly initialEvents: readonly EventItem[];
}

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date(date));
}

function getEventLocation(event: EventItem): string {
  if (event.event_type === "online") {
    return event.online_platform || "Online Event";
  }

  const addresses = event.event_addresses;

  if (addresses.length === 0) {
    return "Location coming soon";
  }

  const primary = addresses[0];
  const remaining = addresses.length - 1;
  const base = `${primary.address_line_1}, ${primary.city}, ${primary.state} ${primary.zipcode} ${primary.country}`;

  if (remaining > 0) {
    return `${primary.city}, ${primary.state} + ${remaining} more`;
  }

  return base;
}

function getEventImage(event: EventItem): string {
  return (
    event.cover_image_url ||
    event.event_gallery[0]?.image_url ||
    "https://placehold.co/160x110.png"
  );
}

export function EventsPageList({
  initialEvents,
}: Readonly<EventsPageListProps>) {
  const { filteredEvents, selectedFilter, setSelectedFilter, hasEvents } =
    useEvents({
      initialEvents: [...initialEvents],
    });

  if (!hasEvents) {
    return null;
  }

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse upcoming and ongoing events.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "online", "offline"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                  selectedFilter === filter
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "bg-muted text-text-dim hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const isOnline = event.event_type === "online";

            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="grid gap-4 rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-md sm:grid-cols-[150px_180px_1fr_auto] sm:items-center sm:p-5"
              >
                <div className="relative h-[120px] w-full overflow-hidden rounded-lg bg-muted sm:h-[90px] sm:w-[150px]">
                  <Image
                    src={getEventImage(event)}
                    alt={event.event_name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-start gap-2 text-foreground sm:border-r sm:border-border sm:pr-5">
                  <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-muted-foreground sm:hidden" />
                  <p className="text-sm font-medium leading-6 sm:text-base">
                    {event.event_addresses?.[0]?.start_at
                      ? formatEventDate(event.event_addresses[0].start_at)
                      : "Date TBA"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-bold text-foreground">
                    {event.event_name}
                  </h2>

                  <p className="line-clamp-1 text-sm font-semibold text-text-dim">
                    {event.short_description}
                  </p>

                  <div className="flex items-start gap-2 text-sm font-medium text-muted-foreground">
                    {isOnline ? (
                      <Video className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    )}

                    <span className="line-clamp-1">{getEventLocation(event)}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary sm:justify-end">
                  Register for Event
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}