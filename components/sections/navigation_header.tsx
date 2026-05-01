'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useScrollEffect } from '@/hooks/useScrollEffect';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationLinks } from '@/config/navigation';
export default function NavigationHeader() {
  const pathname = usePathname();
  const isScrolled = useScrollEffect();

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full border-b h-16 flex items-center z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-0 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
        <Image
          src="/aws_logo.svg"
          alt="logo"
          width={130}
          height={60}
          className="w-28 md:w-32 h-auto"
        />
        </Link>
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
        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Button variant="outline">Join Our Team</Button>
          <Button variant="default">Contact</Button>
        </div>

       
      </div>
    </div>
  );
}