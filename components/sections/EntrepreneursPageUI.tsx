"use client";

import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Check,
  UserCheck,
  RefreshCw,
  TrendingUp,
  Heart,
  GitBranch,
  ArrowRight,
  Target,
  Monitor,
  Cloud,
  Wrench,
  Briefcase,
  HeartPulse,
  Home,
  ArrowUpRight,
  FileText,
  Phone,
  Mail,
  Award,
  AlertTriangle,
  UserX,
  Clock,
} from "lucide-react";
import Image from "next/image";

const SolutionsImpactItems = [
  {
    icon: UserCheck,
    label: "Executive Retention",
    subtext: "Attract, motivate and retain top talent to drive long-term success.",
    href: "/entrepreneur/executive-retention",
  },
  {
    icon: RefreshCw,
    label: "Business Continuity",
    subtext: "Build a strong foundation to ensure your business thrives for years to come.",
    href: "/entrepreneur/business-continuity",
      
  },
  {
    icon: TrendingUp,
    label: "Tax Efficiency",
    subtext: "Optimize strategies to reduce tax burden and keep more of what you earn.",
    href: "/entrepreneur/tax-efficiency",
  },
  {
    icon: Heart,
    label: "Family Wealth",
    subtext: "Protect your family and create generational wealth that lasts.",
    href: "/entrepreneur/family-wealth",
  },
  {
    icon: GitBranch,
    label: "Succession Planning",
    subtext: "Plan today for a smooth transition and a strong tomorrow.",
    href: "/entrepreneur/succession-planning",
  },
];




const audienceItems = [
  { icon: TrendingUp, label: "Growth Entrepreneurs" },
  { icon: Monitor, label: "Tech Founders" },
  { icon: Cloud, label: "SaaS Owners" },
  { icon: Wrench, label: "Engineering Firms" },
  { icon: Briefcase, label: "Consulting Firms" },
  { icon: HeartPulse, label: "Healthcare Owners" },
  { icon: Home, label: "Family Businesses" },
  { icon: ArrowUpRight, label: "Planning Exit or Succession" },
];

const executionCards = [
  {
    icon: Award,
    title: "Serious",
    desc: "Wealth strategy is business strategy.",
  },
  { icon: Target, title: "Decisive", desc: "They act when timing matters." },
  {
    icon: ArrowUpRight,
    title: "Action-Oriented",
    desc: "They execute, not just plan.",
  },
];

const costItems = [
  { icon: UserX, text: "Key employee leaves" },
  { icon: AlertTriangle, text: "Partner dies unexpectedly" },
  { icon: TrendingUp, text: "Opportunity disappears" },
  { icon: FileText, text: "Tax law changes" },
  { icon: Heart, text: "Family crisis occurs" },
  { icon: Clock, text: "Retirement timeline shrinks" },
];

const strategyBenefits = [
  "Protection",
  "Liquidity",
  "Certainty",
  "Tax Efficiency",
  "Business Continuity",
  "Family Wealth",
];

const processSteps = [
  {
    step: 1,
    title: "Discovery",
    desc: "We learn your business and goals.",
  },
  {
    step: 2,
    title: "Review",
    desc: "Assess your current strategy.",
  },
  {
    step: 3,
    title: "Evaluation",
    desc: "Match solutions to your needs.",
  },
  { step: 4, title: "Roadmap", desc: "Actionable plan with clear milestones." },
];

function HeroSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-20 bg-white">
      <Container>
        {/* DESKTOP */}
        <div
          className="hidden lg:flex relative w-full rounded-2xl overflow-hidden min-h-[420px] items-center shadow-xl"
          style={{
            background: "var(--gradient-entrepreneur)",
          }}
        >
          <div className="relative z-10 flex flex-col gap-5 px-16 py-10 max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Wealth strategies built
              <br />
              for business owners.
            </h1>

            <p className="text-base text-white/90 leading-relaxed max-w-sm">
              Growth opens doors — and creates real risk. We help protect what
              you&apos;ve built and position your wealth for what&apos;s next.
            </p>

            <div className="flex flex-row gap-3 pt-1">
              <Button
                asChild
                size="lg"
                className="bg-navy text-white hover:bg-primary-hover px-6 py-2.5 text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Link href="/contact">Schedule a Strategy Session</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-navy border-white hover:bg-white/90 px-6 py-2.5 text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Link href="#solutions-impact">Explore Strategies</Link>
              </Button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 h-full w-[50%] pointer-events-none">
            <Image
              src="/ent_banner.png"
              alt="Business owners shaking hands"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* MOBILE */}
        <div
          className="flex lg:hidden relative w-full rounded-2xl overflow-hidden shadow-xl flex-col"
          style={{
            background: "var(--gradient-entrepreneur-mobile)",
          }}
        >
          <div className="flex flex-col gap-5 px-6 pt-10 pb-6 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-[1.15]">
              Wealth strategies built
              <br />
              for business owners.
            </h1>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Growth opens doors — and creates real risk. We help protect what
              you&apos;ve built and position your wealth for what&apos;s next.
            </p>

            <div className="flex flex-col gap-2 pb-2 w-full">
              <Button
                asChild
                size="default"
                className="bg-navy text-white hover:bg-primary-hover px-4 py-2 text-xs rounded-lg transition-all duration-300 w-full"
              >
                <Link href="/contact">Schedule a Strategy Session</Link>
              </Button>
              <Button
                asChild
                size="default"
                variant="outline"
                className="bg-white text-navy border-white hover:bg-white/90 px-4 py-2 text-xs rounded-lg transition-all duration-300 w-full"
              >
                <Link href="#strategies">Explore Strategies</Link>
              </Button>
            </div>
          </div>

          <div className="relative w-full h-70 sm:h-85">
            <Image
              src="/ent_banner.png"
              alt="Business owners shaking hands"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function SolutionsImpactSection() {
  return (
    <section id="solutions-impact" className="py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
          <Badge
            variant="secondary"
            className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 mx-auto"
          >
           Strategic Framework
          </Badge>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy">
            Five conversations every business owner needs
          </h2>
        </div>





        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6">
          {SolutionsImpactItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
              >
                <div
                  className="group relative flex flex-col items-center text-center rounded-2xl border border-border bg-white pt-9 sm:pt-12 pb-4 sm:pb-6 px-3 sm:px-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-accent/20"
                >
                  <div className="absolute -top-5 sm:-top-7 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full text-navy"
                      fill="currentColor"
                    >
                      <polygon points="50,2 95,25 95,75 50,98 5,75 5,25" />
                    </svg>
                    <Icon className="relative z-10 w-5 h-5 sm:w-7 sm:h-7 text-gold-accent" />
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-navy uppercase tracking-tight mt-3 sm:mt-5 mb-2 sm:mb-3 leading-tight">
                    {item.label}
                  </h3>

                  <div className="w-8 sm:w-10 h-px bg-gold-accent/40 mb-2 sm:mb-3" />

                  <p className="text-[11px] sm:text-sm text-muted-foreground leading-snug">
                    {item.subtext}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function WhoWeWorkWithSection() {
  return (
    <section className="py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <Badge
            variant="secondary"
            className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 mx-auto"
          >
            Who We Serve
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
            Who we work best with
          </h2>
        </div>

        <div
          className="flex sm:grid gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory sm:grid-cols-3 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {audienceItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group min-w-[140px] snap-start rounded-xl border border-border bg-white p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gold-accent/20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-3 transition-colors duration-300 group-hover:bg-navy/10">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-navy transition-colors duration-300 group-hover:text-gold-accent" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-navy leading-snug">
                  {item.label}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ExecutionSection() {
  return (
    <section className="py-16 lg:py-24 bg-accent/50 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 max-sm:mx-auto max-sm:block"
            >
              Our Philosophy
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15] mb-4">
              We believe in execution.
              <br />
              <span className="text-gold-accent">Not endless research.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-prose">
              We act with the same urgency our clients do.
            </p>
          </div>

          <div className="space-y-4">
            {executionCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gold-accent/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold-accent">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-0.5">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CostOfWaitingSection() {
  return (
    <section className="py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 mx-auto"
            >
              The Risk of Inaction
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
              The cost of waiting is invisible.
            </h2>
            <p className="text-gold-accent text-base sm:text-xl font-medium mt-2">
              Until it isn&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {costItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-warning/30 hover:bg-warning-bg/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-warning-bg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-warning" />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium leading-snug">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StrategySessionSection() {
  return (
    <section className="py-16 lg:py-24 bg-accent/50 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 mx-auto"
            >
              Your Next Step
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
              Private strategy session
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              <div>
                <h3 className="text-sm font-semibold text-navy mb-4">
                  What You Gain
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {strategyBenefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-accent/80"
                    >
                      <Check className="w-3 h-3 text-gold-accent flex-shrink-0" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-navy mb-3">
                    Ideal For
                  </h3>
                  <div className="rounded-xl border border-gold-accent/20 bg-gold-accent/[0.02] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      For owners ready to act within{" "}
                      <strong className="text-navy">30–60 days</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-navy mb-4">
                  What to Expect
                </h3>
                <div className="space-y-0">
                  {processSteps.map((step, i) => (
                    <div key={step.title} className="relative pb-6 last:pb-0">
                      {i < processSteps.length - 1 && (
                        <div className="absolute left-3.5 top-7 bottom-0 w-px bg-border" />
                      )}
                      <div className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-navy mb-0.5">
                            {step.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <Button
                asChild
                size="lg"
                className="bg-navy text-white hover:bg-primary-hover px-8 py-5 text-sm rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/contact">
                  Schedule Your Private Strategy Session
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-16 lg:py-24 bg-navy text-white text-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Badge
            variant="secondary"
            className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 mx-auto"
          >
            Begin Your Journey
          </Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
            Ready to explore what&apos;s possible?
          </h2>

          <p className="text-white/50 text-sm sm:text-base max-w-prose mx-auto mb-8 leading-relaxed">
            Take the first step toward protecting everything you&apos;ve built.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gold-accent text-navy hover:bg-gold-accent/90 px-8 py-5 text-sm font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto"
          >
            <Link href="/contact">
              Schedule Your Private Strategy Session
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ContactBlock() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-border px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-muted-foreground uppercase tracking-[0.15em] mb-5 mx-auto"
            >
              Contact
            </Badge>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-sm text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-gold-accent/20 mx-auto mb-4 overflow-hidden">
              <Image
                src="/pk.png"
                alt="Prasanth Kollaikal"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-navy mb-1">
              Prasanth Kollaikal (PK)
            </h3>
            <p className="text-gold-accent text-sm font-medium">
              Chief Financial Officer
            </p>
            <p className="text-muted-foreground text-xs mb-6">
              Vinhans Liberty
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 max-w-sm mx-auto">
              <div className="flex flex-col items-center gap-1">
                <Phone className="w-4 h-4 text-gold-accent" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">
                    Phone
                  </p>
                  <a
                    href="tel:+13176020574"
                    className="text-xs sm:text-sm text-muted-foreground hover:text-navy transition-colors text-center block"
                  >
                    +1 (317) 602-0574
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Mail className="w-4 h-4 text-gold-accent" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">
                    Email
                  </p>
                  <a
                    href="mailto:pk@americanwealthcorp.com"
                    className="text-xs sm:text-sm text-muted-foreground hover:text-navy transition-colors text-center block"
                  >
                    pk@americanwealthcorp.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function EntrepreneursPageUI() {
  return (
    <div>
      <HeroSection />
      <SolutionsImpactSection />
      <WhoWeWorkWithSection />
      <ExecutionSection />
      <CostOfWaitingSection />
      <StrategySessionSection />
      <FinalCTASection />
      <ContactBlock />
    </div>
  );
}
