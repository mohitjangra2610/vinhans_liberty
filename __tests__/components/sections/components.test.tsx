import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import React from "react"
import type { ServiceItem, Partner, EventItem } from "@/type/supabase"
import type { Stat } from "@/lib/apicalls/stats"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { href, ...props }, children),
}))

vi.mock("next/image", () => ({
  default: ({ alt }: any) =>
    React.createElement("div", { "data-testid": `image-${alt}` }),
}))

vi.mock("@radix-ui/react-toggle-group", () => ({
  ToggleGroup: ({ children }: any) => React.createElement("div", null, children),
  ToggleGroupItem: ({ children, value }: any) =>
    React.createElement("button", { "data-value": value }, children),
}))

let mockUseServicesData = { services: [] as ServiceItem[], hasServices: false, activeServices: [] as ServiceItem[] }
vi.mock("@/hooks/useServices", () => ({ useServices: () => mockUseServicesData }))

let mockUsePartnersData = { partners: [] as Partner[], hasPartners: false, activePartners: [] as Partner[] }
vi.mock("@/hooks/usepartner", () => ({ usePartners: () => mockUsePartnersData }))

let mockUseEventsData = {
  events: [] as EventItem[],
  filteredEvents: [] as EventItem[],
  selectedFilter: "all",
  setSelectedFilter: vi.fn(),
  hasEvents: false,
  ongoingEvents: [] as EventItem[],
  upcomingEvents: [] as EventItem[],
  onlineEvents: [] as EventItem[],
  offlineEvents: [] as EventItem[],
  resetFilter: vi.fn(),
}
vi.mock("@/hooks/useevent", () => ({ useEvents: () => mockUseEventsData }))

let mockUseStatsData = { stats: [] as Stat[], loading: true, error: null as string | null }
vi.mock("@/hooks/useStats", () => ({ useStats: () => mockUseStatsData }))

let mockUseTestimonialsData = { testimonials: [] as any[], loading: true, error: null as string | null }
vi.mock("@/hooks/useTestimonials", () => ({ useTestimonials: () => mockUseTestimonialsData }))

vi.mock("@/lib/apicalls/events", () => ({ getEvents: vi.fn() }))
vi.mock("@/lib/apicalls/services", () => ({ getServices: vi.fn() }))
vi.mock("@/lib/apicalls/partner", () => ({ getPartners: vi.fn() }))

const mockService: ServiceItem = {
  id: "s1", slug: "test-service", service_name: "Test Service",
  short_description: "A great service", image_url: null, heading: null,
  subheading: null, content: "Full content", is_active: true, display_order: 1,
  tenant_id: "t1", created_at: "", updated_at: "", service_faqs: [],
}

const mockPartner: Partner = {
  id: "p1", slug: "test-partner", company_name: "Test Partner",
  logo_url: "/logo.png", company_website: null, heading_text: null,
  short_description: "A partner company", review: null, review_by: null,
  content: null, result: null, about_the_company: null, is_active: true,
  display_order: 1, tenant_id: "t1", created_at: "", updated_at: "",
}

const mockEvent: EventItem = {
  id: "e1", slug: "test-event", event_name: "Test Event", event_type: "offline",
  event_tag: "free", status: "upcoming", short_description: "An event",
  complete_description: "Full", cover_image_url: null, is_active: true,
  display_order: 1, tenant_id: "t1", registration_link: "", online_platform: null,
  online_join_label: null, event_addresses: [], event_organizers: [],
  event_gallery: [], created_at: "", updated_at: "",
}

const mockStat: Stat = {
  id: "st1", tenant_id: "t1", icon: "users", number: "500+", title: "Happy Clients",
  description: null, is_active: true, display_order: 1,
}

beforeEach(() => {
  mockUseServicesData = { services: [], hasServices: false, activeServices: [] }
  mockUsePartnersData = { partners: [], hasPartners: false, activePartners: [] }
  mockUseEventsData = { events: [], filteredEvents: [], selectedFilter: "all", setSelectedFilter: vi.fn(), hasEvents: false, ongoingEvents: [], upcomingEvents: [], onlineEvents: [], offlineEvents: [], resetFilter: vi.fn() }
  mockUseStatsData = { stats: [], loading: true, error: null }
  mockUseTestimonialsData = { testimonials: [], loading: true, error: null }
})

