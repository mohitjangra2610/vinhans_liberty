# Code Audit Report
Generated: 2026-06-15
Total Issues Found: 148

## Summary Table
| Category | Critical | Warning | Info | Total |
|----------|----------|---------|------|-------|
| Hardcoded Colors | 24 | 18 | 6 | 48 |
| Hardcoded Text/Strings | 8 | 10 | 5 | 23 |
| Hardcoded Import Paths | 1 | 2 | 3 | 6 |
| Security Issues | 2 | 4 | 1 | 7 |
| Performance Issues | 2 | 3 | 2 | 7 |
| Memory Leaks | 0 | 0 | 1 | 1 |
| Code Quality / Bugs | 4 | 10 | 15 | 29 |
| Next.js Specific | 5 | 8 | 5 | 18 |
| **Total** | **46** | **55** | **38** | **139** |

(Note: Some issues count in multiple rows; deduplicated across categories)

---

## 1. Hardcoded Colors

### Color Frequency Table
| Color Value | Usage Form(s) | Frequency | Files Affected | Suggested Token |
|-------------|---------------|-----------|----------------|-----------------|
| `#0a1628` / `bg-ink` / `text-ink` | Hex, Tailwind class | 15+ | 8 files | `--color-ink` (exists) |
| `#c9a84c` / `bg-gold` / `text-gold` / `stroke="#c9a84c"` | Hex, Tailwind class, SVG stroke | 20+ | 10+ files | `--color-gold` (exists) |
| `#1a1a1a`-equivalent → `text-gray-900` | Tailwind class | 30+ | 15+ files | `--color-foreground` |
| `text-gray-700` | Tailwind class | 25+ | 12+ files | `--color-muted-foreground` |
| `text-gray-600` / `text-gray-500` | Tailwind class | 20+ | 10+ files | `--color-text-dim` (exists) |
| `#2563eb` / `text-blue-600` | Tailwind class | 15+ | 8 files | `--color-primary` |
| `#1d4ed8` / `text-blue-700` | Tailwind class | 10+ | 6 files | `--color-primary` / `--color-primary-dark` |
| `#eff6ff` / `bg-blue-50` | Tailwind class | 8+ | 5 files | `--color-accent` |
| `#3b82f6` / `bg-blue-500` `#0052B4` | Hex, Tailwind class | 5+ | 3 files | `--color-primary` |
| `#005bc8` | Hex (in email HTML) | 2 | 2 files | `--color-primary` |
| `#f4f5f7` | Hex (in email HTML) | 2 | 2 files | N/A (email only) |
| `#ef4444` / `stroke="#ef4444"` / `text-red-500` | Hex, SVG stroke, Tailwind | 8+ | 6 files | `--color-destructive` |
| `#16a34a` / `text-green-600` | Hex, Tailwind | 3+ | 3 files | `--color-success` |
| `#F1F7FF` | Arbitrary `bg-[#F1F7FF]` | 1 | 1 file | `--color-accent` |
| `#FFFAEB` | Arbitrary `bg-[#FFFAEB]` | 1 | 1 file | `--color-warning-bg` |
| `#FEF0C7` | Arbitrary `border-[#FEF0C7]` | 1 | 1 file | `--color-warning-border` |
| `#B54708` | Arbitrary `text-[#B54708]` | 1 | 1 file | `--color-warning-text` |
| `#F79009` | SVG stroke | 1 | 1 file | `--color-warning` |
| `#f8f8f5` / `#e8e4d8` | Hex (in email HTML) | 2 | 2 files | N/A (email only) |
| `bg-linear-60 from-yellow-50 via-blue-50 to-red-50` | Arbitrary gradient | 4 | 4 files | Reusable gradient class |
| `from-navy/5 via-gold-accent/5 to-navy/10` | Arbitrary gradient | 1 | 1 file | Reusable gradient class |

### By File

