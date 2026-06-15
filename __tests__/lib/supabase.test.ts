import { describe, it, expect, vi, beforeEach, afterAll } from "vitest"

const mockCreateClient = vi.fn(() => ({ supabase: true }))

vi.mock("@supabase/supabase-js", () => ({
  createClient: mockCreateClient,
}))

describe("supabase", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    mockCreateClient.mockClear()
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it("throws when both env vars are missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
    await expect(() => import("@/lib/supabase")).rejects.toThrow(
      "Missing Supabase environment variables"
    )
  })

  it("throws when URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-key")
    await expect(() => import("@/lib/supabase")).rejects.toThrow(
      "Missing Supabase environment variables"
    )
  })

  it("throws when anon key is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
    await expect(() => import("@/lib/supabase")).rejects.toThrow(
      "Missing Supabase environment variables"
    )
  })

  it("creates client when both env vars are set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key")

    const mod = await import("@/lib/supabase")
    expect(mockCreateClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "test-anon-key"
    )
    expect(mod.supabase).toEqual({ supabase: true })
  })
})

describe("supabaseServer", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    mockCreateClient.mockClear()
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it("throws when URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "")
    await expect(() => import("@/lib/supabase-server")).rejects.toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_URL"
    )
  })

  it("throws when both keys are missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "")
    await expect(() => import("@/lib/supabase-server")).rejects.toThrow(
      "Missing Supabase key"
    )
  })

  it("creates server client with service role key", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key")

    const mod = await import("@/lib/supabase-server")
    expect(mockCreateClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "service-role-key",
      expect.objectContaining({
        auth: { persistSession: false },
      })
    )
    expect(mod.supabaseServer).toEqual({ supabase: true })
  })

  it("falls back to anon key when service role key is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co")
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key-fallback")

    const mod = await import("@/lib/supabase-server")
    expect(mockCreateClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-key-fallback",
      expect.objectContaining({
        auth: { persistSession: false },
      })
    )
    expect(mod.supabaseServer).toEqual({ supabase: true })
  })
})
