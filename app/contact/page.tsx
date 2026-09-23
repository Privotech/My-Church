import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import PrayerRequestForm from '@/components/PrayerRequestForm';
import { churchInfo } from '@/lib/church-data';
import { MapPin, Phone, Mail, Clock, BookOpen, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Prayer Requests | ASWS Global Ministry',
  description:
    'Reach out to All Soul’s Winning for Saviour Global Ministry in Ogbomosho, Nigeria. Send messages, request pastoral counseling, or submit prayer requests.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us & Prayer Requests | ASWS Global Ministry',
    description:
      'Connect with All Soul’s Winning for Saviour Global Ministry. Submit prayer requests, seek pastoral counseling, or locate our worship center in Ogbomosho, Oyo State, Nigeria.',
    url: '/contact',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us & Prayer Requests"
        subtitle="We would love to hear from you. Reach out to our church office or share your prayer needs with our pastoral intercessors."
        eyebrow="Connect & Pray"
      />

      {/* =========================================================================
          CONTACT INFO & SEND MESSAGE SECTION
          ========================================================================= */}
      <section className="section section-white" aria-labelledby="contact-heading">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'flex-start',
              marginBottom: '5rem',
            }}
          >
            {/* Contact Details Card */}
            <div
              style={{
                background: 'var(--surface-warm)',
                borderRadius: '16px',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="section-eyebrow">Church Helpdesk</span>
              <h2 id="contact-heading" style={{ fontSize: '1.85rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
                We Are Here for You
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                Whether you have questions about membership, want to visit this Sunday, or desire
                spiritual counsel, our pastoral staff is ready to serve you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(197, 155, 39, 0.15)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Sanctuary Address
                    </div>
                    <div style={{ color: 'var(--primary-navy)', fontWeight: 600, marginTop: '2px', lineHeight: '1.5' }}>
                      {churchInfo.address}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(197, 155, 39, 0.15)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Phone & WhatsApp
                    </div>
                    <a
                      href={`tel:${churchInfo.phone}`}
                      style={{ color: 'var(--text-gold)', fontWeight: 700, fontSize: '1.1rem', marginTop: '2px', display: 'inline-block' }}
                    >
                      {churchInfo.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(197, 155, 39, 0.15)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Email Inquiries
                    </div>
                    <a
                      href={`mailto:${churchInfo.email}`}
                      style={{ color: 'var(--text-gold)', fontWeight: 600, marginTop: '2px', display: 'inline-block' }}
                    >
                      {churchInfo.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(197, 155, 39, 0.15)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Sunday Service Hours
                    </div>
                    <div style={{ color: 'var(--primary-navy)', fontWeight: 600, marginTop: '2px' }}>
                      Sunday Worship: 9:30 AM – 12:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <ContactForm />
          </div>

          {/* =========================================================================
              PRAYER REQUEST FORM SECTION
              ========================================================================= */}
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div className="section-header">
              <span className="section-eyebrow">Power of Agreement</span>
              <h2 className="section-title">
                Submit a Prayer Request
              </h2>
              <p className="section-description">
                "The prayer of a righteous person is powerful and effective." — James 5:16.
                Our pastoral prayer team prays over every submitted petition.
              </p>
            </div>

            <PrayerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
