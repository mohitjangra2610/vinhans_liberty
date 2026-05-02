'use client';

import { Testimonial } from '@/type/supabase';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface TestimonialsCarouselProps {
  readonly testimonials: Testimonial[];
}

function Stars({ rating }: Readonly<{ rating: number }>) {
  const safeRating = Math.max(1, Math.min(5, rating));

  return (
    <div className="flex gap-1" aria-label={`${safeRating} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={`star-${index}`} className="text-lg text-yellow-500">
          {index < safeRating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleTestimonials = useMemo(
    () => testimonials.filter((item) => item.is_active),
    [testimonials]
  );

  useEffect(() => {
    if (visibleTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % visibleTestimonials.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [visibleTestimonials.length]);

  if (visibleTestimonials.length === 0) {
    return null;
  }

  const activeIndex = currentIndex % visibleTestimonials.length;
  const currentTestimonial = visibleTestimonials[activeIndex];

  return (
    <div className="w-full flex flex-col gap-4 py-4 md:py-6">
      {/* Quote Icon */}
      <div className="shrink-0">
        <Image
          src="/quote.svg"
          alt="quote"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>

      {/* Message - Fixed Height */}
      <p className="text-base md:text-lg font-normal text-gray-700 leading-relaxed min-h-20 md:min-h-25 line-clamp-4">
        {currentTestimonial.message}
      </p>

      {/* Author Section */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {currentTestimonial.image_url ? (
            <Image
              src={currentTestimonial.image_url}
              alt={currentTestimonial.full_name}
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
              unoptimized
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
              {currentTestimonial.full_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name & Rating */}
        <div className="flex flex-col gap-1">
          <p className="text-sm md:text-base font-medium text-gray-900">
            {currentTestimonial.full_name}
          </p>
          <Stars rating={currentTestimonial.star_rating} />
        </div>
      </div>

      {/* Carousel Indicators */}
      {visibleTestimonials.length > 1 && (
        <div className="flex justify-start gap-2 pt-2">
          {visibleTestimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-4 h-1 bg-blue-700'
                  : 'w-2 h-1 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}