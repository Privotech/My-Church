import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { churchInfo } from '@/lib/church-data';
import { getTestimonials, getGalleryImages } from '@/lib/data-service';
import TestimonialSection from '@/components/TestimonialSection';
import PhotoGallery from '@/components/PhotoGallery';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Users,
  Compass,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Video,
  MessageCircle,
  Camera,
  Send,
  Share2,
} from 'lucide-react';


export const metadata: Metadata = {
  title: "All Soul's Winning for Saviour Global Ministry | Faith, Worship & Purpose",
  description:
    'Join All Soul’s Winning for Saviour Global Ministry in Ogbomosho, Nigeria. Experience Christ-centered worship, biblical discipleship, soul winning, and warm fellowship.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "All Soul's Winning for Saviour Global Ministry | Faith, Worship & Purpose",
    description:
      'Join All Soul’s Winning for Saviour Global Ministry in Ogbomosho, Nigeria. Experience Christ-centered worship, biblical discipleship, soul winning, and warm fellowship.',
    url: '/',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png',
        width: 600,
        height: 600,
        alt: "All Soul's Winning for Saviour Global Ministry Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "All Soul's Winning for Saviour Global Ministry | Faith, Worship & Purpose",
    description:
      'Experience Christ-centered worship, biblical discipleship, and soul winning at All Soul’s Winning for Saviour Global Ministry in Ogbomosho, Nigeria.',
    images: ['/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png'],
  },
};

