import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import LeadForm from "@/components/forms/LeadForm"

const mockServices = [
  { id: "s1", name: "Wealth Management", description: "Grow your wealth" },
]

const mockFields = [
  { id: "f1", label: "Investment Amount", field_key: "amount", field_type: "text", placeholder: "Enter amount", is_required: true, options: null, sort_order: 1 },
]

vi.mock("@/lib/cache/memory-cache", () => ({
  getMemoryCachedData: vi.fn((_key: string, _ttl: number, fetcher: () => Promise<unknown>) => fetcher()),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal("fetch", vi.fn())
})

function mockFetch(overrides: Partial<{
  services: unknown
  fields: unknown
  sendOtp: unknown
  verifyOtp: unknown
  submitLead: unknown
}> = {}) {
  const fetch = vi.fn()
  vi.stubGlobal("fetch", fetch)

  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(overrides.services ?? mockServices),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(overrides.fields ?? mockFields),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(overrides.sendOtp ?? { token: "otp-token" }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(overrides.verifyOtp ?? { success: true }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(overrides.submitLead ?? { success: true }),
    })
  return fetch
}

async function fillStep1() {
  await screen.findByRole("heading", { name: "Basic Details" })
  fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } })
  fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } })
  fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@example.com" } })
  fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "1234567890" } })
  fireEvent.change(screen.getByLabelText("Age"), { target: { value: "30" } })
  fireEvent.change(screen.getByLabelText("Gender"), { target: { value: "Male" } })
  fireEvent.click(screen.getByText("Wealth Management"))
}

describe("LeadForm", () => {
  it("renders step 1 initially", async () => {
    mockFetch()
    render(<LeadForm />)
    await screen.findByRole("heading", { name: "Basic Details" })
    expect(screen.getByRole("heading", { name: "Basic Details" })).toBeDefined()
  })

  it("shows fetch error when services API fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "Server error" }),
    }))
    render(<LeadForm />)
    await screen.findByText("Unable to load services. Please try again later.")
    expect(screen.getByText("Unable to load services. Please try again later.")).toBeDefined()
  })

  it("transitions to step 2 after filling step 1", async () => {
    mockFetch()
    render(<LeadForm />)
    await fillStep1()
    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    await screen.findByText("Please provide details for your selected service.")
    expect(screen.getByText("Please provide details for your selected service.")).toBeDefined()
  })

  it("transitions to step 3 after step 2", async () => {
    mockFetch()
    render(<LeadForm />)
    await fillStep1()

    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    await screen.findByText("Please provide details for your selected service.")

    const fieldInput = screen.getByLabelText("Investment Amount")
    fireEvent.change(fieldInput, { target: { value: "50000" } })
    fireEvent.click(screen.getByText("Continue"))

    await screen.findByRole("heading", { name: "Review Your Details" })
    expect(screen.getByRole("heading", { name: "Review Your Details" })).toBeDefined()
  })

  it("shows OTP modal on final submit", async () => {
    mockFetch()
    render(<LeadForm />)
    await fillStep1()

    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    await screen.findByText("Please provide details for your selected service.")

    fireEvent.change(screen.getByLabelText("Investment Amount"), { target: { value: "50000" } })
    fireEvent.click(screen.getByText("Continue"))
    await screen.findByRole("heading", { name: "Review Your Details" })

    fireEvent.click(screen.getByText("Submit & Verify"))
    await screen.findByText("Verify Your Email")
    expect(screen.getByText("Verify Your Email")).toBeDefined()
  })

  it("shows success state after OTP verification", async () => {
    mockFetch()
    render(<LeadForm />)
    await fillStep1()

    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    await screen.findByText("Please provide details for your selected service.")

    fireEvent.change(screen.getByLabelText("Investment Amount"), { target: { value: "50000" } })
    fireEvent.click(screen.getByText("Continue"))
    await screen.findByRole("heading", { name: "Review Your Details" })

    fireEvent.click(screen.getByText("Submit & Verify"))
    await screen.findByText("Verify Your Email")

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    "123456".split("").forEach((d, i) => {
      fireEvent.change(inputs[i], { target: { value: d } })
    })

    fireEvent.click(screen.getByText("Verify & Submit"))
    await screen.findByText("Request Submitted!")
    expect(screen.getByText("Request Submitted!")).toBeDefined()
    expect(screen.getByText(/Thank you for choosing American Wealth Corp/)).toBeDefined()
  })

  it("shows submit error when OTP send fails", async () => {
    const fetch = vi.fn()
    vi.stubGlobal("fetch", fetch)
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockServices),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockFields),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: "OTP send failed" }),
      })

    render(<LeadForm />)
    await fillStep1()

    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    await screen.findByText("Please provide details for your selected service.")

    fireEvent.change(screen.getByLabelText("Investment Amount"), { target: { value: "50000" } })
    fireEvent.click(screen.getByText("Continue"))
    await screen.findByRole("heading", { name: "Review Your Details" })

    fireEvent.click(screen.getByText("Submit & Verify"))
    await screen.findByText("OTP send failed")
    expect(screen.getByText("OTP send failed")).toBeDefined()
  })

  it("calls submit-lead API after OTP verification", async () => {
    const fetch = mockFetch()
    render(<LeadForm />)
    await fillStep1()

    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    await screen.findByText("Please provide details for your selected service.")

    fireEvent.change(screen.getByLabelText("Investment Amount"), { target: { value: "50000" } })
    fireEvent.click(screen.getByText("Continue"))
    await screen.findByRole("heading", { name: "Review Your Details" })

    fireEvent.click(screen.getByText("Submit & Verify"))
    await screen.findByText("Verify Your Email")

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[]
    "123456".split("").forEach((d, i) => {
      fireEvent.change(inputs[i], { target: { value: d } })
    })

    fireEvent.click(screen.getByText("Verify & Submit"))
    await screen.findByText("Request Submitted!")

    const submitCalls = fetch.mock.results.filter((r: { type: string }) => r.type === "return")
    const submitLeadCall = fetch.mock.calls.find((c: [string]) => c[0] === "/api/submit-lead")
    expect(submitLeadCall).toBeDefined()
  })
})
