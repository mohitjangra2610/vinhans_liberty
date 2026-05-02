import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationHeader from "@/components/sections/navigation_header";
import MobileMenuButton from "@/components/ui/MobileMenuButton";
import { Footer } from "@/components/layouts/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "America Wealth Corp",
  description:
    "Elevate Your Financial Future with America Wealth Corp - Your Trusted Partner in Personalized Wealth Management and Intelligent Investment Strategies for Sustainable Growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <NavigationHeader />
        <main className="pt-16 min-h-screen">{children}</main>
        <MobileMenuButton />
        <Footer/>
      </body>
    </html>
  );
}
