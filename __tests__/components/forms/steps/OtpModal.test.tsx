import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import OtpModal from "@/components/forms/steps/OtpModal"

function setup(overrides: Partial<Parameters<typeof OtpModal>[0]> = {}) {
  const props = {
    email: "test@example.com",
    token: "test-token",
    setToken: vi.fn(),
    onVerified: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  }
  return { props, ...render(<OtpModal {...props} />) }
}

describe("OtpModal", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("renders the modal with email", () => {
    setup()
    expect(screen.getByText("Verify Your Email")).toBeDefined()
    expect(screen.getByText("test@example.com")).toBeDefined()
  })

  it("renders 6 digit inputs", () => {
    setup()
    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(6)
  })

  it("only accepts digits in inputs", () => {
    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    fireEvent.change(inputs[0], { target: { value: "a" } })
    expect(inputs[0].value).toBe("")
    fireEvent.change(inputs[0], { target: { value: "5" } })
    expect(inputs[0].value).toBe("5")
  })

  it("auto-advances to next input on digit entry", () => {
    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    fireEvent.change(inputs[0], { target: { value: "1" } })
    expect(document.activeElement).toBe(inputs[1])
  })

  it("moves focus back on backspace when empty", () => {
    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    fireEvent.change(inputs[0], { target: { value: "1" } })
    fireEvent.change(inputs[1], { target: { value: "2" } })
    expect(document.activeElement).toBe(inputs[2])
    fireEvent.keyDown(inputs[2], { key: "Backspace" })
    expect(document.activeElement).toBe(inputs[1])
  })

  it("handles paste of 6-digit code", () => {
    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    const container = inputs[0].closest(".flex")!
    fireEvent.paste(container, {
      clipboardData: { getData: () => "654321" },
    })
    expect(inputs[0].value).toBe("6")
    expect(inputs[3].value).toBe("3")
    expect(inputs[5].value).toBe("1")
  })

  it("disables verify button when OTP is incomplete", () => {
    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    fireEvent.change(inputs[0], { target: { value: "1" } })
    const button = screen.getByText("Verify & Submit").closest("button")!
    expect(button.disabled).toBe(true)
  })

  it("enables verify button when all 6 digits entered", () => {
    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    "123456".split("").forEach((d, i) => {
      fireEvent.change(inputs[i], { target: { value: d } })
    })
    const button = screen.getByText("Verify & Submit").closest("button")!
    expect(button.disabled).toBe(false)
  })

  it("calls onClose when Escape is pressed on backdrop", () => {
    const { props } = setup()
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" })
    expect(props.onClose).toHaveBeenCalled()
  })

  it("calls onClose when clicking backdrop", () => {
    const { props } = setup()
    fireEvent.click(screen.getByRole("dialog"))
    expect(props.onClose).toHaveBeenCalled()
  })

  it("shows resend cooldown countdown starting at 30s", () => {
    setup()
    expect(screen.getByText("30s")).toBeDefined()
  })

  it("decrements cooldown after 1 second", () => {
    setup()
    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.getByText("29s")).toBeDefined()
  })

  it("shows resend button after cooldown expires", () => {
    setup()
    for (let i = 0; i < 30; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }
    expect(screen.getByText("Resend OTP")).toBeDefined()
  })

  it("calls verify API and onVerified on success", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    })
    vi.stubGlobal("fetch", mockFetch)

    const { props } = setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    "123456".split("").forEach((d, i) => {
      fireEvent.change(inputs[i], { target: { value: d } })
    })

    fireEvent.click(screen.getByText("Verify & Submit"))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/verify-otp",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("test-token"),
        }),
      )
      expect(props.onVerified).toHaveBeenCalled()
    })
  })

  it("shows error on verify API failure", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "Invalid code" }),
    })
    vi.stubGlobal("fetch", mockFetch)

    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    "123456".split("").forEach((d, i) => {
      fireEvent.change(inputs[i], { target: { value: d } })
    })

    fireEvent.click(screen.getByText("Verify & Submit"))

    await waitFor(() => {
      expect(screen.getByText("Invalid code")).toBeDefined()
    })
  })

  it("calls resend API and resets OTP fields", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ token: "new-token" }),
    })
    vi.stubGlobal("fetch", mockFetch)

    const { props } = setup()
    for (let i = 0; i < 30; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }
    fireEvent.click(screen.getByText("Resend OTP"))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/send-otp",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "test@example.com" }),
        }),
      )
      expect(props.setToken).toHaveBeenCalledWith("new-token")
    })
  })

  it("shows error message when verify API throws", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"))
    vi.stubGlobal("fetch", mockFetch)

    setup()
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    "123456".split("").forEach((d, i) => {
      fireEvent.change(inputs[i], { target: { value: d } })
    })

    fireEvent.click(screen.getByText("Verify & Submit"))

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeDefined()
    })
  })
})
