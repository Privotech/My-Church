import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import BankTransferCard from '@/components/BankTransferCard';
import { Heart, Coins, Home, Globe2, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Give & Support the Ministry | ASWS Global Ministry',
  description:
    'Partner with All Soul’s Winning for Saviour Global Ministry through your tithes, freewill offerings, missions support, and building pledges.',
  alternates: {
    canonical: '/give',
  },
  openGraph: {
    title: 'Give & Support the Ministry | ASWS Global Ministry',
    description:
      'Partner with All Soul’s Winning for Saviour Global Ministry through your tithes, freewill offerings, missions support, and building pledges.',
    url: '/give',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
  },
};

export default function GivePage() {
  return (
    <>
      <PageHeader
        title="Kingdom Giving & Stewardship"
        subtitle="Your generous partnership fuels the preaching of the Gospel, discipleship of believers, community welfare, and the advancement of God's Kingdom."
        eyebrow="Partnering in Faith"
        actionText="View Bank Account"
        actionHref="#bank-details"
      />

      {/* =========================================================================
          BANK DETAILS & GIVING OVERVIEW
          ========================================================================= */}
      <section className="section section-white" id="bank-details" aria-labelledby="give-heading">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <span className="section-eyebrow">How to Give</span>
            <h2 className="section-title" id="give-heading">
              Direct Bank Transfer
            </h2>
            <p className="section-description">
              You can support the ministry securely via your mobile banking app, internet banking,
              or direct cash deposit using the official church details below.
            </p>
          </div>

          <BankTransferCard />
        </div>
      </section>

      {/* =========================================================================
          GIVING CATEGORIES
          ========================================================================= */}
      <section className="section section-cream" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Areas of Kingdom Impact</span>
            <h2 className="section-title" id="categories-heading">
              Ways Your Giving Makes a Difference
            </h2>
            <p className="section-description">
              Every seed sown is stewarded with utmost accountability, prayer, and dedication to God's glory.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Tithes */}
            <div className="church-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Coins size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                Tithes
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Returning the holy tenth of your increase to God in obedience to Malachi 3:10, unlocking
                heaven's blessings over your household and labors.
              </p>
            </div>

            {/* General Offerings */}
            <div className="church-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                Freewill Offerings
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Cheerfully blessing the Lord out of gratitude for His goodness, protection, good health,
                and provision in your daily life.
              </p>
            </div>

            {/* Missions & Evangelism */}
            <div className="church-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Globe2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                Soul Winning & Missions
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Directly sponsoring community crusades, gospel literature printing, village evangelism,
                and spreading Christ’s love to unreached souls.
              </p>
            </div>

            {/* Building & Welfare */}
            <div className="church-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'rgba(197, 155, 39, 0.15)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Home size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.65rem' }}>
                Sanctuary & Welfare
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Supporting church facility maintenance, audiovisual worship improvements, and caring for
                widows, orphans, and families in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCRIPTURAL MEDITATION ON GIVING
          ========================================================================= */}
      <section className="section section-dark" aria-label="Scripture on Giving">
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
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
            <BookOpen size={26} />
          </div>

          <blockquote
            style={{
              fontSize: '1.45rem',
              fontStyle: 'italic',
              fontFamily: 'var(--font-serif), Georgia, serif',
              lineHeight: '1.6',
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}
          >
            "Each of you should give what you have decided in your heart to give, not reluctantly or
            under compulsion, for God loves a cheerful giver. And God is able to bless you abundantly, so
            that in all things at all times, having all that you need, you will abound in every good work."
          </blockquote>

          <cite style={{ color: 'var(--accent-gold-light)', fontWeight: 700, fontSize: '1rem', fontStyle: 'normal' }}>
            — 2 Corinthians 9:7–8
          </cite>
        </div>
      </section>
    </>
  );
}