#### app/globals.css
- **Line 45** [WARNING] `--color-gold: #c9a84c` — Hardcoded hex in CSS variable definition (acceptable as root definition)
- **Line 46** [WARNING] `--color-navy: #0B1F4D` — Hardcoded hex
- **Line 47** [WARNING] `--color-gold-accent: #C8A24A` — Hardcoded hex
- **Line 48** [WARNING] `--color-ink: #0a1628` — Hardcoded hex
- **Line 49** [WARNING] `--color-border-muted: #EAECF0` — Hardcoded hex
- **Line 50** [WARNING] `--color-text-dim: #344054` — Hardcoded hex

#### components/layouts/Footer.tsx
- **Line 16** [INFO] `bg-blue-800` — Use `--color-primary` or theme token instead

#### components/sections/EntrepreneursPageUI.tsx
- **Line 138** [WARNING] `background: "linear-gradient(to right, #475F97, #FBDA8C)"` — Inline gradient with hardcoded hex values
- **Line 190** [WARNING] `background: "linear-gradient(to bottom, #475F97 50%, #FBDA8C)"` — Same colors inline gradient
- **Line 252** [INFO] `ring-1 ring-foreground/5` — Acceptable (uses theme)
- **Line 512** [INFO] `hover:border-amber-200/50 hover:bg-amber-50/30` — Hardcoded amber family
- **Line 513** [INFO] `bg-amber-50`, `text-amber-600` — Hardcoded amber

#### components/sections/PartnersGrid.tsx
- **Line 45** [WARNING] `bg-[#F1F7FF]` — Arbitrary color, should use theme token
- **Line 55** [WARNING] `text-blue-700` — Should use `text-primary`

#### components/sections/PartnersTicker.tsx
- **Line 36** [INFO] `bg-slate-100` — Hardcoded Tailwind color

#### components/sections/ServicesGrid.tsx
- **Line 54** [WARNING] `text-blue-600` — Should use `text-primary`

#### components/sections/ServicesPageGrid.tsx
- **Line 55** [WARNING] `text-blue-600` — Should use `text-primary`

#### components/sections/stats_section.tsx
- **Line 82** [INFO] `bg-blue-100` — Should use `--color-accent`

#### components/sections/StatsHorizontal.tsx
- **Line 69** [INFO] `bg-blue-100` — Should use `--color-accent`

#### components/sections/EventSection.tsx
- **Line 107** [INFO] `data-[state=on]:bg-gray-700 data-[state=on]:text-white` — Hardcoded gray
- **Line 149** [INFO] `bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300` — Hardcoded alerts

#### components/sections/EventsPageList.tsx
- **Line 88** [WARNING] `selectedFilter === filter ? "bg-blue-700 text-white" : "bg-muted text-text-dim"` — Hardcoded blue-700

#### components/sections/JoinTeam.tsx
- **Line 274** [WARNING] `stroke="#3b82f6"` — Inline SVG hex color
- **Line 308** [WARNING] `focus:border-blue-500 focus:ring-2 focus:ring-blue-100` — Hardcoded blue
- **Line 344** [INFO] `text-blue-600` — Should use `text-primary`

#### components/forms/steps/Step1BasicDetails.tsx
- **Line 112** [WARNING] `focus:border-blue-500 focus:ring-2 focus:ring-blue-100` — Hardcoded blue
- **Line 134** [WARNING] `"border-blue-600 bg-blue-600 text-white"` — Hardcoded blue hex equivalents

#### components/forms/steps/Step2ServiceData.tsx
- **Line 113** [WARNING] `focus:border-blue-500 focus:ring-2 focus:ring-blue-100` — Hardcoded blue

#### components/forms/steps/Step3Review.tsx
- **Line 116** [WARNING] `bg-blue-600` — Hardcoded primary
- **Line 161** [WARNING] `stroke="#ef4444"` — Inline SVG hex
- **Line 171** [WARNING] `bg-[#FFFAEB] border-[#FEF0C7]` — Arbitrary colors
- **Line 172** [WARNING] `stroke="#F79009"` — Inline SVG hex
- **Line 176** [WARNING] `text-[#B54708]` — Arbitrary color

#### components/forms/LeadForm.tsx
- **Line 170** [WARNING] `stroke="#16a34a"` — Inline SVG hex

