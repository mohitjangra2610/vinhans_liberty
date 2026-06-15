import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Step2ServiceData from "@/components/forms/steps/Step2ServiceData"
import type { Service, ServiceField } from "@/components/forms/LeadForm"

function createField(overrides: Partial<ServiceField> = {}): ServiceField {
  return {
    id: "f1",
    label: "Full Name",
    field_key: "full_name",
    field_type: "text",
    placeholder: "Enter name",
    is_required: true,
    options: null,
    sort_order: 1,
    ...overrides,
  }
}

const mockService: Service = {
  id: "svc1",
  name: "Test Service",
  description: "A description of test service",
}

function setup(overrides: {
  fields?: ServiceField[]
  serviceData?: Record<string, unknown>
} = {}) {
  const fields = overrides.fields ?? [createField()]
  const serviceData = overrides.serviceData ?? {}
  const setServiceData = vi.fn()
  const onBack = vi.fn()
  const onNext = vi.fn()

  render(
    <Step2ServiceData
      service={mockService}
      fields={fields}
      serviceData={serviceData}
      setServiceData={setServiceData}
      onBack={onBack}
      onNext={onNext}
    />,
  )

  return { setServiceData, onBack, onNext }
}

describe("Step2ServiceData", () => {
  it("renders service name and description", () => {
    setup()
    expect(screen.getByText("Test Service")).toBeDefined()
    expect(screen.getByText("Please provide details for your selected service.")).toBeDefined()
  })

  it("renders a text field", () => {
    setup()
    expect(screen.getByLabelText("Full Name")).toBeDefined()
  })

  it("renders optional label for non-required fields", () => {
    setup({ fields: [createField({ is_required: false })] })
    expect(screen.getByText("(optional)")).toBeDefined()
  })

  it("does not render optional label for required fields", () => {
    setup({ fields: [createField({ is_required: true })] })
    expect(screen.queryByText("(optional)")).toBeNull()
  })

  it("updates field value on text input change", () => {
    const { setServiceData } = setup()
    const input = screen.getByLabelText("Full Name")
    fireEvent.change(input, { target: { value: "John" } })
    expect(setServiceData).toHaveBeenCalledWith({ full_name: "John" })
  })

  it("renders number fields with placeholder", () => {
    setup({
      fields: [
        createField({
          field_type: "number",
          field_key: "investment_amount",
          label: "Investment Amount",
          placeholder: "Enter amount",
        }),
      ],
    })
    const input = screen.getByLabelText("Investment Amount")
    expect(input).toBeDefined()
    expect(input).toHaveAttribute("type", "number")
  })

  it("renders investment_timeline hint", () => {
    setup({
      fields: [
        createField({
          field_type: "number",
          field_key: "investment_timeline",
          label: "Timeline",
        }),
      ],
    })
    expect(screen.getByText("(1-20 years)")).toBeDefined()
  })

  it("renders select fields with options", () => {
    setup({
      fields: [
        createField({
          field_type: "select",
          field_key: "goal",
          label: "Goal",
          options: ["Growth", "Income", "Preservation"],
        }),
      ],
    })
    expect(screen.getByLabelText("Goal")).toBeDefined()
    expect(screen.getByText("Growth")).toBeDefined()
    expect(screen.getByText("Income")).toBeDefined()
    expect(screen.getByText("Preservation")).toBeDefined()
    expect(screen.getByText("Select an option")).toBeDefined()
  })

  it("renders children_list field with add button", () => {
    setup({
      fields: [
        createField({
          field_type: "children_list",
          field_key: "children",
          label: "Children Details",
        }),
      ],
    })
    expect(screen.getByText("Children Details")).toBeDefined()
    expect(screen.getByText("+ Add Child")).toBeDefined()
  })

  it("adds a child entry when clicking add child button", () => {
    const { setServiceData } = setup({
      fields: [
        createField({
          field_type: "children_list",
          field_key: "children",
          label: "Children Details",
        }),
      ],
    })
    fireEvent.click(screen.getByText("+ Add Child"))
    expect(setServiceData).toHaveBeenCalledWith({ children: [{ name: "", age: "", gender: "" }] })
  })

  it("removes a child entry", () => {
    const { setServiceData } = setup({
      fields: [
        createField({
          field_type: "children_list",
          field_key: "children",
          label: "Children Details",
        }),
      ],
      serviceData: {
        children: [
          { name: "A", age: "5", gender: "Male" },
          { name: "B", age: "7", gender: "Female" },
        ],
      },
    })
    const removeButtons = screen.getAllByText("Remove")
    expect(removeButtons).toHaveLength(2)
    fireEvent.click(removeButtons[0])
    expect(setServiceData).toHaveBeenCalledWith({
      children: [{ name: "B", age: "7", gender: "Female" }],
    })
  })

  it("shows validation errors on submit when required fields are empty", () => {
    setup({
      fields: [
        createField({ id: "f1", field_key: "name", label: "Name" }),
        createField({ id: "f2", field_key: "email", label: "Email" }),
      ],
    })
    fireEvent.click(screen.getByText("Continue"))
    expect(screen.getByText("Name is required")).toBeDefined()
    expect(screen.getByText("Email is required")).toBeDefined()
  })

  it("calls onNext when validation passes", () => {
    const { onNext } = setup({
      serviceData: { full_name: "John" },
    })
    fireEvent.click(screen.getByText("Continue"))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it("does not call onNext when validation fails", () => {
    const { onNext } = setup()
    fireEvent.click(screen.getByText("Continue"))
    expect(onNext).not.toHaveBeenCalled()
  })

  it("calls onBack when back button is clicked", () => {
    const { onBack } = setup()
    fireEvent.click(screen.getByText("Back"))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it("clears error on field change", () => {
    setup({
      fields: [
        createField({ field_key: "name", label: "Name" }),
      ],
    })
    fireEvent.click(screen.getByText("Continue"))
    expect(screen.getByText("Name is required")).toBeDefined()
    const input = screen.getByLabelText("Name")
    fireEvent.change(input, { target: { value: "John" } })
    expect(screen.queryByText("Name is required")).toBeNull()
  })

  it("updates child field values", () => {
    const { setServiceData } = setup({
      fields: [
        createField({
          field_type: "children_list",
          field_key: "children",
          label: "Children",
        }),
      ],
      serviceData: {
        children: [{ name: "", age: "", gender: "" }],
      },
    })
    const nameInput = screen.getByPlaceholderText("Name")
    fireEvent.change(nameInput, { target: { value: "Alex" } })
    expect(setServiceData).toHaveBeenCalledWith({
      children: [{ name: "Alex", age: "", gender: "" }],
    })
  })
})
