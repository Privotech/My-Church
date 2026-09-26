import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PhotoGallery from '@/components/PhotoGallery';
import SocialShareWidget from '@/components/SocialShareWidget';
import { getGalleryImages } from '@/lib/data-service';
import { Camera, Calendar, Heart, MapPin, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Photo Gallery | Church Events, Programs & Missions',
  description:
    'Explore photos from recent church events, deliverance vigils, Sunday worship services, and community outreach missions at All Soul’s Winning for Saviour Global Ministry, Ogbomosho.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Photo Gallery | ASWS Global Ministry',
    description:
      'Glimpse into the transformative worship, community outreach, and prayer life of All Soul’s Winning for Saviour Global Ministry.',
    url: '/gallery',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    images: [
      {
        url: '/image/1742890225837.jpg',
        width: 1200,
        height: 800,
        alt: 'Church worship and outreach at ASWS Global Ministry',
      },
    ],
  },
};

export default async function GalleryPage() {
  const allImages = await getGalleryImages();

  return (
    <>
      <PageHeader
        title="Church Photo Gallery"
        subtitle="Witness God’s work through joyful worship services, powerful deliverance vigils, community outreach missions, and heartwarming fellowship."
        eyebrow="Moments in His Presence"
        actionText="Plan a Visit"
        actionHref="/visit"
      />

      <section className="section section-light" aria-labelledby="gallery-main-heading">
        <div className="container">
          <SocialShareWidget
            title="Explore & Share Our Church Photo Gallery"
            description="Invite others to witness the mighty move of God, community love, and active outreach missions of All Soul’s Winning for Saviour Global Ministry."
            url="/gallery"
            layout="banner"
          />

          <PhotoGallery
            initialImages={allImages}
            title="Recent Events, Programs & Outreach Missions"
            subtitle="Filter through our visual archives to view photos from Sunday celebration services, monthly deliverance vigils, hospital and street evangelism, and church family milestones."
            showCategoryTabs={true}
          />
        </div>
      </section>

      {/* Invitation Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary-navy) 0%, #152238 100%)',
          color: '#ffffff',
          padding: '4rem 0',
          borderTop: '2px solid var(--accent-gold)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '750px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 155, 39, 0.2)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold-light)',
              margin: '0 auto 1.25rem',
            }}
          >
            <Sparkles size={24} />
          </div>
          <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '0.75rem' }}>
            Be Part of Our Next Church Story
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.65', marginBottom: '1.75rem' }}>
            Come experience the joy, spiritual power, and loving community in person this Sunday at our Ayedire worship center in Ogbomosho.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/visit" className="btn btn-primary btn-lg">
              <MapPin size={18} />
              <span>Plan Your Visit</span>
            </Link>
            <Link href="/programs" className="btn btn-secondary btn-lg">
              <Calendar size={18} />
              <span>View Service Schedule</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