describe("ServicesGrid", () => {
  it("returns null when no services", async () => {
    const { ServicesGrid } = await import("@/components/sections/ServicesGrid")
    const { container } = render(<ServicesGrid initialServices={[]} />)
    expect(container.innerHTML).toBe("")
  })

  it("renders service cards", async () => {
    mockUseServicesData = { services: [mockService], hasServices: true, activeServices: [mockService] }
    const { ServicesGrid } = await import("@/components/sections/ServicesGrid")
    render(<ServicesGrid initialServices={[mockService]} />)
    expect(screen.getByText("Test Service")).toBeDefined()
    expect(screen.getByText("A great service")).toBeDefined()
  })
})

describe("ServicesPageGrid", () => {
  it("renders service cards with name and description", async () => {
    mockUseServicesData = { services: [mockService], hasServices: true, activeServices: [mockService] }
    const { ServicesPageGrid } = await import("@/components/sections/ServicesPageGrid")
    render(<ServicesPageGrid initialServices={[mockService]} />)
    expect(screen.getByText("Test Service")).toBeDefined()
  })
})

describe("PartnersGrid", () => {
  it("returns null when no partners", async () => {
    const { PartnersGrid } = await import("@/components/sections/PartnersGrid")
    const { container } = render(<PartnersGrid initialPartners={[]} />)
    expect(container.innerHTML).toBe("")
  })

  it("renders partner cards", async () => {
    mockUsePartnersData = { partners: [mockPartner], hasPartners: true, activePartners: [mockPartner] }
    const { PartnersGrid } = await import("@/components/sections/PartnersGrid")
    render(<PartnersGrid initialPartners={[mockPartner]} />)
    expect(screen.getByText("Test Partner")).toBeDefined()
    expect(screen.getByText("A partner company")).toBeDefined()
  })
})

describe("PartnersTicker", () => {
  it("returns null when no partners", async () => {
    const { PartnersTicker } = await import("@/components/sections/PartnersTicker")
    const { container } = render(<PartnersTicker initialPartners={[]} />)
    expect(container.innerHTML).toBe("")
  })

  it("renders partner cards", async () => {
    mockUsePartnersData = { partners: [mockPartner], hasPartners: true, activePartners: [mockPartner] }
    const { PartnersTicker } = await import("@/components/sections/PartnersTicker")
    render(<PartnersTicker initialPartners={[mockPartner]} />)
    const paragraphs = screen.getAllByText("A partner company")
    expect(paragraphs.length).toBeGreaterThanOrEqual(1)
  })
})

describe("EventsClientSection", () => {
  it("renders no events message when no events", async () => {
    mockUseEventsData = { ...mockUseEventsData, hasEvents: true, filteredEvents: [] }
    const { EventsClientSection } = await import("@/components/sections/EventSection")
    render(<EventsClientSection initialEvents={[]} />)
    expect(screen.getByText("No events found for this filter.")).toBeDefined()
  })

  it("renders events", async () => {
    mockUseEventsData = { ...mockUseEventsData, hasEvents: true, filteredEvents: [mockEvent] }
    const { EventsClientSection } = await import("@/components/sections/EventSection")
    render(<EventsClientSection initialEvents={[mockEvent]} />)
    expect(screen.getByText("Test Event")).toBeDefined()
  })
})

describe("StatsHorizontal", () => {
  it("renders loading skeleton", async () => {
    const { default: StatsHorizontal } = await import("@/components/sections/StatsHorizontal")
    const { container } = render(<StatsHorizontal stats={[]} loading={true} error={null} />)
    expect(container.querySelector(".animate-pulse")).not.toBeNull()
  })

  it("returns null on error", async () => {
    const { default: StatsHorizontal } = await import("@/components/sections/StatsHorizontal")
    const { container } = render(<StatsHorizontal stats={[]} loading={false} error="Error" />)
    expect(container.innerHTML).toBe("")
  })

  it("renders stats data", async () => {
    const { default: StatsHorizontal } = await import("@/components/sections/StatsHorizontal")
    render(<StatsHorizontal stats={[mockStat]} loading={false} error={null} />)
    expect(screen.getByText("500+")).toBeDefined()
    expect(screen.getByText("Happy Clients")).toBeDefined()
  })
})

describe("StatsSection", () => {
  it("renders loading skeleton", async () => {
    const { default: StatsSection } = await import("@/components/sections/stats_section")
    const { container } = render(<StatsSection stats={[]} loading={true} error={null} />)
    expect(container.querySelector(".animate-pulse")).not.toBeNull()
  })

  it("renders error message", async () => {
    const { default: StatsSection } = await import("@/components/sections/stats_section")
    render(<StatsSection stats={[]} loading={false} error="Failed" />)
    expect(screen.getByText("Unable to load statistics. Please try again later.")).toBeDefined()
  })

  it("renders no stats message", async () => {
    const { default: StatsSection } = await import("@/components/sections/stats_section")
    render(<StatsSection stats={[]} loading={false} error={null} />)
    expect(screen.getByText("No stats available.")).toBeDefined()
  })

  it("renders stats data", async () => {
    const { default: StatsSection } = await import("@/components/sections/stats_section")
    render(<StatsSection stats={[mockStat]} loading={false} error={null} />)
    expect(screen.getByText("500+")).toBeDefined()
    expect(screen.getByText("Happy Clients")).toBeDefined()
  })
})

