"use client";

import Image from "next/image";
import { Calendar, MapPin, Video } from "lucide-react";

import { useEvents } from "@/hooks/useevent";
import type { EventItem } from "@/type/supabase";
import { EventDateDisplay } from "@/components/ui/event-date-display";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import Link from "next/link";

interface EventsClientSectionProps {
  readonly initialEvents: readonly EventItem[];
}

function getEventLocation(event: EventItem): string {
  if (event.event_type === "online") {
    return event.online_platform || "Online Platform";
  }

  const addresses = event.event_addresses;

  if (addresses.length === 0) {
    return "Location Coming Soon";
  }

  const primary = addresses[0];
  const remaining = addresses.length - 1;
  const base = `${primary.city}, ${primary.state}`;

  if (remaining > 0) {
    return `${base} + ${remaining} more`;
  }

  return base;
}
function getStatusLabel(status: EventItem["status"]): string {
  if (status === "ongoing") {
    return "Ongoing";
  }

  if (status === "upcoming") {
    return "Upcoming";
  }

  return status;
}

function getEventImage(event: EventItem): string {
  return (
    event.cover_image_url ||
    event.event_gallery[0]?.image_url ||
    "https://placehold.co/394x253.png"
  );
}

export function EventsClientSection({
  initialEvents,
}: Readonly<EventsClientSectionProps>) {
  const { filteredEvents, selectedFilter, setSelectedFilter, hasEvents } =
    useEvents({
      initialEvents: [...initialEvents],
    });

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          {/* Left: Text */}
          <div className="flex flex-col gap-2 md:gap-3">
            <p className="text-2xl md:text-3xl lg:text-2xl font-bold text-foreground">
              Join Our Events
            </p>

            <h2 className="text-sm md:text-base lg:text-lg font-medium text-muted-foreground max-w-md">
              Be part of upcoming events, gatherings, and special experiences.
            </h2>
          </div>

          {/* Right: Toggle Buttons */}
          <ToggleGroup
            type="single"
            value={selectedFilter}
            onValueChange={(value) => {
              if (value) {
                setSelectedFilter(value as "all" | "online" | "offline");
              }
            }}
            className="flex gap-2 flex-wrap md:flex-nowrap md:gap-3 w-full md:w-auto justify-start md:justify-end"
          >
            {(["all", "online", "offline"] as const).map((filter) => (
              <ToggleGroupItem
                key={filter}
                value={filter}
                aria-label={filter}
                className="rounded-full px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium capitalize whitespace-nowrap transition-colors data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary-hover data-[state=off]:bg-muted data-[state=off]:text-muted-foreground hover:bg-muted/80"
              >
                {filter}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {hasEvents && filteredEvents.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredEvents.map((event: EventItem) => {
              const isOnline = event.event_type === "online";
              const imageUrl = getEventImage(event);
              const address = event.event_addresses?.[0];
              const locationText = getEventLocation(event);

              const statusLabel = getStatusLabel(event.status);

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Register for ${event.event_name}`}
                  className=" grid-cols-1 lg:grid-cols-2 inline-flex w-full flex-col items-start justify-start gap-6 rounded-b-md p-2 shadow-md transition-shadow duration-300 hover:shadow-2xl md:flex-row md:items-center"
                >
                  <div className="relative inline-flex w-full flex-1 flex-col items-start justify-start gap-2.5 self-stretch">
                    <Image
                      src={imageUrl}
                      alt={event.event_name}
                      width={394}
                      height={253}
                      className="h-220px w-full flex-1 rounded-xl object-cover sm:h-253px"
                    />

                    <div className="absolute left-4 top-4">
                      <Badge
                        variant="secondary"
                        className="bg-success-bg text-success dark:bg-success/20 dark:text-success w-fit h-6"
                      >
                        {statusLabel}
                      </Badge>
                    </div>
                  </div>

                  <div className="inline-flex w-full flex-1 flex-col items-start justify-start gap-3 p-2">
                    <div className="flex w-full flex-col items-start justify-start">
                      <h4 className="w-full text-lg font-bold leading-7 text-foreground">
                        {event.event_name}
                      </h4>

                      <p className="w-full text-sm font-normal leading-[22.4px] text-muted-foreground">
                        {event.short_description}
                      </p>
                    </div>

                    <div className="inline-flex items-center justify-start gap-1.5">
                      <Calendar
                        className="h-18px w-18px color-gray-700"
                        strokeWidth={1.5}
                      />

                      <p className=" text-sm font-normal leading-[22.4px] text-gray">
                        {address?.start_at ? <EventDateDisplay date={address.start_at} endDate={address?.end_at} /> : "Date TBA"}
                      </p>
                    </div>

                    <div className="inline-flex items-start justify-start gap-1.5">
                      {isOnline ? (
                        <Video
                          className="h-18px w-18px text-muted-foreground"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <MapPin
                          className="h-18px w-18px text-muted-foreground"
                          strokeWidth={1.5}
                        />
                      )}

                      <div className="inline-flex flex-col items-start justify-center ">
                        <p className="font-lato text-sm font-normal leading-[22.4px] text-muted-foreground">
                          {isOnline ? "Online Event" : "Offline Event"}
                        </p>

                        <p className="font-lato text-sm font-normal leading-[22.4px] text-muted-foreground">
                          {locationText}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : hasEvents ? (
          <div className="rounded-[20px] border border-dashed border-border bg-white p-8 text-center">
            <p className="font-lato text-base font-medium text-text-dim">
              No events found for this filter.
            </p>
          </div>
        ) : (
          <div className="rounded-[20px] border border-dashed border-border bg-white p-8 text-center">
            <p className="font-lato text-base font-medium text-text-dim">
              No active events available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
