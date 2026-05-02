import { getEvents } from "@/lib/apicalls/events";
import { EventsPageList } from "@/components/sections/EventsPageList";

export default async function EventsPage() {
  const events = await getEvents({
    source: "server",
  });

  return (
    <main>
      <EventsPageList initialEvents={events} />
    </main>
  );
}