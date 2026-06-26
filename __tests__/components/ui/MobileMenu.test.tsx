import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import React from "react"
import MobileMenu from "@/components/ui/MobileMenu"
import MobileMenuButton from "@/components/ui/MobileMenuButton"

let mockPathname = "/"
const mockPush = vi.fn()

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: mockPush }),
}))

vi.mock("next/link", () => ({
  default: ({ children, href, className, ...props }: any) =>
    React.createElement("a", { href, className, ...props }, children),
}))

vi.mock("@/components/ui/drawer", () => {
  function Drawer({ children, open }: any) {
    return open ? React.createElement("div", { "data-testid": "drawer" }, children) : null
  }
  function DrawerClose({ children }: any) {
    return children
  }
  function DrawerContent({ children }: any) {
    return React.createElement("div", { "data-testid": "drawer-content" }, children)
  }
  function DrawerHeader({ children }: any) {
    return React.createElement("div", null, children)
  }
  function DrawerFooter({ children }: any) {
    return React.createElement("div", null, children)
  }
  function DrawerTitle({ children }: any) {
    return React.createElement("div", { "data-testid": "drawer-title" }, children)
  }
  return { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle }
})

beforeEach(() => {
  mockPathname = "/"
  mockPush.mockClear()
  document.body.style.overflow = ""
})

describe("MobileMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<MobileMenu open={false} onClose={() => {}} />)
    expect(container.querySelector('[data-testid="drawer"]')).toBeNull()
  })

  it("renders navigation links when open", () => {
    render(<MobileMenu open={true} onClose={() => {}} />)
    const nav = screen.getByRole("navigation")
    expect(nav).toBeDefined()
    expect(screen.getByText("Home")).toBeDefined()
    expect(screen.getByText("Partners")).toBeDefined()
    expect(screen.getByText("Entrepreneurs")).toBeDefined()
    expect(screen.getByText("Services")).toBeDefined()
    expect(screen.getByText("Events")).toBeDefined()
    expect(screen.getByText("About")).toBeDefined()
  })

  it("renders drawer title with SITE_CONFIG name", () => {
    render(<MobileMenu open={true} onClose={() => {}} />)
    expect(screen.getByText("Vinhans Liberty")).toBeDefined()
  })

  it("renders Contact and Join Our Team buttons", () => {
    render(<MobileMenu open={true} onClose={() => {}} />)
    expect(screen.getByText("Contact")).toBeDefined()
    expect(screen.getByText("Join Our Team")).toBeDefined()
  })

  it("renders close button with aria-label", () => {
    render(<MobileMenu open={true} onClose={() => {}} />)
    expect(screen.getByLabelText("Close menu")).toBeDefined()
  })

  it("sets body overflow hidden when open", () => {
    render(<MobileMenu open={true} onClose={() => {}} />)
    expect(document.body.style.overflow).toBe("hidden")
  })

  it("removes body overflow when closed", () => {
    const { rerender } = render(<MobileMenu open={true} onClose={() => {}} />)
    expect(document.body.style.overflow).toBe("hidden")
    rerender(<MobileMenu open={false} onClose={() => {}} />)
    expect(document.body.style.overflow).toBe("")
  })

  it("cleans up body overflow on unmount", () => {
    const { unmount } = render(<MobileMenu open={true} onClose={() => {}} />)
    expect(document.body.style.overflow).toBe("hidden")
    unmount()
    expect(document.body.style.overflow).toBe("")
  })

  it("highlights active link matching pathname", () => {
    mockPathname = "/services"
    render(<MobileMenu open={true} onClose={() => {}} />)
    const servicesLink = screen.getByText("Services").closest("a")!
    expect(servicesLink.className).toContain("bg-accent")
  })

  it("does not highlight inactive links", () => {
    mockPathname = "/services"
    render(<MobileMenu open={true} onClose={() => {}} />)
    const homeLink = screen.getByText("Home").closest("a")!
    expect(homeLink.className).toContain("hover:bg-accent")
    expect(homeLink.className).not.toContain("text-foreground")
  })

  it("calls onClose and navigates on Contact click", () => {
    const onClose = vi.fn()
    render(<MobileMenu open={true} onClose={onClose} />)
    fireEvent.click(screen.getByText("Contact"))
    expect(onClose).toHaveBeenCalledOnce()
    expect(mockPush).toHaveBeenCalledWith("/contact")
  })

  it("calls onClose and navigates on Join Our Team click", () => {
    const onClose = vi.fn()
    render(<MobileMenu open={true} onClose={onClose} />)
    fireEvent.click(screen.getByText("Join Our Team"))
    expect(onClose).toHaveBeenCalledOnce()
    expect(mockPush).toHaveBeenCalledWith("/#join-team")
  })
})

describe("MobileMenuButton", () => {
  it("renders floating button", () => {
    render(<MobileMenuButton />)
    expect(screen.getByLabelText("Toggle mobile menu")).toBeDefined()
  })

  it("renders Menu icon", () => {
    render(<MobileMenuButton />)
    const button = screen.getByLabelText("Toggle mobile menu")
    expect(button.querySelector("svg")).toBeDefined()
  })

  it("opens menu on button click", () => {
    render(<MobileMenuButton />)
    const button = screen.getByLabelText("Toggle mobile menu")
    fireEvent.click(button)

    expect(screen.getByText("Home")).toBeDefined()
  })
})