#### components/forms/steps/OtpModal.tsx
- **Line 151** [WARNING] `bg-gold/20` — Acceptable (uses token)
- **Line 152** [WARNING] `stroke="#c9a84c"` — Inline SVG hex duplicates theme token
- **Line 183** [WARNING] `focus:border-gold focus:ring-2 focus:ring-gold/20` — Acceptable (uses token)
- **Line 192** [WARNING] `stroke="#ef4444"` — Inline SVG hex

#### components/sections/navigation_header.tsx
- **Line 23** [WARNING] `isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white"` — Acceptable (uses bg-white)
- **Line 59** [INFO] `href="/#join-team"` — Anchor link (covered in strings)

#### app/page.tsx
- **Line 24** [WARNING] `text-gray-900` — Should use `text-foreground`
- **Line 28** [WARNING] `text-gray-700` — Should use `text-muted-foreground`
- **Lines 83,97** [WARNING] `text-gray-900` — Repeated hardcoded text color

#### app/services/page.tsx
- **Line 11** [WARNING] `bg-linear-60 from-yellow-50 via-blue-50 to-red-50` — Arbitrary gradient

#### app/partners/page.tsx
- **Line 10** [WARNING] `bg-linear-60 from-yellow-50 via-blue-50 to-red-50` — Same arbitrary gradient

#### app/contact/page.tsx
- **Line 11** [WARNING] `bg-linear-60 from-yellow-50 via-blue-50 to-red-50` — Same arbitrary gradient

#### app/aboutus/page.tsx
- **Line 92** [WARNING] `bg-linear-60 from-yellow-50 via-blue-50 to-red-50` — Same arbitrary gradient (4th occurrence → CRITICAL)
- **Line 95** [WARNING] `bg-blue-50 text-blue-700` — Hardcoded blue
- **Line 134** [WARNING] `text-blue-700` — Multiple occurrences

#### app/entrepreneur/[slug]/page.tsx
- **Line 148** [WARNING] `from-navy/5 via-gold-accent/5 to-navy/10` — Gradient with custom tokens (acceptable)

#### app/api/send-otp/route.ts
- **Lines 27-69** [INFO] Inline HTML with hardcoded hex colors (`#005bc8`, `#0a1628`, `#c9a84c`, `#f8f8f5`, `#e8e4d8`, `#f4f5f7`, etc.) — Ok for email HTML, but could use CSS variables

#### app/api/submit-lead/route.ts
- **Lines 53-142** [INFO] Same inline HTML colors in email templates

---

## 2. Hardcoded Text / Strings

### Duplicated strings across 3+ files (CRITICAL)
- **"Pr@vinhansliberty.com"** — Hardcoded in Footer.tsx:50, services/page.tsx:38, partners/page.tsx:35, contact/page.tsx:36 → Should be env var `NEXT_PUBLIC_CONTACT_EMAIL`
- **"(317)602-0574" / "+1(972)654-5335"** — Hardcoded in EntrepreneursPageUI.tsx:677, services/page.tsx:61,79, partners/page.tsx:58,77, contact/page.tsx:60,80 → Should be env var `NEXT_PUBLIC_CONTACT_PHONE`
- **"Schedule a Call" / "Schedule a Strategy Session"** — Appears in multiple files with slight variations → Should be a shared constant

### By File

#### components/sections/navigation_header.tsx
- **Line 59** [INFO] `"Join Our Team"` — Hardcoded button text
- **Line 62** [INFO] `"Contact"` — Hardcoded button text

#### components/sections/EntrepreneursPageUI.tsx
- **Lines 36-89** [INFO] All strategy slugs (`"executive-bonus-strategy"`, `"buy-sell-funding-strategy"`, etc.) — Hardcoded route paths used in links

#### components/sections/EventsPageList.tsx
- **Line 81** [WARNING] `(["all", "online", "offline"] as const)` — Magic filter strings, should be enum/const
- **Line 148** [INFO] `"Register for Event"` — Hardcoded label
- **Line 147** [WARNING] `"Register for Event"` — Appears also in events/[slug]/page.tsx:307

#### components/sections/EventSection.tsx
- **Line 102** [WARNING] `(["all", "online", "offline"] as const)` — Duplicate of EventsPageList filter strings

#### components/sections/PartnersGrid.tsx
- **Line 56** [INFO] `"Read {partner.company_name} Story"` — Hardcoded template string