export default async function HomePage() {
  const [testimonials, galleryImages] = await Promise.all([
    getTestimonials(),
    getGalleryImages({ limit: 8 }),
  ]);

  return (

    <>
      {/* =========================================================================
          HERO SECTION
          Atmospheric background with congregation photo, regal dark overlay, gold accents
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          backgroundColor: 'var(--primary-navy)',
          color: '#ffffff',
          padding: '6.5rem 0 5.5rem',
          overflow: 'hidden',
          borderBottom: '3px solid var(--accent-gold)',
        }}
        aria-label="Welcome and Church Mission"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 50% 35%, rgba(19, 34, 56, 0.88) 0%, rgba(7, 13, 20, 0.97) 100%), url('/image/DALL·E 2025-03-17 15.40.37 - A blurred background image of a large congregation in a church setting. The image should have a spiritual ambiance with a mix of blue and orange light.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.95,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(197, 155, 39, 0.15)',
                color: 'var(--accent-gold-light)',
                border: '1px solid rgba(197, 155, 39, 0.35)',
                padding: '0.4rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              <span>✝</span>
              <span>{churchInfo.motto}</span>
            </div>

            <h1
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-serif), Georgia, serif',
              }}
            >
              Where Every Soul Matters to God
            </h1>

            <p
              style={{
                color: '#e2e8f0',
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                lineHeight: 1.65,
                maxWidth: '720px',
                margin: '0 auto 2.5rem',
              }}
            >
              Welcome to <strong>All Soul’s Winning for Saviour Global Ministry</strong>. A place
              where God’s unconditional love, healing grace, and transformative power are revealed
              in every service.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
            >
              <Link href="/visit" className="btn btn-primary btn-lg">
                <MapPin size={18} />
                <span>Plan Your Visit</span>
              </Link>
              <Link href="/programs" className="btn btn-secondary btn-lg">
                <Calendar size={18} />
                <span>View Service Times</span>
              </Link>
              <Link href="/give" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <Heart size={18} />
                <span>Give / Support</span>
              </Link>
            </div>

            {/* =========================================================================
                PROMINENT SOCIAL MEDIA & COMMUNITY ENGAGEMENT (HERO)
                ========================================================================= */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.78)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(197, 155, 39, 0.45)',
                borderRadius: '16px',
                padding: '1.5rem 1.75rem',
                margin: '0 auto 3.5rem',
                maxWidth: '860px',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
              }}
              aria-label="Online Church Community & Social Channels"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.85rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      boxShadow: '0 0 10px #22c55e',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Connect With Us Online
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                  Live Streams &bull; 24/7 Prayer Line &bull; Worldwide Community
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.75rem',
                }}
              >
                {/* YouTube */}
                <a
                  href={churchInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    textDecoration: 'none',
                    textAlign: 'left',
                  }}
                  className="social-btn-hover"
                  title="Watch Sunday Service on YouTube"
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 0, 0, 0.2)',
                      color: '#ff4d4d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Video size={17} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                      YouTube
                    </div>
                    <div style={{ color: 'var(--accent-gold-light)', fontSize: '0.7rem', fontWeight: 600 }}>
                      Live Streams
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={churchInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(37, 211, 102, 0.1)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    textDecoration: 'none',
                    textAlign: 'left',
                  }}
                  className="social-btn-hover"
                  title="24/7 WhatsApp Pastoral Prayer Line"
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(37, 211, 102, 0.25)',
                      color: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={17} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                      WhatsApp
                    </div>
                    <div style={{ color: '#86efac', fontSize: '0.7rem', fontWeight: 600 }}>
                      Prayer Line
                    </div>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={churchInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    textDecoration: 'none',
                    textAlign: 'left',
                  }}
                  className="social-btn-hover"
                  title="Follow ASWS Global Ministry on Facebook"
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(24, 119, 242, 0.2)',
                      color: '#60a5fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Users size={17} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                      Facebook
                    </div>
                    <div style={{ color: '#93c5fd', fontSize: '0.7rem', fontWeight: 600 }}>
                      Community
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={churchInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    textDecoration: 'none',
                    textAlign: 'left',
                  }}
                  className="social-btn-hover"
                  title="Photos and Youth Ministry Moments on Instagram"
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(225, 48, 108, 0.2)',
                      color: '#f472b6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Camera size={17} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                      Instagram
                    </div>
                    <div style={{ color: '#fbcfe8', fontSize: '0.7rem', fontWeight: 600 }}>
                      Moments
                    </div>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href={churchInfo.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    textDecoration: 'none',
                    textAlign: 'left',
                  }}
                  className="social-btn-hover"
                  title="Telegram Audio Sermons & Devotionals"
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(34, 158, 217, 0.2)',
                      color: '#38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Send size={17} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                      Telegram
                    </div>
                    <div style={{ color: '#bae6fd', fontSize: '0.7rem', fontWeight: 600 }}>
                      Devotionals
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: 'rgba(197, 155, 39, 0.25)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    color: 'var(--accent-gold-light)',
                  }}
                >
                  <Clock size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Sunday Celebration
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>
                    9:30 AM – 12:00 PM
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    Main Sanctuary Worship
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: 'rgba(197, 155, 39, 0.25)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    color: 'var(--accent-gold-light)',
                  }}
                >
                  <BookOpen size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Midweek Bible Study
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>
                    Tuesdays 5:00 PM
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    Deeper in God’s Word
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: 'rgba(197, 155, 39, 0.25)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    color: 'var(--accent-gold-light)',
                  }}
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Our Location
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginTop: '2px' }}>
                    Ayedire, Ogbomosho
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    Behind Royal College
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PASTORAL WELCOME & CONGREGATION SPOTLIGHT
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="welcome-heading">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Visual Column */}
            <div style={{ position: 'relative' }}>
              <div
                className="pastor-portrait-frame"
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  height: '420px',
                  margin: '0 auto',
                }}
              >
                <Image
                  src="/image/1742890223853-removebg-preview.png"
                  alt={`Rev'd James Oyegbile - Senior Pastor of ${churchInfo.name}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="pastor-portrait-img"
                  priority
                />
              </div>

              {/* Pastoral Seal Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  right: '-15px',
                  background: 'var(--primary-navy)',
                  color: '#ffffff',
                  padding: '1.25rem 1.75rem',
                  borderRadius: '12px',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: '300px',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Senior Pastor & Founder
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '2px' }}>
                  {churchInfo.pastor}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  General Superintendent
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div>
              <span className="section-eyebrow">Welcome to Our Family</span>
              <h2 className="section-title" id="welcome-heading" style={{ textAlign: 'left' }}>
                A Vibrant Community of Worship, Hope & Purpose
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.75', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                We are delighted to welcome you to <strong>All Soul’s Winning for Saviour Global Ministry</strong>.
                Our passionate mission is to win souls for Christ Jesus, disciple believers into maturity,
                and empower individuals and families to live victorious, Spirit-filled lives.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Whether you are stepping into church for the very first time, searching for spiritual answers,
                or seeking a genuine family of faith to call home, you are warmly loved, deeply valued, and
                graciously welcomed here.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>
                    Biblically sound teaching rooted in God’s infallible Word
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>
                    Heartfelt Spirit-led worship and prevailing prayer
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>
                    Warm fellowship and active small group discipleship
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/about" className="btn btn-primary">
                  <span>Discover Our Story</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/visit" className="btn btn-outline-dark">
                  <span>What to Expect</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR CORE PILLARS & VALUES
          Regal dark styling with sacred gold iconography
          ========================================================================= */}
      <section className="section section-dark" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Foundation</span>
            <h2 className="section-title" id="values-heading">
              Our Core Spiritual Pillars
            </h2>
            <p className="section-description">
              Our ministry is built on timeless biblical truths that shape how we love God,
              serve one another, and reach our world.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Value 1: Being Sent */}
            <article
              style={{
                background: 'var(--surface-dark-elevated)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold-light)',
                  marginBottom: '1.5rem',
                }}
              >
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>BEING SENT</h3>
              <p style={{ lineHeight: '1.7', flex: 1 }}>
                Being sent means actively engaging with our local and global communities,
                meeting people right where they are, and demonstrating the sacrificial love
                and hope of Jesus Christ through word and good deeds.
              </p>
              <div style={{ marginTop: '1.5rem', color: 'var(--accent-gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                Matthew 28:19–20
              </div>
            </article>

            {/* Value 2: J.O.Y. */}
            <article
              style={{
                background: 'var(--surface-dark-elevated)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold-light)',
                  marginBottom: '1.5rem',
                }}
              >
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>THE J.O.Y. PRINCIPLE</h3>
              <p style={{ lineHeight: '1.7', flex: 1 }}>
                We embody the transformative life priority of <strong>J.O.Y.</strong>: Jesus first,
                Others second, You third. By anchoring our devotion in Christ and prioritizing the care
                of others, our lives flourish with heavenly peace and joy.
              </p>
              <div style={{ marginTop: '1.5rem', color: 'var(--accent-gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                Philippians 2:3–4
              </div>
            </article>

            {/* Value 3: Worship */}
            <article
              style={{
                background: 'var(--surface-dark-elevated)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: 'rgba(197, 155, 39, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold-light)',
                  marginBottom: '1.5rem',
                }}
              >
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>SPIRIT & TRUTH WORSHIP</h3>
              <p style={{ lineHeight: '1.7', flex: 1 }}>
                Worship is our lifestyle. We lift our voices and surrender our hearts in reverent,
                passionate celebration of God’s holiness and unfailing grace, making space for His
                presence to transform souls.
              </p>
              <div style={{ marginTop: '1.5rem', color: 'var(--accent-gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                John 4:23–24
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUNDAY & WEEKLY WORSHIP SERVICES
          ========================================================================= */}
      <section className="section section-cream" aria-labelledby="schedule-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Weekly Gatherings</span>
            <h2 className="section-title" id="schedule-heading">
              Join Us in Worship & Prayer
            </h2>
            <p className="section-description">
              Experience the warmth of fellowship throughout the week. There is a place prepared
              for you and your family.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3.5rem',
            }}
          >
            {/* Sunday Service */}
            <div className="service-card">
              <span className="service-card-day">Every Sunday Morning</span>
              <h3 className="service-card-title">Celebration & Word Service</h3>
              <div className="service-card-time">
                <Clock size={16} />
                <span>9:30 AM – 12:00 PM</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Our flagship family celebration featuring inspirational choral worship, powerful
                anointed preaching, and ministry to families and youth.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <MapPin size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>Main Worship Auditorium</span>
              </div>
            </div>

            {/* Sunday School */}
            <div className="service-card">
              <span className="service-card-day">Sunday Mornings</span>
              <h3 className="service-card-title">Sunday School Classes</h3>
              <div className="service-card-time">
                <Clock size={16} />
                <span>8:00 AM – 9:30 AM</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Interactive Bible study classes for adults, teenagers, and children, breaking down
                Scripture into practical life lessons for spiritual maturity.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Users size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>All Age Groups Welcome</span>
              </div>
            </div>

            {/* Tuesday Bible Study */}
            <div className="service-card">
              <span className="service-card-day">Every Tuesday</span>
              <h3 className="service-card-title">Digging Deep Bible Study</h3>
              <div className="service-card-time">
                <Clock size={16} />
                <span>5:00 PM – 6:30 PM</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Expository verse-by-verse scriptural illumination to ground your faith in God's promises
                and equip you for everyday Christian victory.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <BookOpen size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>Interactive Q&A Session</span>
              </div>
            </div>

            {/* Wednesday Prayer */}
            <div className="service-card">
              <span className="service-card-day">Every Wednesday</span>
              <h3 className="service-card-title">Prevailing Prayer & Deliverance</h3>
              <div className="service-card-time">
                <Clock size={16} />
                <span>9:00 AM – 12:00 PM</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                A dedicated season of intercession, breaking spiritual bondages, praying for the sick,
                and standing in the gap for our families and nation.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>Pastoral Counseling Available</span>
              </div>
            </div>
          </div>

          {/* Banner linking to full program details */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2.5rem',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>
                Looking for Monthly Deliverance Vigils & Special Conferences?
              </h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                Explore our monthly <strong>"Set Me Free"</strong> 3-day deliverance program and all-night prayer vigils.
              </p>
            </div>
            <Link href="/programs" className="btn btn-primary">
              <span>View Full Church Calendar</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIFE GROUPS & SMALL GROUP FELLOWSHIP
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="lifegroup-heading">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-eyebrow">Connect & Flourish</span>
              <h2 className="section-title" id="lifegroup-heading" style={{ textAlign: 'left' }}>
                Join a Life Group & Find Your Faith Family
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                Church is more than Sunday morning in the pews—it is doing life together.
                Our Life Groups and fellowship programs serve as the hub for small-group discipleship,
                authentic friendships, mutual prayer, and pastoral care.
              </p>
              <p style={{ lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Whether you are a student, young professional, couple, or seasoned elder, there is a
                supportive circle ready to walk alongside you in every season of life.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">
                  <span>Connect with a Leader</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/team" className="btn btn-outline-dark">
                  <span>Meet Our Pastoral Team</span>
                </Link>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                className="church-photo-frame"
                style={{
                  width: '100%',
                  aspectRatio: '16/11',
                }}
              >
                <Image
                  src="/image/church_prayer_vigil.jpg"
                  alt="Fellowship and passionate prayer at ASWS Global Ministry"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{ objectFit: 'cover' }}
                  className="church-photo-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHURCH PHOTO GALLERY SECTION
          Moments from recent events, worship programs, and outreach missions
          ========================================================================= */}
      <section className="section section-light" aria-labelledby="home-gallery-heading">
        <div className="container">
          <PhotoGallery
            initialImages={galleryImages}
            title="Moments of Faith, Fellowship & Outreach"
            subtitle="Catch a glimpse of the Holy Spirit at work across our church events, all-night prayer vigils, choir ministrations, and community gospel missions."
            showCategoryTabs={true}
          />

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/gallery" className="btn btn-outline-dark btn-lg">
              <Camera size={18} />
              <span>Explore Full Photo Gallery Archives</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS & STORIES OF FAITH
          Wall of transformation stories & member testimony submission
          ========================================================================= */}
      <TestimonialSection initialTestimonials={testimonials} />

      {/* =========================================================================
          PRAYER & PASTORAL SUPPORT INVITATION

          Warm, compassionate banner inviting personal connection
          ========================================================================= */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary-navy) 0%, #152238 100%)',
          color: '#ffffff',
          padding: '4.5rem 0',
          borderTop: '2px solid var(--accent-gold)',
          borderBottom: '2px solid var(--accent-gold)',
        }}
        aria-label="Pastoral Care and Prayer"
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(197, 155, 39, 0.2)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold-light)',
              margin: '0 auto 1.5rem',
            }}
          >
            <PhoneCall size={30} />
          </div>

          <h2 style={{ color: '#ffffff', fontSize: '2.25rem', marginBottom: '1rem' }}>
            Do You Need Prayer or Pastoral Counseling?
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.65', marginBottom: '2rem' }}>
            No burden is too heavy for God to carry. Rev'd James Oyegbile and our ministerial team
            are here to lift you up in prayer, share spiritual guidance, and walk with you in faith.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              <BookOpen size={18} />
              <span>Submit a Prayer Request</span>
            </Link>
            <a href={`tel:${churchInfo.phone}`} className="btn btn-secondary btn-lg">
              <PhoneCall size={18} />
              <span>Call Church Office: {churchInfo.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
