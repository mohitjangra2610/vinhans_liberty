import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Step1BasicDetails from "@/components/forms/steps/Step1BasicDetails"
import type { BasicForm, Service } from "@/components/forms/LeadForm"

const mockServices: Service[] = [
  { id: "s1", name: "Wealth Management", description: "Grow your wealth" },
  { id: "s2", name: "Retirement Planning", description: "Plan your future" },
]

const defaultForm: BasicForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
}

function setup(overrides: {
  form?: BasicForm
  services?: Service[]
  selectedService?: Service | null
} = {}) {
  const form = overrides.form ?? defaultForm
  const services = overrides.services ?? mockServices
  const selectedService = overrides.selectedService ?? null
  const setForm = vi.fn()
  const setSelectedService = vi.fn()
  const onNext = vi.fn()

  render(
    <Step1BasicDetails
      form={form}
      setForm={setForm}
      services={services}
      selectedService={selectedService}
      setSelectedService={setSelectedService}
      onNext={onNext}
    />,
  )

  return { setForm, setSelectedService, onNext }
}

describe("Step1BasicDetails", () => {
  it("renders all input fields", () => {
    setup()
    expect(screen.getByLabelText("First Name")).toBeDefined()
    expect(screen.getByLabelText("Last Name")).toBeDefined()
    expect(screen.getByLabelText("Email Address")).toBeDefined()
    expect(screen.getByLabelText("Phone Number")).toBeDefined()
    expect(screen.getByLabelText("Age")).toBeDefined()
    expect(screen.getByLabelText("Gender")).toBeDefined()
  })

  it("renders service options", () => {
    setup()
    expect(screen.getByText("Wealth Management")).toBeDefined()
    expect(screen.getByText("Grow your wealth")).toBeDefined()
    expect(screen.getByText("Retirement Planning")).toBeDefined()
    expect(screen.getByText("Plan your future")).toBeDefined()
  })

  it("disables continue button when no service is selected", () => {
    setup()
    expect(screen.getByText("Continue")).toBeDisabled()
  })

  it("enables continue button when a service is selected", () => {
    setup({ selectedService: mockServices[0] })
    expect(screen.getByText("Continue")).not.toBeDisabled()
  })

  it("shows hint text when no service is selected", () => {
    setup()
    expect(screen.getByText("Please select a service to continue.")).toBeDefined()
  })

  it("hides hint text when a service is selected", () => {
    setup({ selectedService: mockServices[0] })
    expect(screen.queryByText("Please select a service to continue.")).toBeNull()
  })

  it("calls setSelectedService when a service card is clicked", () => {
    const { setSelectedService } = setup()
    fireEvent.click(screen.getByText("Wealth Management"))
    expect(setSelectedService).toHaveBeenCalledWith(mockServices[0])
  })

  it("calls setForm on input change", () => {
    const { setForm } = setup()
    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } })
    expect(setForm).toHaveBeenCalledWith({ ...defaultForm, first_name: "John" })
  })

  it("calls setForm on gender select change", () => {
    const { setForm } = setup()
    fireEvent.change(screen.getByLabelText("Gender"), { target: { value: "Male" } })
    expect(setForm).toHaveBeenCalledWith({ ...defaultForm, gender: "Male" })
  })

  it("calls onNext on submit when service is selected", () => {
    const { onNext } = setup({ selectedService: mockServices[0] })
    fireEvent.submit(screen.getByText("Continue").closest("form")!)
    expect(onNext).toHaveBeenCalledOnce()
  })

  it("does not call onNext on submit when no service is selected", () => {
    const { onNext } = setup()
    fireEvent.click(screen.getByText("Continue"))
    expect(onNext).not.toHaveBeenCalled()
  })

  it("pre-fills form values", () => {
    const filledForm: BasicForm = {
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      phone: "+1234567890",
      age: "30",
      gender: "Female",
    }
    setup({ form: filledForm })
    expect((screen.getByLabelText("First Name") as HTMLInputElement).value).toBe("Jane")
    expect((screen.getByLabelText("Last Name") as HTMLInputElement).value).toBe("Doe")
    expect((screen.getByLabelText("Email Address") as HTMLInputElement).value).toBe("jane@example.com")
    expect((screen.getByLabelText("Phone Number") as HTMLInputElement).value).toBe("+1234567890")
    expect((screen.getByLabelText("Age") as HTMLInputElement).value).toBe("30")
    expect((screen.getByLabelText("Gender") as HTMLSelectElement).value).toBe("Female")
  })
})
