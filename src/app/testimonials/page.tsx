import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import TestimonialSection from '@/components/TestimonialSection';
import { getTestimonials } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Faith Testimonies',
  description: 'Read stories of faith and what God is doing through All Soul’s Winning for Saviour Global Ministry.',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials({ limit: 100 });
  return <>
    <PageHeader title="Faith Testimonies" subtitle="Stories of hope, healing, and the goodness of God in our church family." eyebrow="Praise Reports" />
    <TestimonialSection initialTestimonials={testimonials} />
  </>;
}
