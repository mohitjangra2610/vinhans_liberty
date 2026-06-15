import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Error from "@/app/error"

describe("Error page", () => {
  it("renders error heading", () => {
    render(<Error error={new Error("test")} reset={() => {}} />)
    expect(screen.getByText("Something went wrong")).toBeDefined()
  })

  it("renders error message", () => {
    render(<Error error={new Error("test")} reset={() => {}} />)
    expect(
      screen.getByText("An unexpected error occurred. Please try again.")
    ).toBeDefined()
  })

  it("renders Try Again button", () => {
    render(<Error error={new Error("test")} reset={() => {}} />)
    expect(screen.getByText("Try Again")).toBeDefined()
  })

  it("calls reset on Try Again click", () => {
    const reset = vi.fn()
    render(<Error error={new Error("test")} reset={reset} />)
    fireEvent.click(screen.getByText("Try Again"))
    expect(reset).toHaveBeenCalledOnce()
  })
})
