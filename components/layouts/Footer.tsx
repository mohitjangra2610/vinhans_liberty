import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutus" },
  { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-md bg-primary px-5 py-5 text-white shadow-xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Image
              src="/awc_white_logo.svg"
              alt="logo"
              width={130}
              height={60}
              className="w-28 md:w-42 h-auto"
            />
            <Link href="/" className="text-sm font-semibold">
              American Wealth
            </Link>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 text-xs"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="mailto:info@amaricanwealthcrop.com"
            className="text-xs text-white/80 transition hover:text-white"
          >
            empowerme@americanwealthcorp.com
          </a>
        </div>

        <Separator className="my-4 bg-white/15" />

        <div className="flex flex-col gap-3 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 American Wealth. All Rights Reserved.</p>

          <div className="flex gap-5">
            <Link href="/privacypolicy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
