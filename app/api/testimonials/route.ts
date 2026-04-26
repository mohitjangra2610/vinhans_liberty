import { getTestimonials } from '@/lib/apicalls/testimonial';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const testimonials = await getTestimonials({
      source: 'server',
    });

    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}