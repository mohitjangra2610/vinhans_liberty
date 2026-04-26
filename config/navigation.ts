import { Calendar, Home, Lightbulb, User, Users } from "lucide-react";
export const navigationLinks = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Partners",
    href: "/partners",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Events",
    href: "/events",
  },

  {
    label: "About",
    href: "/about",
  },
];

export const mobileNavigationLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },

  {
    label: "Partners",
    href: "/partners",
    icon: Users,
  },
  {
    label: "Services",
    href: "/services",
    icon: Lightbulb,
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
  },

  {
    label: "About",
    href: "/about",
    icon: User,
  },
];
