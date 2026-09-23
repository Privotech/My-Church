'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { GalleryImageItem, GalleryCategory } from '@/lib/types';
import {
  Camera,
  Filter,
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Search,
  Share2,
  MessageCircle,
  Users,
  Send,
  Check,
  Copy,
} from 'lucide-react';

interface PhotoGalleryProps {
  initialImages?: GalleryImageItem[];
  title?: string;
  subtitle?: string;
  showCategoryTabs?: boolean;
  limit?: number;
  featuredOnly?: boolean;
  initialCategory?: GalleryCategory;
}

const CATEGORIES: { key: GalleryCategory; label: string; icon: React.ElementType }[] = [
  { key: 'ALL', label: 'All Photos', icon: Camera },
  { key: 'EVENTS', label: 'Church Events', icon: Sparkles },
  { key: 'PROGRAMS', label: 'Programs & Vigils', icon: Calendar },
  { key: 'OUTREACH', label: 'Outreach & Missions', icon: Users },
  { key: 'WORSHIP', label: 'Worship Moments', icon: Camera },
];

export default function PhotoGallery({
  initialImages = [],
  title = 'Moments of Faith, Fellowship & Missions',
  subtitle = 'Glimpse into the transformative gatherings, vibrant worship services, community outreach missions, and prayer breakthroughs at All Soul’s Winning for Saviour Global Ministry.',
  showCategoryTabs = true,
  limit,
  featuredOnly = false,
  initialCategory = 'ALL',
}: PhotoGalleryProps) {
  const [images, setImages] = useState<GalleryImageItem[]>(initialImages);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // If initialImages was empty or category changed, fetch from API
  const fetchCategoryImages = useCallback(async (cat: GalleryCategory) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat !== 'ALL') params.set('category', cat);
      if (featuredOnly) params.set('featured', 'true');
      if (limit) params.set('limit', limit.toString());

      const res = await fetch(`/api/gallery?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setImages(data.images);
      }
    } catch (err) {
      console.error('Failed to fetch gallery images:', err);
    } finally {
      setIsLoading(false);
    }
  }, [featuredOnly, limit]);

  useEffect(() => {
    if (initialImages.length === 0) {
      fetchCategoryImages(activeCategory);
    }
  }, [fetchCategoryImages, activeCategory, initialImages.length]);

  // Client-side filter by category and search
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCategory =
        activeCategory === 'ALL' || img.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        img.title.toLowerCase().includes(q) ||
        img.description.toLowerCase().includes(q) ||
        img.location.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [images, activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: images.length };
    images.forEach((img) => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, [images]);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setCopied(false);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null && filteredImages.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
      setCopied(false);
    }
  }, [selectedImageIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null && filteredImages.length > 0) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
      setCopied(false);
    }
  }, [selectedImageIndex, filteredImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, nextImage, prevImage]);

  const currentImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  const handleCopyLink = async () => {
    if (!currentImage) return;
    try {
      const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/#gallery` : '';
      await navigator.clipboard.writeText(`${currentImage.title}: ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="church-photo-gallery" id="church-gallery" aria-label="Church Photo Gallery">
      {/* Gallery Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--text-gold)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          <Camera size={16} />
          <span>Visual Ministry & Mission Archives</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
            color: 'var(--primary-navy)',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Filter and Search Controls */}
      {showCategoryTabs && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {/* Category Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
              role="tablist"
              aria-label="Filter photos by category"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.key;
                const count = categoryCounts[cat.key] || 0;
                const Icon = cat.icon;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.55rem 1.15rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected
                        ? '1px solid var(--accent-gold)'
                        : '1px solid var(--border-medium)',
                      backgroundColor: isSelected ? 'var(--primary-navy)' : 'var(--surface-white)',
                      color: isSelected ? 'var(--accent-gold-light)' : 'var(--text-primary)',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                    }}
                  >
                    <Icon size={15} style={{ color: isSelected ? 'var(--accent-gold)' : 'inherit' }} />
                    <span>{cat.label}</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '9999px',
                        backgroundColor: isSelected
                          ? 'rgba(197, 155, 39, 0.25)'
                          : 'var(--surface-muted)',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search Input */}
            <div style={{ position: 'relative', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search photos & missions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 1rem 0.55rem 2.25rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: 'var(--surface-white)',
                  color: 'var(--text-primary)',
                }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'var(--surface-white)',
            borderRadius: '16px',
            border: '1px dashed var(--border-medium)',
          }}
        >
          <Camera size={40} style={{ color: 'var(--accent-gold)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
            No Photos Found
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            We could not find any photos matching your current search or category filter.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredImages.map((image, index) => {
            const categoryBadgeLabel =
              image.category === 'EVENTS'
                ? 'Church Event'
                : image.category === 'OUTREACH'
                ? 'Outreach Mission'
                : image.category === 'PROGRAMS'
                ? 'Program & Vigil'
                : 'Sanctuary Worship';

            return (
              <div
                key={image.id}
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: 'var(--surface-dark-elevated)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  aspectRatio: '4/3',
                }}
                className="gallery-item-card"
                aria-label={`View photo: ${image.title}`}
              >
                {/* Photo Image */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    referrerPolicy="no-referrer"
                    className="gallery-thumbnail-img"
                  />
                  {/* Subtle Gradient Shade for Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(7, 13, 20, 0.2) 0%, rgba(7, 13, 20, 0.75) 100%)',
                      transition: 'opacity 0.2s ease',
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      right: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(13, 27, 42, 0.85)',
                        color: 'var(--accent-gold-light)',
                        border: '1px solid rgba(197, 155, 39, 0.4)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {categoryBadgeLabel}
                    </span>

                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(13, 27, 42, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        backdropFilter: 'blur(4px)',
                      }}
                      title="Click to view full photo"
                    >
                      <Maximize2 size={15} />
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      padding: '1.25rem 1rem 0.85rem',
                      color: '#ffffff',
                    }}
                  >
                    <h4
                      style={{
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        margin: '0 0 0.35rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                      }}
                    >
                      {image.title}
                    </h4>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.75rem',
                        color: '#cbd5e1',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={12} style={{ color: 'var(--accent-gold)' }} />
                        <span>{image.location}</span>
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={12} style={{ color: 'var(--accent-gold)' }} />
                        <span>{image.date}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          LIGHTBOX / FULLSCREEN PHOTO MODAL
          ========================================================================= */}
      {currentImage && selectedImageIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(7, 13, 20, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.title}
          onClick={closeLightbox}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              width: '100%',
              backgroundColor: 'var(--surface-dark)',
              borderRadius: '16px',
              border: '2px solid rgba(197, 155, 39, 0.4)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '92vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(13, 27, 42, 0.9)',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(197, 155, 39, 0.2)',
                    color: 'var(--accent-gold-light)',
                    border: '1px solid rgba(197, 155, 39, 0.4)',
                  }}
                >
                  {currentImage.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Photo {selectedImageIndex + 1} of {filteredImages.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Main Image & Navigation Arrows */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '58vh',
                minHeight: '340px',
                backgroundColor: '#04070b',
                backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.14) 0%, rgba(7, 13, 20, 0.95) 85%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8)',
              }}
            >
              <Image
                src={currentImage.imageUrl}
                alt={currentImage.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(104%) brightness(102%) saturate(105%)',
                }}
                priority
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(13, 27, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(13, 27, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Caption & Social Sharing Footer */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--surface-dark-elevated)',
                color: '#ffffff',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h3
                    style={{
                      color: '#ffffff',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      margin: '0 0 0.35rem',
                    }}
                  >
                    {currentImage.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      fontSize: '0.825rem',
                      color: 'var(--accent-gold-light)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} />
                      <span>{currentImage.location}</span>
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} />
                      <span>{currentImage.date}</span>
                    </span>
                  </div>
                </div>

                {/* Quick Share Widget inside Lightbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                    Share Photo:
                  </span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Check out this photo from All Soul’s Winning for Saviour Global Ministry:\n${currentImage.title} (${currentImage.location})\n`
                    )}${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(37, 211, 102, 0.15)',
                      color: '#25D366',
                      border: '1px solid rgba(37, 211, 102, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Share to WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(24, 119, 242, 0.15)',
                      color: '#60a5fa',
                      border: '1px solid rgba(24, 119, 242, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Share to Facebook"
                  >
                    <Users size={16} />
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}&text=${encodeURIComponent(currentImage.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(34, 158, 217, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(34, 158, 217, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Share to Telegram"
                  >
                    <Send size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      color: copied ? '#86efac' : '#cbd5e1',
                      border: copied ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {currentImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
