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
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
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
            <p style={{ fontStyle: 'italic', color: 'var(--accent-gold-light)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              "{churchInfo.motto}"
            </p>
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
                <Link href="/visit">First-Time Visitors</Link>
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
