import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import React from "react"

let mockPathname = "/"
let mockIsScrolled = false

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}))

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { href, ...props }, children),
}))

vi.mock("next/image", () => ({
  default: ({ alt }: any) =>
    React.createElement("div", { "data-testid": `image-${alt}` }),
}))

vi.mock("@/hooks/useScrollEffect", () => ({
  useScrollEffect: () => mockIsScrolled,
}))

import NavigationHeader from "@/components/sections/navigation_header"

describe("NavigationHeader", () => {
  it("renders logo with alt text", () => {
    render(<NavigationHeader />)
    expect(screen.getByTestId("image-logo")).toBeDefined()
  })

  it("renders all navigation links", () => {
    render(<NavigationHeader />)
    expect(screen.getByText("Home")).toBeDefined()
    expect(screen.getByText("Partners")).toBeDefined()
    expect(screen.getByText("Entrepreneurs")).toBeDefined()
    expect(screen.getByText("Services")).toBeDefined()
    expect(screen.getByText("Events")).toBeDefined()
    expect(screen.getByText("About")).toBeDefined()
  })

  it("renders Join Our Team and Contact buttons", () => {
    render(<NavigationHeader />)
    expect(screen.getByText("Join Our Team")).toBeDefined()
    expect(screen.getByText("Contact")).toBeDefined()
  })

  it("applies active-style class to active link", () => {
    mockPathname = "/services"
    render(<NavigationHeader />)
    const servicesLink = screen.getByText("Services").closest("a")!
    expect(servicesLink.className).toContain("active-style")
  })

  it("applies backdrop-blur class when scrolled", () => {
    mockIsScrolled = true
    const { container } = render(<NavigationHeader />)
    expect(container.firstElementChild?.className).toContain("backdrop-blur")
  })
})
