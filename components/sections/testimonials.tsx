'use client';

import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialsCarousel from "../carousels/testimonials-carousel";



export default function Testimonials() {
  const { testimonials, loading, error } = useTestimonials();

  if (loading || error || testimonials.length === 0) {
    return null;
  }

  return (
    <TestimonialsCarousel testimonials={testimonials} />
  );
}