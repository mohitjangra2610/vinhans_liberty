import { getServices } from "@/lib/apicalls/services";
import { ServicesPageGrid } from "./ServicesPageGrid";


export async function ServicesPageUI() {
  const services = await getServices({
    source: "server",
  });
  if (services.length === 0) {
    return null;
  }

  return <ServicesPageGrid initialServices={services} />;
}