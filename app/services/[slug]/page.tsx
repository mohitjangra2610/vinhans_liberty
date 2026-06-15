import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import { notFound } from "next/navigation";

import { getServices } from "@/lib/apicalls/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceDetailPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export default async function ServiceDetailPage({
  params,
}: Readonly<ServiceDetailPageProps>) {
  const { slug } = await params;

  const services = await getServices({
    source: "server",
  });

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
        {/* Left Content */}
        <section className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-border-muted bg-muted">
            <Image
              src={service.image_url || "https://placehold.co/1200x600"}
              alt={service.service_name}
              width={1200}
              height={600}
              className="h-65 w-full object-cover sm:h-95"
              priority
              unoptimized
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Service Detail
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
              {service.heading || service.service_name}
            </h1>

            {service.subheading ? (
              <p className="text-lg leading-8 text-text-dim">
                {service.subheading}
              </p>
            ) : null}
          </div>

          <article className="prose prose-neutral max-w-none">
            <p className="whitespace-pre-line text-base leading-8 text-text-dim">
              {service.content}
            </p>
          </article>

          {service.service_faqs.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {service.service_faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-base font-semibold">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="text-sm leading-7 text-text-dim">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ) : null}
        </section>

        {/* Right Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-black">All Services</h2>

              <div className="mt-4 space-y-2">
                {services.map((item) => {
                  const isActive = item.slug === service.slug;

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
                      <Link href={`/services/${item.slug}`}>
                        <span className="truncate">{item.service_name}</span>
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
                Need help choosing?
              </h2>

              <p className="text-sm leading-6 text-text-dim">
                Talk to our team or request a free quote for this service.
              </p>

              <Button className="w-full rounded-xl bg-primary hover:bg-primary-hover">
                <CalendarDays className="mr-2 h-4 w-4" />
                Schedule a Call
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-xl border-primary text-primary hover:bg-accent"
              >
                <FileText className="mr-2 h-4 w-4" />
                Request Free Quote
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}