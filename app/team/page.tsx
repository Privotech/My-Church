import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { getTeamMembers } from '@/lib/data-service';
import { Phone, Mail, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Pastoral & Ministerial Team | ASWS Global Ministry',
  description:
    'Meet the dedicated pastors, evangelists, and departmental leaders serving at All Soul’s Winning for Saviour Global Ministry under Rev’d James Oyegbile.',
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'Our Pastoral & Ministerial Team | ASWS Global Ministry',
    description:
      'Meet the dedicated pastors, evangelists, and departmental leaders serving at All Soul’s Winning for Saviour Global Ministry under Rev’d James Oyegbile.',
    url: '/team',
    siteName: "All Soul's Winning for Saviour Global Ministry",
    locale: 'en_US',
    type: 'website',
  },
};

export default async function TeamPage() {
  const team = await getTeamMembers();

  // Highlight Senior Pastor as leader
  const seniorPastor = team[0];
  const departmentalLeaders = team.slice(1);

  return (
    <>
      <PageHeader
        title="Our Pastoral & Ministry Leadership"
        subtitle="Godly men and women dedicated to shepherding, teaching, praying, and leading our congregation with divine integrity."
        eyebrow="Spiritual Shepherds"
        actionText="Contact Pastoral Team"
        actionHref="/contact"
      />

      <section className="section section-white" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Dedicated Servants of God</span>
            <h2 className="section-title" id="team-heading">
              Meet Our Church Leaders
            </h2>
            <p className="section-description">
              "Obey your leaders and submit to them, for they are keeping watch over your souls,
              as those who will have to give an account." — Hebrews 13:17
            </p>
          </div>

          {/* Senior Pastor Feature Card */}
          {seniorPastor && (
            <div
              style={{
                background: 'linear-gradient(135deg, var(--surface-warm) 0%, #ffffff 100%)',
                borderRadius: '20px',
                border: '1.5px solid var(--accent-gold)',
                padding: '3rem',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '4.5rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '25px',
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--text-gold)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                General Superintendent
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    className="pastor-portrait-frame"
                    style={{
                      width: '280px',
                      height: '340px',
                      margin: '0 auto',
                    }}
                  >
                    <Image
                      src={seniorPastor.imageUrl || '/image/1742890223853-removebg-preview.png'}
                      alt={seniorPastor.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="pastor-portrait-img"
                      priority
                    />
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      color: 'var(--accent-gold)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {seniorPastor.role}
                  </span>
                  <h3 style={{ fontSize: '2.1rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                    {seniorPastor.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      fontStyle: 'italic',
                      color: 'var(--primary-navy-light)',
                      lineHeight: '1.65',
                      marginBottom: '1.5rem',
                      borderLeft: '3px solid var(--accent-gold)',
                      paddingLeft: '1rem',
                    }}
                  >
                    "{seniorPastor.quoteOrDescription}"
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                    Leading with apostolic grace and fervent prayer, Pastor James continues to mentor
                    young ministers, preach the uncompromised truth, and spearhead the global soul-winning
                    crusades of ASWS Global Ministry.
                  </p>
                  <Link href="/contact" className="btn btn-primary">
                    <span>Request Pastoral Meeting</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Departmental & Ministerial Team Grid */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '1.75rem' }}>
              Ministerial & Departmental Coordinators
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
              {departmentalLeaders.map((member) => (
                <article
                  key={member.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                    {member.imageUrl ? (
                      <div
                        className="team-member-portrait-frame"
                        style={{
                          width: '90px',
                          height: '90px',
                        }}
                      >
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="team-member-portrait-img"
                        />
                      </div>
                    ) : (
                      <div
                        className="team-member-portrait-frame"
                        style={{
                          width: '90px',
                          height: '90px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-gold)',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                        }}
                        aria-hidden="true"
                      >
                        ✝
                      </div>
                    )}

                    <div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--accent-gold)',
                          letterSpacing: '0.05em',
                          display: 'block',
                          marginBottom: '0.2rem',
                        }}
                      >
                        {member.role}
                      </span>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', margin: 0 }}>
                        {member.name}
                      </h4>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '0.95rem',
                      fontStyle: 'italic',
                      lineHeight: '1.6',
                      color: 'var(--text-secondary)',
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    "{member.quoteOrDescription}"
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pastoral Counseling Support Banner */}
      <section className="section section-cream" aria-label="Connect with leadership">
        <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
            We Are Here to Serve You in Ministry
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            Whether you want to join a department (Choir, Usheering, Evangelism, Youth Ministry) or
            need private pastoral counsel, our leadership team is readily accessible.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              <span>Send Message to Leaders</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/visit" className="btn btn-outline-dark">
              <span>Plan Sunday Visit</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
