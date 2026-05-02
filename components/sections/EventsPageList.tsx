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

  if (event.event_addresses) {
    return `${event.event_addresses.address_line_1} ${event.event_addresses.city}, ${event.event_addresses.state} ${event.event_addresses.zipcode} ${event.event_addresses.country}`;
  }

  return "Location coming soon";
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
            <h1 className="text-3xl font-bold text-[#101828]">Events</h1>
            <p className="mt-2 text-sm text-[#475467]">
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
                    ? "bg-blue-700 text-white"
                    : "bg-[#F2F4F7] text-[#344054] hover:bg-[#E4E7EC]"
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
                className="grid gap-4 rounded-xl border border-[#D0D5DD] bg-white p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-md sm:grid-cols-[150px_180px_1fr_auto] sm:items-center sm:p-5"
              >
                <div className="relative h-[120px] w-full overflow-hidden rounded-lg bg-[#F2F4F7] sm:h-[90px] sm:w-[150px]">
                  <Image
                    src={getEventImage(event)}
                    alt={event.event_name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-start gap-2 text-[#101828] sm:border-r sm:border-[#D0D5DD] sm:pr-5">
                  <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-[#667085] sm:hidden" />
                  <p className="text-sm font-medium leading-6 sm:text-base">
                    {formatEventDate(event.start_at)}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-bold text-[#101828]">
                    {event.event_name}
                  </h2>

                  <p className="line-clamp-1 text-sm font-semibold text-[#344054]">
                    {event.short_description}
                  </p>

                  <div className="flex items-start gap-2 text-sm font-medium text-[#475467]">
                    {isOnline ? (
                      <Video className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    )}

                    <span className="line-clamp-1">{getEventLocation(event)}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 sm:justify-end">
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