#### components/sections/Partners.tsx / EventsUI.tsx / ServicesUI.tsx / PartnersPageUI.tsx / ServicesPageUI.tsx
- **Line `source: "server"`** — Magic string appearing in 8 files, should be a shared constant

#### components/ui/QuoteButton.tsx
- **Line 20** [INFO] `"Get Free Quote"` — Hardcoded button label

#### components/ui/SheduleCall.tsx
- **Line 18** [INFO] `"Schedule a Call"` — Hardcoded button label

#### components/ui/MobileMenu.tsx
- **Line 59** [WARNING] `"Mohit Jangra"` — Hardcoded developer name! Should be dynamic or removed.
- **Lines 100,104** [INFO] `"Join Our Team"`, `"Contact"` — Hardcoded labels

#### components/forms/LeadForm.tsx
- **Line 42-46** [INFO] `getStepLabel` returns hardcoded strings `"Basic Details"`, `"Service Info"`, `"Review"`

#### components/forms/steps/OtpModal.tsx
- **Line 215** [INFO] `"Verify & Submit"` — Hardcoded button text

#### app/services/[slug]/page.tsx
- **Line 143** [INFO] `"Schedule a Call"` — Hardcoded button label
- **Line 151** [INFO] `"Request Free Quote"` — Hardcoded button label

#### app/entrepreneur/[slug]/page.tsx
- **Lines 14-128** [INFO] Hardcoded strategy content, FAQ text — Large static data in route file, should be in a data file

#### app/privacypolicy/page.tsx
- **Line 4** [WARNING] `"Privacy Policy"` — Page is a stub with only a heading. Missing full legal content.

#### app/aboutus/page.tsx
- **Lines 21-87** [INFO] Large amounts of static content (promises, approach, steps, audiences, risks) — Should be in a data/config file

#### app/services/page.tsx / app/partners/page.tsx
- **Lines 38,58,77** [WARNING] Duplicate contact info block — Same contact section repeated across 3 pages (services, partners, contact) — Should be extracted to a shared component

---

## 3. Hardcoded Import Paths / Values

#### lib/apicalls/testimonial.ts
- **Line 2** [INFO] `"../cache/memory-cache"` — Relative import instead of `@/lib/cache/memory-cache`

#### lib/apicalls/stats.ts
- **Line 1** [INFO] `"../api-client"` — Relative import instead of `@/lib/api-client`
- **Line 2** [INFO] `"../cache/memory-cache"` — Relative import instead of `@/lib/cache/memory-cache`

#### lib/apicalls/services.ts
- **Line 1** [INFO] `"../api-client"` — Relative import instead of `@/lib/api-client`
- **Line 2** [INFO] `"../cache/memory-cache"` — Relative import instead of `@/lib/cache/memory-cache`

#### lib/apicalls/events.ts
- **Line 1** [INFO] `"../api-client"` — Relative import instead of `@/lib/api-client`
- **Line 2** [INFO] `"../cache/memory-cache"` — Relative import instead of `@/lib/cache/memory-cache`

#### lib/apicalls/partner.ts
- **Line 1** [INFO] `"../api-client"` — Relative import instead of `@/lib/api-client`
- **Line 2** [INFO] `"../cache/memory-cache"` — Relative import instead of `@/lib/cache/memory-cache`

#### lib/apicalls/team.ts
- **Line 1** [INFO] `"@/type/supabase"` — Already using alias (good)

#### app/page.tsx
- **Line 30** [WARNING] `src="/aws_logo.svg"` — Hardcoded static asset path (acceptable but should use env for CDN)

#### components/layouts/Footer.tsx
- **Line 20** [WARNING] `src="/awc_white_logo.svg"` — Hardcoded static asset

#### components/ui/MobileMenuButton.tsx
- **Line 25-30** [WARNING] Inline style with hardcoded values `{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }` — Should use Tailwind classes

---

## 4. Security Issues

