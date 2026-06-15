import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import React from "react"

vi.mock("next/link", () => ({
  default: ({ children, href, className, ...props }: any) =>
    React.createElement("a", { href, className, ...props }, children),
}))

import NotFound from "@/app/not-found"

describe("NotFound page", () => {
  it("renders 404 heading", () => {
    render(<NotFound />)
    expect(screen.getByText("404")).toBeDefined()
  })

  it("renders page not found message", () => {
    render(<NotFound />)
    expect(screen.getByText("Page not found")).toBeDefined()
  })

  it("renders descriptive message", () => {
    render(<NotFound />)
    expect(
      screen.getByText(
        "The page you are looking for does not exist or has been moved."
      )
    ).toBeDefined()
  })

  it("renders Go Home link pointing to /", () => {
    render(<NotFound />)
    const link = screen.getByText("Go Home")
    expect(link.closest("a")?.getAttribute("href")).toBe("/")
  })
})
