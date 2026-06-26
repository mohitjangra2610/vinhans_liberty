import type { Metadata } from "next";
import EntrepreneursPageUI from "@/components/sections/EntrepreneursPageUI";

export const metadata: Metadata = {
  title: "Business Owner Wealth Strategies | Vinhans Liberty",
  description:
    "Strategic wealth, protection, succession, and tax-efficient planning solutions designed for successful business owners and entrepreneurs.",
  openGraph: {
    title: "Business Owner Wealth Strategies | Vinhans Liberty",
    description:
      "Strategic wealth, protection, succession, and tax-efficient planning solutions designed for successful business owners and entrepreneurs.",
    type: "website",
  },
};

export default function Entrepreneurs() {
  return (
    <main>
      <EntrepreneursPageUI />
    </main>
  );
}
