"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceItem } from "@/type/supabase";
import { useServices } from "@/hooks/useServices";

interface ServicesGridProps {
  readonly initialServices: readonly ServiceItem[];
}

export function ServicesPageGrid({
  initialServices,
}: Readonly<ServicesGridProps>) {
  const { services, hasServices } = useServices({
    initialServices,
  });

  if (!hasServices) {
    return null;
  }

  return (
<section className="w-full">
  <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-0 py-18">
    {services.map((service) => (
      <Link
        key={service.id}
        href={`/services/${service.slug}`}
        className="flex min-h-105 flex-col rounded-lg border border-gray-200 bg-[#FCFCFD] shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <div className="relative h-47.5 w-full overflow-hidden rounded-t-lg sm:h-52.5">
          <Image
            src={service.image_url || "https://placehold.co/600x300"}
            alt={service.service_name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-8 sm:px-7 sm:py-9">
          <div>
            <h3 className="text-md font-bold leading-7 text-gray-800">
              {service.service_name}
            </h3>

            <p className="mt-4 line-clamp-3 text-base font-regular leading-7 text-gray-700">
              {service.short_description}
            </p>
          </div>

          <span className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-blue-600">
            Learn More
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>
  );
}
