import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Loading from "@/app/loading"

describe("Loading page", () => {
  it("renders spinner", () => {
    const { container } = render(<Loading />)
    const spinner = container.querySelector(".animate-spin")
    expect(spinner).not.toBeNull()
  })
})
