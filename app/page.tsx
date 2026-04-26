import Container from "@/components/layouts/container";
import Testimonials from "@/components/sections/testimonials";

import StatsHorizontal from "@/components/sections/StatsHorizontal";
import StatsSection from "@/components/sections/stats_section";

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
                management and intelligent investment strategies for
                sustainable growth.
              </p>

              {/* Buttons - Hidden on mobile */}
              <div className="hidden md:flex flex-row gap-4">
                <button className="px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  Get Free Quote
                </button>
                <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300">
                  Schedule a Call
                </button>
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
        <button className="px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition duration-300 w-full">
          Get Free Quote
        </button>
        <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 w-full">
          Schedule a Call
        </button>
      </div>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 px-4 bg-gray-50">
        <Container>
          {/* Desktop - Horizontal */}
          <div className="hidden md:block">
            <StatsHorizontal />
          </div>

          {/* Mobile - Grid */}
          <div className="md:hidden">
            <StatsSection />
          </div>
        </Container>
      </section>
    </div>
  );
}