describe("stats wrapper", () => {
  it("renders stats data", async () => {
    mockUseStatsData = { stats: [mockStat], loading: false, error: null }
    const { default: Stats } = await import("@/components/sections/stats")
    render(<Stats />)
    const headings = screen.getAllByText("500+")
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })
})

describe("testimonials", () => {
  it("returns null when loading", async () => {
    const { default: Testimonials } = await import("@/components/sections/testimonials")
    const { container } = render(<Testimonials />)
    expect(container.innerHTML).toBe("")
  })

  it("returns null when error", async () => {
    mockUseTestimonialsData = { testimonials: [], loading: false, error: "Failed" }
    const { default: Testimonials } = await import("@/components/sections/testimonials")
    const { container } = render(<Testimonials />)
    expect(container.innerHTML).toBe("")
  })

  it("returns null when empty", async () => {
    mockUseTestimonialsData = { testimonials: [], loading: false, error: null }
    const { default: Testimonials } = await import("@/components/sections/testimonials")
    const { container } = render(<Testimonials />)
    expect(container.innerHTML).toBe("")
  })
})

describe("EventPageUI", () => {
  it("renders events from API", async () => {
    const { getEvents } = await import("@/lib/apicalls/events")
    vi.mocked(getEvents).mockResolvedValue([mockEvent])
    mockUseEventsData = { ...mockUseEventsData, filteredEvents: [mockEvent], hasEvents: true }
    const { default: EventsPage } = await import("@/components/sections/EventPageUI")
    const element = await EventsPage()
    render(element)
    expect(screen.getByText("Test Event")).toBeDefined()
  })
})

describe("EventsUI", () => {
  it("returns null when no events", async () => {
    const { getEvents } = await import("@/lib/apicalls/events")
    vi.mocked(getEvents).mockResolvedValue([])
    const { EventsUI } = await import("@/components/sections/EventsUI")
    const result = await EventsUI()
    expect(result).toBeNull()
  })

  it("renders events from API", async () => {
    const { getEvents } = await import("@/lib/apicalls/events")
    vi.mocked(getEvents).mockResolvedValue([mockEvent])
    mockUseEventsData = { ...mockUseEventsData, filteredEvents: [mockEvent], hasEvents: true }
    const { EventsUI } = await import("@/components/sections/EventsUI")
    const element = await EventsUI()
    render(element!)
    expect(screen.getByText("Test Event")).toBeDefined()
  })
})

describe("ServicesUI", () => {
  it("returns null when no services", async () => {
    const { getServices } = await import("@/lib/apicalls/services")
    vi.mocked(getServices).mockResolvedValue([])
    const { ServicesUI } = await import("@/components/sections/ServicesUI")
    const result = await ServicesUI()
    expect(result).toBeNull()
  })

  it("renders services from API", async () => {
    const { getServices } = await import("@/lib/apicalls/services")
    vi.mocked(getServices).mockResolvedValue([mockService])
    mockUseServicesData = { services: [mockService], hasServices: true, activeServices: [mockService] }
    const { ServicesUI } = await import("@/components/sections/ServicesUI")
    const element = await ServicesUI()
    render(element!)
    expect(screen.getByText("Test Service")).toBeDefined()
  })
})

describe("PartnersUI", () => {
  it("returns null when no partners", async () => {
    const { getPartners } = await import("@/lib/apicalls/partner")
    vi.mocked(getPartners).mockResolvedValue([])
    const { PartnersUI } = await import("@/components/sections/Partners")
    const result = await PartnersUI()
    expect(result).toBeNull()
  })

  it("renders partners from API", async () => {
    const { getPartners } = await import("@/lib/apicalls/partner")
    vi.mocked(getPartners).mockResolvedValue([mockPartner])
    mockUsePartnersData = { partners: [mockPartner], hasPartners: true, activePartners: [mockPartner] }
    const { PartnersUI } = await import("@/components/sections/Partners")
    const element = await PartnersUI()
    render(element!)
    const paragraphs = screen.getAllByText("A partner company")
    expect(paragraphs.length).toBeGreaterThanOrEqual(1)
  })
})
