import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { strategies } from "@/lib/constants/strategies";
import type { StrategySection } from "@/lib/constants/strategies";

interface Props {
  readonly params: Promise<{ readonly slug: string }>;
}

function renderSection(section: StrategySection, index: number) {
  switch (section.type) {
    case "benefits":
      return (
        <section key={index} className="space-y-4">
          <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border-muted p-4"
              >
                <Check className="h-5 w-5 shrink-0 text-gold-accent" />
                <span className="text-sm font-medium text-navy">{item}</span>
              </div>
            ))}
          </div>
        </section>
      );

    case "why":
      return (
        <section key={index} className="space-y-4">
          <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-accent" />
                <span className="text-base leading-7 text-text-dim">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "tax-provisions":
      return (
        <section key={index} className="space-y-4">
          <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
          <div className="grid gap-4">
            {section.provisions.map((p, i) => (
              <Card
                key={i}
                className="rounded-xl border-border-muted shadow-sm"
              >
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-accent">
                    {p.code}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-dim">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      );

    case "highlight":
      return (
        <section
          key={index}
          className="rounded-2xl border border-border-muted bg-muted p-6 sm:p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-text-dim">
            {section.content}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {section.options.map((opt, i) => (
              <span
                key={i}
                className="rounded-lg border border-border-muted px-4 py-2 text-sm font-medium text-navy"
              >
                {opt}
              </span>
            ))}
          </div>
        </section>
      );

    case "cta":
      return (
        <section key={index}>
          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="space-y-5 p-6">
              <h2 className="text-xl font-bold text-navy">{section.title}</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {section.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-accent" />
                    <span className="text-sm text-text-dim">{b}</span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                variant="default"
                className="w-full justify-between rounded-md p-6 bg-navy text-white hover:bg-navy/90"
              >
                <Link href={section.buttonHref}>
                  <span className="truncate">{section.buttonLabel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      );

    default:
      return null;
  }
}

export default async function StrategyDetailPage({ params }: Props) {
  const { slug } = await params;

  const strategy = strategies.find((s) => s.slug === slug);

  if (!strategy) {
    notFound();
  }

  return (
    <main className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
        <section className="space-y-8 min-w-0 w-full">
          <div className="lg:hidden">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/entrepreneurs">
                <ArrowLeft className="h-4 w-4" />
                Back to Entrepreneurs
              </Link>
            </Button>
          </div>

          <div className="hidden lg:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/entrepreneurs">Entrepreneurs</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{strategy.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border-muted bg-muted h-65 sm:h-95">
            <Image
              src={`/${encodeURIComponent(strategy.title)}.png`}
              alt={strategy.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-accent">
              Business Owner Strategy
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              {strategy.title}
            </h1>
            {strategy.subheading ? (
              <p className="text-lg leading-8 text-text-dim">
                {strategy.subheading}
              </p>
            ) : null}
          </div>

          {strategy.sections ? (
            <div className="space-y-6 sm:space-y-8 w-full min-w-0">
              {strategy.sections.map((section, i) => renderSection(section, i))}
            </div>
          ) : (
            <article className="prose prose-neutral max-w-none">
              <p className="whitespace-pre-line text-base leading-8 text-text-dim">
                {strategy.content}
              </p>
            </article>
          )}

          {strategy.faqs.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-navy">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {strategy.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-base font-semibold">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-text-dim">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ) : null}
        </section>

        <aside className="lg:sticky lg:top-24 lg:self-start lg:h-fit space-y-6 min-w-0 w-full">
          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-navy">All Strategies</h2>
              <div className="mt-4 space-y-2">
                {strategies.map((s) => {
                  const isActive = s.slug === strategy.slug;
                  return (
                    <Button
                      key={s.slug}
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-between rounded-md p-6 ${
                        isActive
                          ? "bg-navy text-white hover:bg-navy/90"
                          : "text-text-dim hover:bg-muted"
                      }`}
                    >
                      <Link href={`/entrepreneur/${s.slug}`}>
                        <span className="truncate">{s.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
