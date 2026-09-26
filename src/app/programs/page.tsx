import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SocialShareWidget from '@/components/SocialShareWidget';
import { getEvents } from '@/lib/data-service';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Heart,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Church Programs & Service Schedule | ASWS Global Ministry',
  description:
    'Explore weekly and monthly church services at ASWS Global Ministry: Sunday Celebration Service, Sunday School, Workers Prayer, Midweek Bible Study, and Night Vigils.',
  alternates: {
    canonical: '/programs',
  },
  openGraph: {
    title: 'Church Programs & Service Schedule | ASWS Global Ministry',
    description:
      'Explore weekly and monthly church services at ASWS Global Ministry: Sunday Celebration Service, Sunday School, Workers Prayer, Midweek Bible Study, and Night Vigils.',
    url: '/programs',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png',
        width: 600,
        height: 600,
        alt: 'Church Programs Schedule - ASWS Global Ministry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Church Programs & Service Schedule | ASWS Global Ministry',
    description:
      'Weekly and monthly church service times, prayer vigils, Bible study, and fellowship programs at All Soul’s Winning for Saviour Global Ministry.',
    images: ['/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png'],
  },
};

export default async function ProgramsPage() {
  const weeklyPrograms = await getEvents('WEEKLY');
  const monthlyPrograms = await getEvents('MONTHLY');

  return (
    <>
      <PageHeader
        title="Our Church Programs & Services"
        subtitle="Join our community of believers as we gather to encounter God's power, worship in truth, and grow in His Word."
        eyebrow="Worship Times & Schedule"
        actionText="Plan Your Visit"
        actionHref="/visit"
      />

      {/* =========================================================================
          WEEKLY PROGRAMS SECTION
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="weekly-heading">
        <div className="container">
          <SocialShareWidget
            title="Invite Loved Ones to Our Worship Services"
            description="Spread the good news! Share our weekly service schedule, prayer vigils, and deliverance programs on WhatsApp, Facebook, or Telegram."
            url="/programs"
            layout="banner"
          />

          <div className="section-header">
            <span className="section-eyebrow">Consistent Spiritual Growth</span>
            <h2 className="section-title" id="weekly-heading">
              Our Weekly Programmes
            </h2>
            <p className="section-description">
              Gatherings throughout the week to strengthen your personal relationship with God,
              find victory in prayer, and fellowship with brothers and sisters in Christ.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {weeklyPrograms.map((prog) => (
              <article key={prog.id} className="service-card">
                <span className="service-card-day">{prog.dayOrFrequency}</span>
                <h3 className="service-card-title">{prog.title}</h3>
                <div className="service-card-time">
                  <Clock size={16} />
                  <span>{prog.time}</span>
                </div>
                {prog.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                    {prog.description}
                  </p>
                )}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <MapPin size={15} style={{ color: 'var(--accent-gold)' }} />
                  <span>Ayedire Worship Center</span>
                </div>

                <SocialShareWidget
                  title={`ASWS Church Program: ${prog.title}`}
                  description={`Join us for ${prog.title} (${prog.dayOrFrequency} - ${prog.time}) at All Soul’s Winning for Saviour Global Ministry, Ogbomosho.`}
                  url="/programs"
                  layout="compact"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MONTHLY SPECIAL PROGRAMMES & VIGILS
          ========================================================================= */}
      <section className="section section-cream" aria-labelledby="monthly-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Deliverance & Prayer Vigils</span>
            <h2 className="section-title" id="monthly-heading">
              Our Monthly Programmes
            </h2>
            <p className="section-description">
              Intensive seasons of seeking the Lord in prayer, spiritual warfare, deliverance,
              and all-night vigils to receive breakthroughs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {monthlyPrograms.map((prog) => (
              <article
                key={prog.id}
                style={{
                  background: 'var(--surface-white)',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  border: '1.5px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: 'linear-gradient(90deg, var(--accent-gold), #b45309)',
                  }}
                />

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'var(--accent-gold-subtle)',
                    color: 'var(--text-gold)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  <Sparkles size={14} />
                  <span>{prog.dayOrFrequency}</span>
                </div>

                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                  {prog.title}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600,
                    color: 'var(--primary-navy-light)',
                    marginBottom: '1.25rem',
                    fontSize: '1rem',
                  }}
                >
                  <Clock size={18} style={{ color: 'var(--accent-gold)' }} />
                  <span>{prog.time}</span>
                </div>

                {prog.description && (
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    {prog.description}
                  </p>
                )}

                <div
                  style={{
                    background: 'var(--surface-muted)',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <strong>Open to Everyone:</strong> Fasting and intense prayers. Pastoral counseling and
                  deliverance ministry take place throughout this program.
                </div>

                <SocialShareWidget
                  title={`ASWS Special Deliverance & Vigil: ${prog.title}`}
                  description={`Special Monthly Program: ${prog.title} (${prog.dayOrFrequency} at ${prog.time}) at All Soul’s Winning for Saviour Global Ministry.`}
                  url="/programs"
                  layout="compact"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT TO EXPECT SECTION
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="expect-heading">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-header">
            <span className="section-eyebrow">First-Time Visitors</span>
            <h2 className="section-title" id="expect-heading">
              What to Expect at Our Services
            </h2>
            <p className="section-description">
              We want your first visit to be peaceful, welcoming, and deeply uplifting.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
            }}
          >
            <div style={{ background: 'var(--surface-warm)', padding: '1.75rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                Warm Welcome
              </h4>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                Our hospitality and ushers team will greet you with a genuine smile, answer any questions,
                and help you find a comfortable seat.
              </p>
            </div>

            <div style={{ background: 'var(--surface-warm)', padding: '1.75rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                Vibrant Worship
              </h4>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                Experience authentic Spirit-led praise and heartfelt hymns that usher you straight into
                the presence of God.
              </p>
            </div>

            <div style={{ background: 'var(--surface-warm)', padding: '1.75rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                Life-Changing Word
              </h4>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                Practical, verse-by-verse scriptural illumination that gives real spiritual answers for
                your daily living.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/visit" className="btn btn-primary btn-lg">
              <span>Read Full Visitor Guide</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
