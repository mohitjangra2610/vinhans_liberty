"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Partner } from "@/type/supabase";
import { usePartners } from "@/hooks/usepartner";

interface PartnersGridProps {
  readonly initialPartners: readonly Partner[];
}

export function PartnersGrid({
  initialPartners,
}: Readonly<PartnersGridProps>) {
  const { partners, hasPartners } = usePartners({
    initialPartners,
  });

  if (!hasPartners) {
    return null;
  }

  return (
<section className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
  <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
    {partners.map((partner) => (
      <Link
        key={partner.id}
        href={`/partners/${partner.slug}`}
        className="flex min-h-65 flex-col justify-between rounded-lg border border-border bg-background p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:min-h-75"
      >
        <div>
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-black sm:text-base sm:leading-6">
            {partner.heading_text || partner.company_name}
          </h3>

          <p className="mt-5 line-clamp-3 text-xs leading-5 text-text-dim sm:mt-8 sm:text-sm sm:leading-6">
            {partner.short_description}
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="flex h-10 items-center justify-center bg-accent px-4 sm:h-11 sm:px-6">
            <Image
              src={partner.logo_url}
              alt={partner.company_name}
              width={140}
              height={45}
              className="max-h-8 w-auto object-contain sm:max-h-9"
            />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-primary sm:mt-7 sm:text-sm">
            Read {partner.company_name} Story
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
  );
}