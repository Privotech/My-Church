import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { churchInfo } from '@/lib/church-data';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ArrowRight,
  BookOpen,
  Video,
  Users,
  MessageCircle,
  Camera,
  Send,
  ExternalLink,
  Share2,
} from 'lucide-react';

export default function Footer() {
  const socialChannels = [
    {
      name: 'YouTube Live',
      description: 'Sunday Streams & Video Sermons',
      href: churchInfo.socialLinks.youtube || '#',
      icon: Video,
      badge: 'Live Broadcasts',
      color: '#ff0000',
      bgHover: 'rgba(255, 0, 0, 0.15)',
      borderHover: '#ff4d4d',
    },
    {
      name: 'WhatsApp Prayer',
      description: 'Instant Counseling & Intercession',
      href: churchInfo.socialLinks.whatsapp || '#',
      icon: MessageCircle,
      badge: '24/7 Hotline',
      color: '#25D366',
      bgHover: 'rgba(37, 211, 102, 0.15)',
      borderHover: '#25D366',
    },
    {
      name: 'Facebook Fellowship',
      description: 'Daily Word, Updates & Community',
      href: churchInfo.socialLinks.facebook || '#',
      icon: Users,
      badge: 'Join Group',
      color: '#1877F2',
      bgHover: 'rgba(24, 119, 242, 0.15)',
      borderHover: '#4285f4',
    },
    {
      name: 'Instagram Moments',
      description: 'Youth Highlights & Testimonies',
      href: churchInfo.socialLinks.instagram || '#',
      icon: Camera,
      badge: 'Photos & Reels',
      color: '#E1306C',
      bgHover: 'rgba(225, 48, 108, 0.15)',
      borderHover: '#f06292',
    },
    {
      name: 'Telegram Channel',
      description: 'Daily Devotionals & Audio Messages',
      href: churchInfo.socialLinks.telegram || '#',
      icon: Send,
      badge: 'Audio & Bulletins',
      color: '#229ED9',
      bgHover: 'rgba(34, 158, 217, 0.15)',
      borderHover: '#29b6f6',
    },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* =========================================================================
            PROMINENT SOCIAL MEDIA & COMMUNITY ENGAGEMENT SECTION
            ========================================================================= */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(27, 38, 59, 0.95) 0%, rgba(13, 27, 42, 0.98) 100%)',
            border: '2px solid rgba(197, 155, 39, 0.35)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            marginBottom: '3.5rem',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
          }}
          aria-label="Social Media Community Hub"
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '1.5rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-gold-light)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '0.5rem',
                }}
              >
                <Share2 size={16} />
                <span>Connect & Engage Worldwide</span>
              </div>
              <h3
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  margin: 0,
                  fontFamily: 'var(--font-serif), Georgia, serif',
                }}
              >
                Join Our Online Ministry Community
              </h3>
              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '0.95rem',
                  margin: '0.5rem 0 0',
                  maxWidth: '650px',
                }}
              >
                Whether you live in Ogbomosho or anywhere across the globe, stay connected with God's word, live Sunday worship broadcasts, instant WhatsApp pastoral prayer, and community fellowship.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={churchInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: '0.5rem' }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Prayer Line</span>
              </a>
              <a
                href={churchInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Video size={18} />
                <span>Watch Sermons</span>
              </a>
            </div>
          </div>

          {/* Grid of Social Channels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
            }}
          >
            {socialChannels.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem',
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  className="social-card-hover"
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.color,
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--accent-gold-light)',
                          border: '1px solid rgba(197, 155, 39, 0.3)',
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <h4
                      style={{
                        color: '#ffffff',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        margin: '0 0 0.25rem',
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.825rem',
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'var(--accent-gold-light)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <span>Connect Now</span>
                    <ExternalLink size={13} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer-top">
          {/* Column 1: Ministry Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <Image
                src={churchInfo.logoUrl}
                alt="ASWS Global Ministry Logo"
                width={64}
                height={64}
                style={{ objectFit: 'contain' }}
                className="church-logo-img"
              />
              <div>
                <h4 className="footer-brand-title" style={{ margin: 0, fontSize: '1.15rem' }}>
                  ALL SOUL'S WINNING
                </h4>
                <span style={{ color: 'var(--accent-gold-light)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                  FOR SAVIOUR GLOBAL MINISTRY
                </span>
              </div>
            </div>
            <p className="footer-about-text">
              A Christ-centered ministry committed to winning souls for Christ, discipling believers,
              and empowering families to live victorious, purposeful lives through the Holy Spirit.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent-gold-light)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              "{churchInfo.motto}"
            </p>

            {/* Quick Social Media Icons */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
                Social Channels:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href={churchInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(37, 211, 102, 0.15)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#25D366',
                    transition: 'all 0.2s',
                  }}
                  title="WhatsApp Pastoral Prayer Line"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={churchInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on YouTube"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 0, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff4d4d',
                    transition: 'all 0.2s',
                  }}
                  title="YouTube Sermons & Live Worship"
                >
                  <Video size={18} />
                </a>
                <a
                  href={churchInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Facebook"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(24, 119, 242, 0.15)',
                    border: '1px solid rgba(24, 119, 242, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa',
                    transition: 'all 0.2s',
                  }}
                  title="Facebook Community"
                >
                  <Users size={18} />
                </a>
                <a
                  href={churchInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(225, 48, 108, 0.15)',
                    border: '1px solid rgba(225, 48, 108, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f472b6',
                    transition: 'all 0.2s',
                  }}
                  title="Instagram Ministry Moments"
                >
                  <Camera size={18} />
                </a>
                <a
                  href={churchInfo.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Telegram Channel"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(34, 158, 217, 0.15)',
                    border: '1px solid rgba(34, 158, 217, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    transition: 'all 0.2s',
                  }}
                  title="Telegram Channel & Audio"
                >
                  <Send size={18} />
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href="/give" className="btn btn-primary btn-sm">
                <Heart size={14} fill="currentColor" />
                <span>Support the Ministry</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Our Mission</Link>
              </li>
              <li>
                <Link href="/team">Pastoral Leadership</Link>
              </li>
              <li>
                <Link href="/programs">Service Times & Schedule</Link>
              </li>
              <li>
                <Link href="/sermons">Sermons & Messages</Link>
              </li>
              <li>
                <Link href="/gallery">Photo & Mission Gallery</Link>
              </li>
              <li>
                <Link href="/visit">First-Time Visitors</Link>
              </li>
              <li>
                <Link href="/#testimonials-section">Faith Testimonies</Link>
              </li>
              <li>
                <Link href="/contact">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Times */}
          <div>
            <h5 className="footer-col-title">Worship Times</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.2rem' }}>Sunday Celebration</div>
                <div style={{ color: 'var(--accent-gold-light)' }}>9:30 AM – 12:00 PM</div>
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.2rem' }}>Sunday School</div>
                <div style={{ color: '#94a3b8' }}>8:00 AM – 9:30 AM</div>
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.2rem' }}>Tuesday Bible Study</div>
                <div style={{ color: '#94a3b8' }}>5:00 PM – 6:30 PM</div>
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.2rem' }}>Wednesday Prayer Meeting</div>
                <div style={{ color: '#94a3b8' }}>9:00 AM – 12:00 PM</div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Worship Location */}
          <div>
            <h5 className="footer-col-title">Our Sanctuary</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ color: '#cbd5e1', lineHeight: '1.5' }}>
                  {churchInfo.address}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <a href={`tel:${churchInfo.phone}`} style={{ color: '#cbd5e1' }}>
                  {churchInfo.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <a href={`mailto:${churchInfo.email}`} style={{ color: '#cbd5e1' }}>
                  {churchInfo.email}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <BookOpen size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span style={{ color: '#94a3b8' }}>
                  Senior Pastor: {churchInfo.pastor}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            &copy; {churchInfo.copyrightYear} {churchInfo.name}. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/visit" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Directions
            </Link>
            <Link href="/give" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Online Giving
            </Link>
            <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Prayer Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
