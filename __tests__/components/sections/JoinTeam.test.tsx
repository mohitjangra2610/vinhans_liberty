import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { JoinTeam } from "@/components/sections/JoinTeam"

vi.mock("@/lib/apicalls/team", () => ({
  submitTeamForm: vi.fn().mockResolvedValue({ success: true }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal("fetch", vi.fn())
})

afterEach(() => {
  vi.restoreAllMocks()
})

function mockFetchHappy() {
  const fetch = vi.fn()
  vi.stubGlobal("fetch", fetch)
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ token: "otp-token" }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    })
  return fetch
}

function fillFormFields() {
  fireEvent.change(screen.getByLabelText("Full Name"), {
    target: { value: "John Doe" },
  })
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "john@example.com" },
  })
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: "1234567890" },
  })
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "I want to join!" },
  })
}

function getOtpInputs() {
  const modal = screen.getByRole("dialog")
  return modal.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>
}

function fillOtp() {
  const inputs = getOtpInputs()
  "123456".split("").forEach((d, i) => {
    fireEvent.change(inputs[i], { target: { value: d } })
  })
}

describe("JoinTeam", () => {
  it("renders the section heading", () => {
    render(<JoinTeam />)
    expect(screen.getByText("Join Our Team")).toBeDefined()
  })

  it("renders all form fields", () => {
    render(<JoinTeam />)
    expect(screen.getByLabelText("Full Name")).toBeDefined()
    expect(screen.getByLabelText("Email Address")).toBeDefined()
    expect(screen.getByLabelText("Phone Number")).toBeDefined()
    expect(screen.getByLabelText("Message")).toBeDefined()
  })

  it("renders the submit button", () => {
    render(<JoinTeam />)
    expect(screen.getByText("Submit")).toBeDefined()
  })

  it("shows OTP modal after form submit", async () => {
    mockFetchHappy()
    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))

    await screen.findByText("Verify your email")
    expect(screen.getByText("john@example.com")).toBeDefined()
  })

  it("shows loading state on submit button", async () => {
    const fetch = vi.fn()
    vi.stubGlobal("fetch", fetch)
    fetch.mockImplementation(() => new Promise(() => {}))

    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))
    await screen.findByText("Sending OTP...")
  })

  it("shows error when send-otp fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: "Send failed" }),
      }),
    )
    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))

    await screen.findByText("Send failed")
  })

  it("calls verify-otp and submitTeamForm on verify", async () => {
    mockFetchHappy()
    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))
    await screen.findByText("Verify your email")

    fillOtp()
    fireEvent.click(screen.getByText("Verify & Submit"))

    const { submitTeamForm } = await import("@/lib/apicalls/team")
    await waitFor(() => {
      expect(submitTeamForm).toHaveBeenCalledWith(
        expect.objectContaining({
          full_name: "John Doe",
          email: "john@example.com",
        }),
      )
    })
  })

  it("shows success message after OTP verification", async () => {
    mockFetchHappy()
    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))
    await screen.findByText("Verify your email")

    fillOtp()
    fireEvent.click(screen.getByText("Verify & Submit"))

    await screen.findByText("Your request has been submitted successfully.")
  })

  it("closes OTP modal on cancel", async () => {
    mockFetchHappy()
    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))
    await screen.findByText("Verify your email")

    fireEvent.click(screen.getByText("Cancel — Form not submitted"))

    expect(screen.queryByText("Verify your email")).toBeNull()
  })

  it("closes OTP modal on Escape key", async () => {
    mockFetchHappy()
    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))
    await screen.findByText("Verify your email")

    fireEvent.keyDown(document, { key: "Escape" })

    expect(screen.queryByText("Verify your email")).toBeNull()
  })

  it("shows OTP error on invalid verify", async () => {
    const fetch = vi.fn()
    vi.stubGlobal("fetch", fetch)
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ token: "otp-token" }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: "Invalid OTP" }),
      })

    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))
    await screen.findByText("Verify your email")

    fillOtp()
    fireEvent.click(screen.getByText("Verify & Submit"))

    await screen.findByText("Invalid OTP")
  })

  it("shows resend after cooldown and resends OTP", async () => {
    vi.useFakeTimers()

    const fetch = vi.fn()
    vi.stubGlobal("fetch", fetch)
    fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: "otp-token" }),
    }))

    render(<JoinTeam />)
    fillFormFields()
    fireEvent.click(screen.getByText("Submit"))

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByText("Resend in 30s")).toBeDefined()

    for (let i = 0; i < 30; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }

    expect(screen.getByText("Resend OTP")).toBeDefined()

    vi.useRealTimers()
  })
})