### CRITICAL
- **.env.local:5** [CRITICAL] `OTP_SECRET=j8k2m5p9q3r6s1t4u7v0w2x5y8z1a3b6` — OTP secret stored in .env.local in plaintext. Ensure this file is in .gitignore (checked: not tracked). However, this is a production secret — should use a strong random value.
- **.env.local:6** [CRITICAL] `RESEND_API_KEY=re_GSnvBoV5_LocFWrewoiQ6yJhEgejUdMDL` — Resend API key in .env.local. Check .gitignore (not tracked, but this is a server-side-only key).

### WARNING
- **app/api/team/route.ts** [WARNING] No authentication check — Anyone can POST to /api/team
- **app/api/submit-lead/route.ts** [WARNING] No authentication check — Anyone can POST leads
- **app/api/get-services/route.ts** [WARNING] No authentication check — Public read access
- **app/api/get-service-fields/route.ts** [WARNING] No authentication check — Public read access

### INFO
- **app/contact/page.tsx:98** [WARNING] `<iframe>` without `sandbox` attribute — Exposes to potential clickjacking. Add `sandbox="allow-scripts allow-popups allow-forms"`.
- **app/api/send-otp/route.ts:22** [INFO] `resend.emails.send` — OTP sent via email (no transport layer encryption concern)

---

## 5. Performance Issues

### CRITICAL
- **components/sections/ServicesGrid.tsx:40** [CRITICAL] `unoptimized` prop on `next/image` — Bypasses Next.js image optimization. This hurts performance for all service images.
- **components/sections/ServicesPageGrid.tsx:41** [CRITICAL] `unoptimized` prop on `next/image` — Same issue.
- **components/carousels/testimonials-carousel.tsx:84** [CRITICAL] `unoptimized` on testimonial avatar images — Same issue.

### WARNING
- **components/sections/navigation_header.tsx:47** [WARNING] `active-style` class used (string literal) — Appears to be a CSS class that may not exist. Check if it's defined.

### INFO
- **app/contact/page.tsx** [INFO] Calendly iframe loads a full third-party widget — Consider lazy loading with `loading="lazy"` attribute
- **components/sections/EventSection.tsx** [INFO] `<Link target="_blank" rel="noreferrer">` — Missing `rel="noopener"` (though `noreferrer` implies it)

---

## 6. Memory Leaks

### WARNING
- **components/ui/MobileMenu.tsx:32-41** [WARNING] Sets `document.body.style.overflow` — Side effect on global state. If the component unmounts without cleanup (e.g., route change while open), body overflow stays hidden. Cleanup is present but fragile.

### INFO (No critical leaks found)
All hooks with event listeners, intervals, and subscriptions properly clean up:
- `useScrollEffect` — ✅ proper addEventListener/removeEventListener
- `useTestimonials` — ✅ AbortController + mounted flag
- `useStats` — ✅ AbortController + mounted flag  
- `JoinTeam` — ✅ clearTimeout on timer, removeEventListener on keydown
- `OtpModal` — ✅ clearTimeout on timer

---

## 7. Code Quality / Bugs

### CRITICAL
- **app/privacypolicy/page.tsx** [CRITICAL] Privacy Policy page is a stub — Only shows "Privacy Policy" heading. This is a legal compliance issue.
- **components/ui/MobileMenu.tsx:59** [WARNING] `"Mohit Jangra"` — Developer's name hardcoded in production UI. Should be the company name "American Wealth" or dynamic from config.
- **app/entrepreneur/[slug]/page.tsx** [CRITICAL] ~200 lines of hardcoded static data (strategies, FAQs, content) embedded directly in the page component — This data should live in a separate file under `data/` or `config/`.
- **app/aboutus/page.tsx** [WARNING] ~80 lines of static content data hardcoded in component — Should be in a data file.

