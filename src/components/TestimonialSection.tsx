'use client';

import React, { useState, useTransition } from 'react';
import { TestimonialItem } from '@/lib/types';
import { submitTestimonialAction } from '@/app/actions';
import {
  Quote,
  Sparkles,
  Plus,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  ShieldCheck,
  User,
  Heart,
  Share2,
} from 'lucide-react';

interface TestimonialSectionProps {
  initialTestimonials: TestimonialItem[];
}

const CATEGORIES = [
  'All Stories',
  'Healing & Deliverance',
  'Salvation & Purpose',
  'Family & Motherhood',
  'Family & Marriage',
  'Deliverance & Freedom',
  'Provision & Thanksgiving',
];

export default function TestimonialSection({ initialTestimonials }: TestimonialSectionProps) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [activeCategory, setActiveCategory] = useState<string>('All Stories');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedForModal, setSelectedForModal] = useState<TestimonialItem | null>(null);

  // Form state
  const [isPending, startTransition] = useTransition();
  const [formFeedback, setFormFeedback] = useState<{
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
  } | null>(null);

  // Filtered list
  const filteredTestimonials = testimonials.filter((item) => {
    if (activeCategory === 'All Stories') return true;
    return item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(item.category.toLowerCase());
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormFeedback(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitTestimonialAction(null, formData);
      setFormFeedback(result);
      if (result.success && result.data) {
        // Optimistically prepend to active list
        setTestimonials((prev) => [result.data as TestimonialItem, ...prev]);
        // Auto close after brief pause or allow viewing
        setTimeout(() => {
          setIsModalOpen(false);
          setFormFeedback(null);
        }, 2500);
      }
    });
  };

  return (
    <section
      id="testimonials-section"
      className="section"
      style={{
        backgroundColor: '#faf8f5',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(197, 155, 39, 0.25)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle spiritual background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 155, 39, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 27, 42, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--accent-gold-dark)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '0.5rem',
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Stories of Transformation & Faith</span>
            </span>

            <h2
              id="testimonials-heading"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: 'var(--primary-navy)',
                marginBottom: '0.85rem',
                lineHeight: 1.2,
                fontFamily: 'var(--font-serif), Georgia, serif',
              }}
            >
              What God Has Done in Our Midst
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              "And they overcame him by the blood of the Lamb, and by the word of their testimony."
              — <em>Revelation 12:11</em>. Hear firsthand accounts of healing, deliverance, salvation,
              and breakthrough from congregation members at ASWS Global Ministry.
            </p>
          </div>

          {/* Action Button: Share Your Story */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                boxShadow: '0 4px 16px rgba(197, 155, 39, 0.35)',
              }}
            >
              <Plus size={18} />
              <span>Share Your Testimony</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none',
          }}
          role="tablist"
          aria-label="Filter testimonials by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive
                    ? '1.5px solid var(--accent-gold)'
                    : '1.5px solid var(--border-subtle)',
                  backgroundColor: isActive ? 'var(--primary-navy)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 4px 12px rgba(13, 27, 42, 0.15)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3.5rem',
          }}
        >
          {filteredTestimonials.map((item) => {
            const isExpanded = expandedId === item.id;
            const isLong = item.story.length > 220;
            const displayStory =
              isExpanded || !isLong ? item.story : `${item.story.slice(0, 210)}...`;

            return (
              <article
                key={item.id}
                className="church-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '2.25rem 2rem 1.75rem',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.25s ease',
                }}
              >
                {/* Decorative Top Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '2rem',
                    right: '2rem',
                    height: '3px',
                    background: 'linear-gradient(90deg, var(--accent-gold) 0%, transparent 100%)',
                  }}
                />

                {/* Card Header: Category & Scripture */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'rgba(197, 155, 39, 0.12)',
                      color: 'var(--text-gold)',
                      border: '1px solid rgba(197, 155, 39, 0.3)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span>{item.category}</span>
                  </span>

                  {item.scripture && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.775rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        fontStyle: 'italic',
                      }}
                    >
                      <BookOpen size={13} style={{ color: 'var(--accent-gold)' }} />
                      <span>{item.scripture}</span>
                    </span>
                  )}
                </div>

                {/* Quote Icon */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(13, 27, 42, 0.04)',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <Quote size={20} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--primary-navy)',
                    lineHeight: 1.35,
                    marginBottom: '0.85rem',
                    fontFamily: 'var(--font-serif), Georgia, serif',
                  }}
                >
                  {item.title}
                </h3>

                {/* Story Body */}
                <p
                  style={{
                    fontSize: '0.975rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    flex: 1,
                    marginBottom: '1.25rem',
                  }}
                >
                  "{displayStory}"
                </p>

                {/* Expand / View Full Story Button */}
                {isLong && (
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'var(--accent-gold-dark)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      marginBottom: '1.5rem',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span>{isExpanded ? 'Show less' : 'Read full testimony'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}

                {/* Card Footer: Author Profile */}
                <div
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginTop: 'auto',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-navy)',
                        color: 'var(--accent-gold-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: '2px solid rgba(197, 155, 39, 0.4)',
                        flexShrink: 0,
                      }}
                    >
                      {item.name
                        .split(' ')
                        .filter((p) => !['Sister', 'Brother', 'Elder', 'Pastor'].includes(p))
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join('') || <User size={18} />}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: 'var(--primary-navy)',
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.locationOrRole || 'Congregation Member'}
                      </div>
                    </div>
                  </div>

                  <span
                    title="Verified Congregation Member"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      color: '#059669',
                      background: '#ecfdf5',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      border: '1px solid #a7f3d0',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Encouragement Callout Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary-navy) 0%, #15253b 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '2px solid rgba(197, 155, 39, 0.4)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--accent-gold-light)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}
            >
              <Heart size={14} />
              <span>Glorify God & Strengthen Your Brethren</span>
            </div>
            <h3
              style={{
                color: '#ffffff',
                fontSize: '1.65rem',
                fontFamily: 'var(--font-serif), Georgia, serif',
                marginBottom: '0.5rem',
              }}
            >
              Has the Lord Done a Miracle in Your Life?
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              Never keep God’s goodness to yourself! Your story of salvation, deliverance, or healing
              may be the very anchor that gives someone else hope to keep believing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-lg"
            style={{
              padding: '0.95rem 2rem',
              fontSize: '1.05rem',
              fontWeight: 700,
            }}
          >
            <Plus size={18} />
            <span>Submit Your Testimony Now</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SHARE YOUR TESTIMONY MODAL DIALOG
          ========================================================================= */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(7, 13, 20, 0.78)',
            backdropFilter: 'blur(6px)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)',
              border: '2px solid var(--accent-gold)',
              padding: '2.5rem',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close form"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-navy)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '1.75rem', paddingRight: '2rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-gold)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '0.4rem',
                }}
              >
                <Sparkles size={14} />
                <span>Wall of Faith</span>
              </div>
              <h3
                id="modal-title"
                style={{
                  fontSize: '1.85rem',
                  color: 'var(--primary-navy)',
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  marginBottom: '0.5rem',
                }}
              >
                Share Your Story of Faith & Victory
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                Please take a moment to record what the Lord has done for you. Your testimony will
                be shared to inspire our church family and encourage believers everywhere.
              </p>
            </div>

            {/* Feedback Alert */}
            {formFeedback && (
              <div
                className={`form-alert ${
                  formFeedback.success ? 'form-alert-success' : 'form-alert-error'
                }`}
                style={{ marginBottom: '1.5rem' }}
                role="status"
                aria-live="polite"
              >
                {formFeedback.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{formFeedback.message}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Name & Role Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="test-name" className="form-label">
                    Your Name or Pseudonym <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="test-name"
                    name="name"
                    required
                    className="form-control"
                    placeholder="e.g. Sister Deborah A. or Bro. John"
                    disabled={isPending}
                  />
                  {formFeedback?.errors?.name && (
                    <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                      {formFeedback.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="test-role" className="form-label">
                    Ministry Department / Location
                  </label>
                  <input
                    type="text"
                    id="test-role"
                    name="locationOrRole"
                    className="form-control"
                    placeholder="e.g. Youth Fellowship, Ayedire, Ogbomosho"
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Category & Scripture Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="test-category" className="form-label">
                    Category of Testimony <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    id="test-category"
                    name="category"
                    required
                    className="form-control"
                    disabled={isPending}
                    defaultValue="Healing & Deliverance"
                  >
                    <option value="Healing & Deliverance">Healing & Deliverance</option>
                    <option value="Salvation & Purpose">Salvation & Purpose</option>
                    <option value="Family & Motherhood">Family & Motherhood (Barrenness to Fruitfulness)</option>
                    <option value="Family & Marriage">Family & Marriage Restoration</option>
                    <option value="Deliverance & Freedom">Deliverance & Freedom</option>
                    <option value="Provision & Thanksgiving">Financial Provision & Thanksgiving</option>
                    <option value="General Testimony">General Praise & Thanksgiving</option>
                  </select>
                  {formFeedback?.errors?.category && (
                    <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                      {formFeedback.errors.category[0]}
                    </p>
                  )}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="test-scripture" className="form-label">
                    Anchor Scripture (Optional)
                  </label>
                  <input
                    type="text"
                    id="test-scripture"
                    name="scripture"
                    className="form-control"
                    placeholder="e.g. Psalm 103:2-3 or 2 Cor 5:17"
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label htmlFor="test-title" className="form-label">
                  Testimony Title / Summary <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  id="test-title"
                  name="title"
                  required
                  className="form-control"
                  placeholder="e.g. Delivered from 5 Years of Spiritual Affliction"
                  disabled={isPending}
                />
                {formFeedback?.errors?.title && (
                  <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {formFeedback.errors.title[0]}
                  </p>
                )}
              </div>

              {/* Story */}
              <div className="form-group">
                <label htmlFor="test-story" className="form-label">
                  Your Full Story of God’s Intervention <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  id="test-story"
                  name="story"
                  rows={5}
                  required
                  className="form-control"
                  placeholder="Describe the situation you faced, how God stepped in through worship, prayer, or pastoral counsel, and the victorious outcome..."
                  disabled={isPending}
                />
                {formFeedback?.errors?.story && (
                  <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {formFeedback.errors.story[0]}
                  </p>
                )}
              </div>

              {/* Consent checkbox */}
              <div
                className="form-group"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  background: 'var(--surface-muted)',
                  padding: '1rem',
                  borderRadius: '10px',
                }}
              >
                <input
                  type="checkbox"
                  id="test-consent"
                  defaultChecked
                  required
                  style={{
                    width: '18px',
                    height: '18px',
                    marginTop: '2px',
                    accentColor: 'var(--accent-gold)',
                    cursor: 'pointer',
                  }}
                  disabled={isPending}
                />
                <label
                  htmlFor="test-consent"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                  }}
                >
                  I certify this testimony is truthful to the glory of God, and I gladly permit
                  All Soul’s Winning for Saviour Global Ministry to publish it to encourage believers.
                </label>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  marginTop: '1.5rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline-dark"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isPending}
                  style={{ minWidth: '180px' }}
                >
                  {isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Story...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Publish Testimony</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
