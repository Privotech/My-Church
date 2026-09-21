import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { churchInfo } from '@/lib/church-data';
import {
  MapPin,
  Clock,
  Car,
  Baby,
  Smile,
  Phone,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plan Your Visit | All Soul’s Winning for Saviour Global Ministry',
  description:
    'Plan your visit to All Soul’s Winning for Saviour Global Ministry in Ayedire, Ogbomosho, Nigeria. Service times, directions, parking, and kids church info.',
  alternates: {
    canonical: '/visit',
  },
  openGraph: {
    title: 'Plan Your Visit | All Soul’s Winning for Saviour Global Ministry',
    description:
      'Plan your visit to All Soul’s Winning for Saviour Global Ministry in Ayedire, Ogbomosho, Nigeria. Service times, directions, parking, and kids church info.',
    url: '/visit',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
  },
};

export default function VisitPage() {
  return (
    <>
      <PageHeader
        title="Plan Your Visit to Our Sanctuary"
        subtitle="You are not just a visitor; you are our honored guest. Here is everything you need to know for your first Sunday with us."
        eyebrow="First-Time Guest Guide"
        actionText="Get Church Directions"
        actionHref="#location-details"
      />

      {/* =========================================================================
          WHAT TO EXPECT - STEP BY STEP GUIDE
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="steps-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Your Sunday Experience</span>
            <h2 className="section-title" id="steps-heading">
              What to Expect on Your First Visit
            </h2>
            <p className="section-description">
              We know visiting a new church can feel intimidating, so we have designed every detail
              to make you feel right at home from the moment you arrive.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '4.5rem',
            }}
          >
            {/* Step 1: Parking */}
            <div className="church-card">
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Car size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                1. Free & Secure Parking
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Convenient on-site parking at Lots A, B, and E. Our parking attendants and church security
                will warmly direct you to a safe spot with ease.
              </p>
            </div>

            {/* Step 2: Warm Welcome */}
            <div className="church-card">
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Smile size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                2. Friendly Hospitality
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Our ushers and welcoming team will greet you with a genuine smile, hand you a service
                bulletin, and guide you to comfortable seating in the main auditorium.
              </p>
            </div>

            {/* Step 3: Kids Church */}
            <div className="church-card">
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Baby size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                3. Children’s Church
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Your children will love our safe, age-appropriate Kids Church where trained teachers share
                creative Bible lessons, singing, and joy while you enjoy the worship service.
              </p>
            </div>

            {/* Step 4: Word & Prayer */}
            <div className="church-card">
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Clock size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                4. Anointed Worship
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Services run from 9:30 AM to 12:00 PM, featuring uplifting choir praise, corporate
                intercession, and practical, verse-by-verse preaching that transforms lives.
              </p>
            </div>
          </div>

          {/* =========================================================================
              LOCATION & SANCTUARY OVERVIEW
              ========================================================================= */}
          <div
            id="location-details"
            style={{
              background: 'var(--surface-warm)',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              padding: '3.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
              }}
            >
              <div>
                <span className="section-eyebrow">Find Our Sanctuary</span>
                <h3 style={{ fontSize: '2.1rem', color: 'var(--primary-navy)', marginBottom: '1.25rem' }}>
                  Worship With Us in Ogbomosho
                </h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Our sanctuary is easily accessible in the Ayedire area behind Royal College. We have
                  dedicated signage to help guide you smoothly to our compound.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <MapPin size={22} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>Physical Address</div>
                      <div style={{ color: 'var(--text-secondary)' }}>{churchInfo.address}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <Phone size={22} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>Need Directions by Phone?</div>
                      <a href={`tel:${churchInfo.phone}`} style={{ color: 'var(--text-gold)', fontWeight: 600 }}>
                        {churchInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <Compass size={22} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>Landmark Advice</div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Directly behind Royal College, Ayedire area, Ogbomosho, Oyo State, Nigeria.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/contact" className="btn btn-primary">
                    <span>Contact Us Ahead of Time</span>
                    <ArrowRight size={16} />
                  </Link>
                  <a href={`tel:${churchInfo.phone}`} className="btn btn-outline-dark">
                    <span>Call Church Helpdesk</span>
                  </a>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Image
                    src="/image/download (2).jpeg"
                    alt="Sanctuary entrance at ASWS Global Ministry"
                    width={540}
                    height={380}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMON VISITOR QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="section section-cream" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="section-title" id="faq-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.45rem' }}>
                What should I wear?
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.65' }}>
                Come as you are! Whether you prefer traditional African attire, a formal suit, or neat casual
                clothes, you will be warmly accepted. We care about you, not what you wear.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.45rem' }}>
                How long is Sunday service?
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.65' }}>
                Our main Sunday celebration service starts at 9:30 AM and concludes around 12:00 PM. Sunday
                School runs earlier from 8:00 AM to 9:30 AM.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.45rem' }}>
                Will I be singled out or put on the spot?
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.65' }}>
                Never! We will give you a warm group welcome and a guest welcome pack, but you will never
                be forced to stand up, give a speech, or feel embarrassed in any way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