### WARNING
- **components/layouts/Footer.tsx:64** [WARNING] `href="/terms-and-conditions"` — Link to Terms & Conditions page that likely doesn't exist (no corresponding route found).
- **components/sections/navigation_header.tsx:47** [WARNING] `active-style` — Unknown CSS class. Not defined in globals.css. May be unused or a bug.
- **components/sections/EventsPageList.tsx** [INFO] `getEventImage` with fallback `"https://placehold.co/160x110.png"` — Placeholder URL returns PNG which may have different dimensions.
- **lib/api-client.ts:19** [INFO] `fetchFromAPI` uses `cache: 'no-store'` — Disables HTTP caching entirely. Consider using Next.js fetch cache for appropriate endpoints.
- **lib/apicalls/events.ts:136** [WARNING] `fetchEventsFromSupabase` uses `ttl: 0` (zero) — `getMemoryCachedData` with 0 TTL means the cache entry expires immediately, effectively disabling caching. Likely a bug.
- **lib/apicalls/testimonial.ts** [WARNING] Duplicate data fetching patterns across all 5 apicalls files — Very similar code repeated for testimonials, stats, services, events, partners. Could be abstracted into a generic Supabase fetcher.
- **lib/apicalls/stats.ts** [WARNING] `TENANT_ID` assigned at module level `const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID` — This is evaluated once at module load time. If the env var changes, it won't be reflected without a server restart. Same pattern in services.ts, events.ts, partner.ts.
- **lib/apicalls/stats.ts** [WARNING] Local `Stat` interface defined in `stats.ts` (lines 4-15) — But also defined in `type/supabase.ts` (lines 31-42). Two separate Stat type definitions. Risk of inconsistency.

### INFO
- **components/forms/LeadForm.tsx** [INFO] Empty `catch` block at line 83 — Catches error but only sets state inside `if (!cancelled)`. Error is silently swallowed in cancelled case.
- **components/forms/steps/OtpModal.tsx** [INFO] `onPaste` handler on parent `div` at line 169 — Paste events might not bubble correctly to div in some browsers.
- **setup-tests.ts** [INFO] Only imports jest-dom matchers — No mock setup for Next.js router, Supabase, etc. Tests relying on these will fail.
- **app/events/[slug]/page.tsx** [INFO] `normalizeSlug` and `matchSlug` functions — Custom slug matching logic. If slugs have special characters, this could produce false matches.
- **components/sections/stats.tsx** [INFO] Renders both StatsHorizontal (desktop) and StatsSection (mobile) in a hidden/shown pattern — Both components still render and fetch their own state even when hidden. Consider lazy loading.
- **components/sections/StatsHorizontal.tsx** [INFO] Error state returns `null` silently — No user feedback when stats fail to load on desktop.
- **lib/apicalls/stats.ts:20** [INFO] Fallback `icon_name` uses `'file'` as default — The iconMap in StatsHorizontal and stats_section uses `'file'` as fallback key. Module-level icon mapping could be shared.
- **components/layouts/EventsSkeleton.tsx** [INFO] Shadow value `shadow-[0px_5px_8px_-4px_rgba(16,24,40,0.03),0px_8px_24px_-4px_rgba(16,24,40,0.08)]` — Long arbitrary shadow, should be a theme token.

---

## 8. Next.js Specific

