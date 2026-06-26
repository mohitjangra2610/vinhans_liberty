export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Vinhans Liberty",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "empowerme@americanwealthcorp.com",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 (317) 602-0574",
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID ?? "",
} as const;
