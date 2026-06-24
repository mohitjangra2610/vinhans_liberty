import Container from "@/components/layouts/container";
import Testimonials from "@/components/sections/testimonials";
import Stats from "@/components/sections/stats";
import QuoteButton from "@/components/ui/QuoteButton";
import { EventsUI } from "@/components/sections/EventsUI";
import { EventsSkeleton } from "@/components/layouts/EventsSkeleton";
import { PartnersUI } from "@/components/sections/Partners";
import { PartnersSkeleton } from "@/components/layouts/PartnersSkeleton";
import { Suspense } from "react";
import ScheduleCallButton from "@/components/ui/SheduleCall";
import { ServicesSkeleton } from "@/components/layouts/ServicesSkeleton";
import { ServicesUI } from "@/components/sections/ServicesUI";
import { JoinTeam } from "@/components/sections/JoinTeam";

export default function Page() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 sm:py-6 px-6 md:py-8 lg:py-12">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-12 items-start md:gap-6 sm:gap-2">
            {/* Left: Text */}
            <div className="flex flex-col gap-6 justify-center">
              <h1 className="text-3xl sm:text-6xl md:text-5xl font-bold leading-tight text-foreground">
                Elevate Your Financial Future
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
                We are on a mission to bring the wisdom of Wall Street to Families and businesses, to help all to build wealth strategically and safely while optimizing taxes.
              </p>

              {/* Desktop Buttons */}
              <div className="hidden md:flex gap-4 sm:gap-2">
                <QuoteButton />
                <ScheduleCallButton />
              </div>
            </div>

            {/* Right: Testimonials - Fixed Height */}
            <div className="w-full h-full flex items-center">
              <div className="w-full">
                <Testimonials />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile Buttons */}
      <section className="w-full px-6 sm:px-6 md:px-6 lg:hidden">
        <Container>
          <div className="flex flex-col gap-3">
            <QuoteButton />
            <ScheduleCallButton />
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="w-full sm:py-6 md:py-6 lg:py-12">
        <Container>
          <div className="flex flex-col ">
            <Stats />
          </div>
        </Container>
      </section>

      {/* Events Section */}
      <section className="w-full px-6 sm:px-6 md:py-16 lg:py-16 bg-white">
        <Container>
          <Suspense fallback={<EventsSkeleton />}>
            <EventsUI />
          </Suspense>
        </Container>
      </section>

      {/* Partners Section */}
      <section className="w-full px-4 py-12 sm:px-6 md:py-16 lg:py-20 bg-accent">
        <Container>
          <div className="text-center pb-4 sm:pb-4 md:pb-4 lg:pb-6">
            <h3 className="text-2xl  md:text-3xl sm:text-md lg:text-2xl font-bold text-foreground">
              Our Partners
            </h3>
          </div>
          <Suspense fallback={<PartnersSkeleton />}>
            <PartnersUI />
          </Suspense>
        </Container>
      </section>

      {/* Service Section */}
      <section className="w-full sm:px-6 py-6 md:py-6  lg:py-14 px-0">
        <Container>
          <div className="text-center pb-4 sm:pb-4 md:pb-4 lg:pb-6">
            <h3 className="text-2xl  md:text-3xl sm:text-md lg:text-2xl font-bold text-foreground">
              Our Services
            </h3>
          </div>
          <Suspense fallback={<ServicesSkeleton />}>
            <ServicesUI/>
          </Suspense>
        </Container>
      </section>
      <JoinTeam/>
    </main>
  );
}
