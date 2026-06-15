"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceItem } from "@/type/supabase";
import { useServices } from "@/hooks/useServices";

interface ServicesGridProps {
  readonly initialServices: readonly ServiceItem[];
}

export function ServicesGrid({ initialServices }: Readonly<ServicesGridProps>) {
  const { services, hasServices } = useServices({
    initialServices,
  });

  if (!hasServices) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-0">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="flex items-start gap-6 rounded-xl border border-border-muted bg-white p-6 transition-all duration-300 hover:shadow-md"
          >
            {/* Left Image */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
              <Image
                src={service.image_url || "https://placehold.co/80x80"}
                alt={service.service_name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Right Content */}
            <div className="flex flex-1 flex-col">
              <h3 className="text-lg font-semibold text-black">
                {service.service_name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-dim line-clamp-3">
                {service.short_description}
              </p>

              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