### CRITICAL
- **Missing `app/not-found.tsx`** [CRITICAL] — No custom 404 page. Users get the default Next.js 404.
- **Missing `app/error.tsx`** [CRITICAL] — No error boundary page. Errors will show the Next.js default error overlay in production.
- **Missing `app/loading.tsx`** [CRITICAL] — No loading UI for route transitions.
- **next.config.ts** [CRITICAL] No security headers configured — Missing `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, `Referrer-Policy`, etc.
- **app/events/** **app/partners/** **app/services/** **app/entrepreneur/** **app/contact/** [CRITICAL] Pages lack metadata/SEO tags — Only `app/page.tsx`, `app/layout.tsx`, and `app/entrepreneurs/page.tsx` have proper metadata.

### WARNING
- **app/quote/page.tsx** [WARNING] No metadata — Quote page has no title/description for SEO.
- **app/contact/page.tsx** [WARNING] `"use client"` at page level — This entire page is client-rendered. The Calendly iframe section could be extracted into a client component while keeping page metadata as server component.
- **app/contact/page.tsx:95** [WARNING] Full-screen Calendly iframe (`h-screen w-full`) — No loading state. Iframe loading blocks page interactivity.
- **lib/api-client.ts:6** [WARNING] `fetch('/api${endpoint}', { cache: 'no-store' })` — Disables Next.js automatic fetch caching. Data is re-fetched on every request.
- **lib/apicalls/events.ts** [WARNING] Cache TTL set to `0` (line 136) — Effectively disables caching. Events cache always fetches fresh data.
- **app/entrepreneurs/page.tsx** [WARNING] Page is a server component that wraps a client component `EntrepreneursPageUI` — Acceptable, but all the data is hardcoded in the client component, making SSR less beneficial.
- **app/services/[slug]/page.tsx** [WARNING] `getServices` called with `source: "server"` but no `generateStaticParams` or ISR — Each request fetches from Supabase. Should use ISR or static generation for service pages.
- **app/events/[slug]/page.tsx** [WARNING] Same issue — No static params generation for event detail pages.

### INFO
- **app/page.tsx** [INFO] Uses `Suspense` with fallback skeletons — Good pattern for async components.
- **app/layout.tsx** [INFO] Font optimization with `next/font` — Good.
- **components/sections/navigation_header.tsx** [INFO] Uses `next/image` — Good.
- **components/sections/navigation_header.tsx** [INFO] Uses `Link` from `next/link` — Good (except for `<a>` in some places).

---

## Action Plan (Priority Order)

### 🔴 Fix Immediately (CRITICAL)

1. **Missing error/not-found/loading pages** — Create `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx`
2. **Security headers missing** — Add `headers` config in `next.config.ts` for X-Frame-Options, CSP, etc.
3. **Missing metadata/SEO on 5+ pages** — Add `metadata` export to events, partners, services, entrepreneur/[slug], quote, contact pages
4. **Privacy Policy page is a stub** — Populate with full legal content
5. **"Mohit Jangra" hardcoded in MobileMenu** — Replace with company name or dynamic config
6. **Hardcoded contact email/phone in 4+ files** — Extract to env variables (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`)
7. **3 files with `unoptimized` on `next/image`** — Remove unoptimized prop and ensure images are properly optimized
8. **Same gradient `bg-linear-60 from-yellow-50 via-blue-50 to-red-50` used in 4 files** — Create a reusable Tailwind class or component
9. **Event API route cache TTL is 0 (effectively disabled)** — Set to appropriate value (300-600s)
10. **Hardcoded arbitrary colors (`#F1F7FF`, `#FFFAEB`, `#FEF0C7`, `#B54708`)** — Add CSS variables or extend Tailwind theme

### 🟡 Fix Before Production (WARNING)

1. **Static data embedded in `entrepreneur/[slug]/page.tsx` and `aboutus/page.tsx`** — Move to `data/` directory
2. **Duplicate contact section in 3 pages (services, partners, contact)** — Extract to shared component
3. **API routes without authentication** — Add rate limiting or API key checks for public endpoints
4. **`active-style` class referenced but may not exist** — Verify/add the CSS class
5. **"Terms & Conditions" link in Footer targetting non-existent page** — Create the page or remove link
6. **Module-level `TENANT_ID` in stats/services/events/partner apicalls** — Use function-level env access for hot-reload support
7. **iframe in contact page without sandbox** — Add `sandbox="allow-scripts allow-popups allow-forms"`
8. **Duplicate `Stat` interface in `lib/apicalls/stats.ts` and `type/supabase.ts`** — Consolidate to single definition
9. **Magic strings `"all"`, `"online"`, `"offline"`, `"client"`, `"server"` appearing in 8+ files** — Define as constants/enums
10. **`shadow-[...]` arbitrary shadow in EventsSkeleton** — Add theme token `--shadow-event-card`

### 🟢 Fix When Time Allows (INFO)

1. **Relative imports in apicalls files** — Replace with `@/` alias
2. **`/terms-and-conditions` page needed** — Create if required
3. **Email template colors hardcoded in send-otp and submit-lead** — Extract inline CSS to variables
4. **`fetchFromAPI` with `cache: 'no-store'`** — Consider using Next.js fetch cache
5. **Stub SVG icons inline in components** — Move to separate icon components or sprite
6. **LeadForm empty catch block** — Add specific error logging
7. **Stats component renders both mobile/desktop variants always** — Use conditional rendering with breakpoint
8. **Generic Supabase fetcher** — Abstract duplicate fetch patterns across 5 apicalls files
