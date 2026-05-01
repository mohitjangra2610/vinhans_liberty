import { getPartners } from "@/lib/apicalls/partner";
import { PartnersGrid } from "./PartnersGrid";


export async function PartnersPageUI() {
  const partners = await getPartners({
    source: "server",
  });

  if (partners.length === 0) {
    return null;
  }

  return <PartnersGrid initialPartners={partners} />;
}