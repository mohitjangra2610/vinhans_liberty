import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Landmark,
  LockKeyhole,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Umbrella,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const promises = [
  "Reduce tax drag",
  "Protect family wealth",
  "Control market risk",
  "Create retirement income",
  "Transfer wealth efficiently",
  "Build long-term clarity",
];

const approach = [
  {
    title: "Tax-first thinking",
    description:
      "We look at how taxes affect your money before building any long-term strategy.",
    icon: Landmark,
  },
  {
    title: "Protection-first planning",
    description:
      "We protect income, assets, and family security before chasing aggressive growth.",
    icon: ShieldCheck,
  },
  {
    title: "Risk-controlled growth",
    description:
      "We structure strategies around stability, access, and long-term financial confidence.",
    icon: TrendingUp,
  },
];

const steps = [
  "Analyze your current financial position",
  "Structure your tax and income strategy",
  "Protect against major financial risks",
  "Grow with controlled planning",
  "Transfer wealth with purpose",
];

const audiences = [
  {
    title: "Families",
    description: "Protect income, future goals, and generational security.",
    icon: Users,
  },
  {
    title: "Retirees",
    description: "Create stable income and reduce tax pressure in retirement.",
    icon: PiggyBank,
  },
  {
    title: "Business Owners",
    description: "Plan around income, protection, continuity, and taxes.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Professionals",
    description: "Build structured financial clarity while income grows.",
    icon: Users,
  },
];

const risks = [
  "Market volatility can damage unprotected retirement plans.",
  "Taxes can quietly reduce long-term wealth if ignored.",
  "Healthcare and long-term care costs can create major pressure.",
  "Poor estate planning can make wealth transfer harder than needed.",
];
export default function AboutUs() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 gradient-hero">
        <div className="mx-auto flex max-w-7xl justify-center">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <Badge className="mb-5 bg-accent text-primary hover:bg-accent">
              Financial clarity, protection, and growth
            </Badge>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              We help families and business owners build safer, smarter
              financial futures.
            </h1>

            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              American Wealth helps you structure income, reduce financial
              risk, protect your wealth, and plan for long-term transfer with a
              clear system.
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <Button variant="default" asChild className="py-5">
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="py-5">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Promise Strip */}
      <section className="border-y bg-accent px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <p className="font-medium text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Exists */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why this exists
            </p>

            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-xl">
              Traditional financial planning often misses what quietly destroys
              wealth.
            </h2>
          </div>

          <div className="space-y-4 text-base leading-8 text-muted-foreground">
            <p>
              Many financial plans focus only on returns. That is not enough.
              Taxes, market losses, healthcare costs, poor protection, and weak
              transfer planning can reduce wealth faster than people expect.
            </p>

            <p>
              Our approach is built to identify these hidden risks early and
              structure a plan that protects before it grows.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-accent px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our approach
            </p>

            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-xl">
              We do not play the same game as traditional advisors.
            </h2>
          </div>

          <div className=" mt-4 grid gap-6 md:grid-cols-3 sm:mt-4 md:mt-4 lg:mt-6">
            {approach.map((item) => (
              <Card key={item.title} className="rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <item.icon className="h-8 w-8 text-primary" />

                  <h4 className="mt-5 text-xl font-bold text-foreground">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>

            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-2xl">
              A clear system, not random advice.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </div>

                <p className="mt-5 text-sm font-semibold leading-6 text-foreground">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-accent px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Who we help
            </p>

            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-2xl">
              Built for people who need financial structure, not noise.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => (
              <Card key={item.title} className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                  <item.icon className="h-8 w-8 text-primary" />

                  <h3 className="mt-5 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Compliance & trust
              </p>

              <h2 className="mt-3 text-2xl font-bold text-foreground">
                Built around trust, transparency, and responsible guidance.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [BadgeCheck, "Licensed Guidance"],
                [FileSearch, "Transparent Review"],
                [LockKeyhole, "Privacy Focused"],
              ].map(([Icon, label]) => (
                <div
                  key={label as string}
                  className="rounded-2xl bg-accent p-5"
                >
                  <Icon className="h-7 w-7 text-primary" />
                  <p className="mt-4 font-semibold text-foreground">
                    {label as string}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Awareness */}
      <section className="bg-primary px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
              Risk awareness
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-2xl">
              Good planning means knowing what can go wrong before it does.
            </h2>
          </div>

          <div className="space-y-4">
            {risks.map((risk) => (
              <div key={risk} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                <Umbrella className="mt-1 h-5 w-5 shrink-0 text-primary-foreground/70" />
                <p className="text-sm leading-7 text-white/80">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-primary p-8 text-white sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-2xl">
                Ready to review your financial plan?
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                Start with a simple conversation. We will help you understand
                where your current plan stands and what can be improved.
              </p>
            </div>

            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
