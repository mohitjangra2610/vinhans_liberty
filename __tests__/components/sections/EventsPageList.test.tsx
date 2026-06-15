import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import React from "react"
import { EventsPageList } from "@/components/sections/EventsPageList"
import type { EventItem } from "@/type/supabase"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { href, ...props }, children),
}))

vi.mock("next/image", () => ({
  default: ({ alt, src, ...props }: any) =>
    React.createElement("div", { "data-testid": `image-${alt}`, "data-src": src }),
}))

const mockEvent: EventItem = {
  id: "1",
  slug: "test-event",
  event_name: "Test Event",
  event_type: "offline",
  event_tag: "free",
  status: "upcoming",
  short_description: "A test event",
  complete_description: "Full description",
  cover_image_url: null,
  is_active: true,
  display_order: 1,
  tenant_id: "tenant-1",
  registration_link: "https://example.com/register",
  online_platform: null,
  online_join_label: null,
  event_addresses: [
    {
      id: "addr-1",
      event_id: "1",
      address_line_1: "123 Main St",
      city: "Indianapolis",
      state: "IN",
      zipcode: "46201",
      country: "US",
      google_map_location: "",
      start_at: "2026-07-15T09:00:00.000Z",
      end_at: null,
      location_label: null,
      display_order: 1,
      created_at: "",
    },
  ],
  event_organizers: [],
  event_gallery: [],
  created_at: "",
  updated_at: "",
}

const mockOnlineEvent: EventItem = {
  ...mockEvent,
  id: "2",
  slug: "online-event",
  event_name: "Online Event",
  event_type: "online",
  online_platform: "Zoom",
  event_addresses: [],
}

describe("EventsPageList", () => {
  it("returns null when there are no events", () => {
    const { container } = render(
      <EventsPageList initialEvents={[]} />
    )
    expect(container.innerHTML).toBe("")
  })

  it("renders events heading", () => {
    render(<EventsPageList initialEvents={[mockEvent]} />)
    expect(screen.getByText("Events")).toBeDefined()
  })

  it("renders event cards", () => {
    render(<EventsPageList initialEvents={[mockEvent, mockOnlineEvent]} />)
    expect(screen.getByText("Test Event")).toBeDefined()
    expect(screen.getByText("Online Event")).toBeDefined()
  })

  it("renders filter buttons", () => {
    render(<EventsPageList initialEvents={[mockEvent]} />)
    expect(screen.getByText("all")).toBeDefined()
    expect(screen.getByText("online")).toBeDefined()
    expect(screen.getByText("offline")).toBeDefined()
  })

  it("filters events when online button is clicked", () => {
    render(<EventsPageList initialEvents={[mockEvent, mockOnlineEvent]} />)
    fireEvent.click(screen.getByText("online"))
    expect(screen.queryByText("Test Event")).toBeNull()
    expect(screen.getByText("Online Event")).toBeDefined()
  })

  it("filters events when offline button is clicked", () => {
    render(<EventsPageList initialEvents={[mockEvent, mockOnlineEvent]} />)
    fireEvent.click(screen.getByText("offline"))
    expect(screen.getByText("Test Event")).toBeDefined()
    expect(screen.queryByText("Online Event")).toBeNull()
  })

  it("shows all events when all filter is selected after filtering", () => {
    render(<EventsPageList initialEvents={[mockEvent, mockOnlineEvent]} />)
    fireEvent.click(screen.getByText("online"))
    fireEvent.click(screen.getByText("all"))
    expect(screen.getByText("Test Event")).toBeDefined()
    expect(screen.getByText("Online Event")).toBeDefined()
  })

  it("highlights the active filter button", () => {
    render(<EventsPageList initialEvents={[mockEvent]} />)
    const allButton = screen.getByText("all")
    expect(allButton.className).toContain("bg-primary")
  })
})
