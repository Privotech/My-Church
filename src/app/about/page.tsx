import React from 'react';
import type { Metadata } from 'next';
import Image from '@/components/ChurchImage';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { churchInfo } from '@/lib/church-data';
import {
  Compass,
  Eye,
  CheckCircle2,
  ArrowRight,
  Shield,
  Heart,
  Users,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Mission & Story | ASWS Global Ministry',
  description:
    'Discover the history, spiritual mission, divine vision, and pastoral leadership of All Soul’s Winning for Saviour Global Ministry under Rev’d James Oyegbile.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Our Mission & Story | ASWS Global Ministry',
    description:
      'Discover the history, spiritual mission, divine vision, and pastoral leadership of All Soul’s Winning for Saviour Global Ministry under Rev’d James Oyegbile.',
    url: '/about',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png',
        width: 600,
        height: 600,
        alt: 'About ASWS Global Ministry',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Our Ministry"
        subtitle="Our founding story, divine mandate, core convictions, and spiritual vision for the nations."
        eyebrow="Who We Are"
        actionText="Plan a Visit This Sunday"
        actionHref="/visit"
      />

      {/* =========================================================================
          OUR STORY SECTION
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="story-heading">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-eyebrow">Our Heritage</span>
              <h2 className="section-title" id="story-heading" style={{ textAlign: 'left' }}>
                Born Out of a Burning Passion for Souls
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                <strong>{churchInfo.name}</strong> began with a consecrated circle of devoted believers
                who shared an unquenchable vision: to preach the undiluted Gospel of Jesus Christ and bring
                restoration to weary hearts in our local community.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                What started as humble, prayerful cottage fellowships has blossomed through God’s divine
                favor into a dynamic, Spirit-led church family that impacts families locally in Ayedire,
                Ogbomosho, throughout Oyo State, and across the globe.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
                Through every season, our ministry remains steadfastly anchored to biblical inerrancy,
                fervent intercessory prayer, unconditional love, and faithful kingdom stewardship under the
                godly leadership of <strong>{churchInfo.pastor}</strong>.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                className="pastor-portrait-frame"
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  height: '420px',
                  margin: '0 auto',
                }}
              >
                <Image
                  src="/image/1742890223853-removebg-preview.png"
                  alt={`Rev'd James Oyegbile - ${churchInfo.pastor}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="pastor-portrait-img"
                  priority
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '20px',
                  background: 'var(--surface-white)',
                  padding: '1.25rem 1.75rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Christ-Centered Bible Teaching
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MISSION & VISION
          ========================================================================= */}
      <section className="section section-cream" aria-labelledby="mission-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Divine Mandate</span>
            <h2 className="section-title" id="mission-heading">
              Our Mission & Vision
            </h2>
            <p className="section-description">
              Clear spiritual directives that guide our evangelism, discipleship programs,
              and community outreach initiatives.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              maxWidth: '1040px',
              margin: '0 auto',
            }}
          >
            {/* Mission Card */}
            <div className="church-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Compass size={30} />
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--primary-navy)' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', flex: 1 }}>
                To share the uncompromised love and power of Jesus Christ, disciple believers into
                spiritual maturity, and equip every follower to transform their community and sphere of
                influence through vibrant faith, prayer, and selfless service.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  THE GREAT COMMISSION (MARK 16:15)
                </span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="church-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Eye size={30} />
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--primary-navy)' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', flex: 1 }}>
                To be a radiant beacon of hope, salvation, and total deliverance—building a borderless
                global family of believers who reflect the holy character of Christ in every dimension of
                life and win souls across every culture and nation.
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  A CHURCH WITHOUT WALLS (MATTHEW 5:14)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PASTORAL LEADERSHIP SPOTLIGHT
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="pastor-heading">
        <div className="container">
          <div
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  className="pastor-portrait-frame"
                  style={{
                    width: '320px',
                    height: '380px',
                    margin: '0 auto',
                  }}
                >
                  <Image
                    src="/image/1742890223853-removebg-preview.png"
                    alt={churchInfo.pastor}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="pastor-portrait-img"
                  />
                </div>
              </div>

              <div>
                <span className="section-eyebrow">Pastoral Shepherd</span>
                <h2 className="section-title" id="pastor-heading" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                  {churchInfo.pastor}
                </h2>
                <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  General Superintendent & Senior Pastor
                </div>

                <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  {churchInfo.pastor} has been faithfully shepherding ALL SOUL'S WINNING FOR SAVIOUR GLOBAL
                  MINISTRY with apostolic clarity, compassionate pastoral care, and divine humility.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  His heartbeat is to see believers rooted in biblical truth, delivered from all demonic
                  oppression, and equipped to become joyful ambassadors of Christ in their families and
                  workplaces.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/team" className="btn btn-primary">
                    <span>Meet the Pastoral Team</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact" className="btn btn-outline-dark">
                    <span>Request Pastoral Meeting</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT WE BELIEVE (STATEMENT OF FAITH)
          ========================================================================= */}
      <section className="section section-dark" aria-labelledby="faith-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Doctrinal Foundation</span>
            <h2 className="section-title" id="faith-heading">
              What We Believe
            </h2>
            <p className="section-description">
              Our faith rests squarely upon the eternal Word of God.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div style={{ background: 'var(--surface-dark-elevated)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff' }}>The Holy Scriptures</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>
                We believe the Bible (Old and New Testaments) is the inspired, inerrant, and infallible Word
                of God, serving as the supreme authority in all matters of faith and conduct.
              </p>
            </div>

            <div style={{ background: 'var(--surface-dark-elevated)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff' }}>The One True God</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>
                We believe in one eternal God, creator of all things, eternally existent in three co-equal
                persons: God the Father, God the Son, and God the Holy Spirit.
              </p>
            </div>

            <div style={{ background: 'var(--surface-dark-elevated)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff' }}>Salvation by Grace</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>
                We believe that salvation is the gift of God given by sovereign grace through faith in the
                atoning blood and resurrection of the Lord Jesus Christ.
              </p>
            </div>

            <div style={{ background: 'var(--surface-dark-elevated)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff' }}>Holy Spirit Empowerment</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>
                We believe in the baptism and ongoing infilling of the Holy Spirit, empowering believers
                with spiritual gifts to live a holy life and bear witness with signs following.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
