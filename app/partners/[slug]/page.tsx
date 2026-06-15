import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Quote } from "lucide-react";
import { notFound } from "next/navigation";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPartners } from "@/lib/apicalls/partner";

interface PartnerDetailPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export default async function PartnerDetailPage({
  params,
}: Readonly<PartnerDetailPageProps>) {
  const { slug } = await params;

  const partners = await getPartners({
    source: "server",
  });

  const partner = partners.find((item) => item.slug === slug);

  if (!partner) {
    notFound();
  }

  return (
    <main className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
        {/* Left Content */}
        <section className="space-y-8">
          <div className="rounded-3xl border border-border-muted bg-muted p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border-muted bg-white">
                <Image
                  src={partner.logo_url}
                  alt={partner.company_name}
                  fill
                  className="object-contain p-5"
                  priority
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Partner Detail
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
                  {partner.company_name}
                </h1>

                {partner.heading_text ? (
                  <p className="max-w-3xl text-lg leading-8 text-text-dim">
                    {partner.heading_text}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">Overview</h2>

            <p className="text-base leading-8 text-text-dim">
              {partner.short_description}
            </p>
          </section>

          {partner.about_the_company ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">
                About the Company
              </h2>

              <p className="whitespace-pre-line text-base leading-8 text-text-dim">
                {partner.about_the_company}
              </p>
            </section>
          ) : null}

          {partner.content ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">
                Partnership Story
              </h2>

              <p className="whitespace-pre-line text-base leading-8 text-text-dim">
                {partner.content}
              </p>
            </section>
          ) : null}

          {partner.result ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">Result</h2>

              <div className="rounded-2xl border border-primary/10 bg-accent/50 p-6">
                <p className="whitespace-pre-line text-base leading-8 text-text-dim">
                  {partner.result}
                </p>
              </div>
            </section>
          ) : null}

          {partner.review ? (
            <section className="rounded-3xl border border-border-muted bg-white p-6">
              <Quote className="h-8 w-8 text-primary" />

              <p className="mt-4 text-xl font-medium leading-9 text-black">
                “{partner.review}”
              </p>

              {partner.review_by ? (
                <p className="mt-5 text-sm font-semibold text-primary">
                  {partner.review_by}
                </p>
              ) : null}
            </section>
          ) : null}
        </section>

        {/* Right Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-black">All Partners</h2>

              <div className="mt-4 space-y-2">
                {partners.map((item) => {
                  const isActive = item.slug === partner.slug;

                  return (
                    <Button
                      key={item.id}
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-between rounded-xl ${
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                          : "text-text-dim hover:bg-muted"
                      }`}
                    >
                      <Link href={`/partners/${item.slug}`}>
                        <span className="truncate">{item.company_name}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="space-y-4 p-5">
              <h2 className="text-lg font-bold text-black">
                Visit Partner Website
              </h2>

              <p className="text-sm leading-6 text-text-dim">
                Learn more about {partner.company_name} from their official
                website.
              </p>

              {partner.company_website ? (
                <Button
                  asChild
                  className="w-full rounded-xl bg-primary hover:bg-primary-hover"
                >
                  <a
                    href={partner.company_website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}