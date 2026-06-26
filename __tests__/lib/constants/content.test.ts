import { describe, it, expect, vi, beforeEach, afterAll } from "vitest"

describe("SITE_CONFIG", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it("uses default fallback values when env vars are not set", async () => {
    const { SITE_CONFIG } = await import("@/lib/constants/content")
    expect(SITE_CONFIG.name).toBe("Vinhans Liberty")
    expect(SITE_CONFIG.contactEmail).toBe("empowerme@americanwealthcorp.com")
    expect(SITE_CONFIG.contactPhone).toBe("+1 (317) 602-0574")
    expect(SITE_CONFIG.tenantId).toBe("")
  })

  it("uses environment variable values when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_NAME", "Custom Corp")
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "custom@example.com")
    vi.stubEnv("NEXT_PUBLIC_CONTACT_PHONE", "+1 (555) 000-0000")
    vi.stubEnv("NEXT_PUBLIC_TENANT_ID", "tenant-abc")

    const { SITE_CONFIG } = await import("@/lib/constants/content")
    expect(SITE_CONFIG.name).toBe("Custom Corp")
    expect(SITE_CONFIG.contactEmail).toBe("custom@example.com")
    expect(SITE_CONFIG.contactPhone).toBe("+1 (555) 000-0000")
    expect(SITE_CONFIG.tenantId).toBe("tenant-abc")
  })
})
