import Container from "@/components/layouts/container";
import Testimonials from "@/components/sections/testimonials";

import Stats from "@/components/sections/stats";
import QuoteButton from "@/components/ui/QuoteButton";
import ScheduleCallButton from "@/components/ui/SheduleCall";

export default function Page() {

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 px-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left Section - Text */}
            <div className="flex flex-col items-start gap-4 w-full md:w-1/2">
              <h5 className="text-2xl md:text-3xl font-bold text-gray-900">
                Elevate Your Financial Future
              </h5>
              <p className="text-base md:text-lg font-medium text-gray-700">
                Empower your financial journey with personalized wealth
                management and intelligent investment strategies for sustainable
                growth.
              </p>

              {/* Buttons - Hidden on mobile */}
              <div className="hidden md:flex flex-row gap-4">
                <QuoteButton />
                <ScheduleCallButton />
              </div>
            </div>

            {/* Right Section - Testimonials */}
            <div className="w-full md:w-1/2">
              <Testimonials />
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile Buttons */}
      <div className="flex md:hidden flex-col gap-4 px-4 pb-8">
        <QuoteButton />

        <ScheduleCallButton />
      </div>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 px-4 bg-gray-50">
        <Container>
          <Stats />
        </Container>
      </section>
    </div>
  );
}
