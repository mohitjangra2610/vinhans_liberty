"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { navigationLinks } from "@/config/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import MobileMenu from "../ui/MobileMenu";
import Container from './../layouts/container';

export default function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isScrolled = useScrollEffect(); // ← Add Yeh Line
  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full border-b h-16 flex items-center justify-between z-10 transition-all duration-300 ${
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <Container>
        <div className="w-full flex items-center justify-between">
          <Image
            src="/aws_logo.svg"
            alt="logo"
            width={130}
            height={60}
            className="w-32 h-auto"
          />
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {navigationLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        asChild
                        className={`${navigationMenuTriggerStyle()} ${isActive ? "active-style" : ""}`}
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden md:flex row-auto items-center gap-4">
        
            <Button variant="default" size="lg">
              Contact
            </Button>
          </div>
          <button
            className="md:hidden fixed bottom-12 right-8 w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shadow-lg z-40 hover:bg-gray-800 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} className="text-white" />
          </button>
        </div>
      </Container>
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}
