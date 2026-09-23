'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  MessageCircle,
  Users,
  Send,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

export interface SocialShareWidgetProps {
  title: string;
  description?: string;
  url?: string;
  layout?: 'banner' | 'card' | 'inline' | 'compact';
  customClass?: string;
}

export default function SocialShareWidget({
  title,
  description = 'Be blessed by God’s Word from All Soul’s Winning for Saviour Global Ministry, Ogbomosho.',
  url,
  layout = 'card',
}: SocialShareWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (url) {
      if (url.startsWith('http')) {
        setCurrentUrl(url);
      } else if (typeof window !== 'undefined') {
        setCurrentUrl(`${window.location.origin}${url}`);
      }
    } else if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const shareText = `${title} — ${description}`;
  const encodedUrl = encodeURIComponent(currentUrl || 'https://ais-pre-7edhfeeqwia26rk36zjojd-335137421450.europe-west2.run.app');
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${description}\n`)}${encodedUrl}`,
      icon: MessageCircle,
      color: '#25D366',
      bg: 'rgba(37, 211, 102, 0.12)',
      border: 'rgba(37, 211, 102, 0.35)',
      title: 'Share on WhatsApp',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      icon: Users,
      color: '#1877F2',
      bg: 'rgba(24, 119, 242, 0.12)',
      border: 'rgba(24, 119, 242, 0.35)',
      title: 'Share on Facebook',
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: Send,
      color: '#229ED9',
      bg: 'rgba(34, 158, 217, 0.12)',
      border: 'rgba(34, 158, 217, 0.35)',
      title: 'Share on Telegram',
    },
  ];

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl || window.location.href,
        });
      } catch {
        // User cancelled or share error
      }
    }
  };

  // 1. Compact / Inline variant (ideal for inside sermon or event cards)
  if (layout === 'compact') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          paddingTop: '0.85rem',
          marginTop: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
        aria-label={`Share ${title}`}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Share2 size={13} style={{ color: 'var(--accent-gold)' }} />
          <span>Share:</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {shareLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                aria-label={item.title}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  borderRadius: '6px',
                  backgroundColor: item.bg,
                  color: item.color,
                  border: `1px solid ${item.border}`,
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
                className="social-btn-hover"
              >
                <Icon size={14} />
              </a>
            );
          })}

          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Link Copied!' : 'Copy Link to Clipboard'}
            aria-label={copied ? 'Link Copied!' : 'Copy Link to Clipboard'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : 'var(--surface-muted)',
              color: copied ? '#16a34a' : 'var(--text-secondary)',
              border: copied ? '1px solid #16a34a' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    );
  }

  // 2. Inline row variant
  if (layout === 'inline') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
        aria-label={`Share ${title}`}
      >
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--primary-navy)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Share2 size={16} style={{ color: 'var(--accent-gold)' }} />
          <span>Share:</span>
        </span>

        {shareLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{
                backgroundColor: item.bg,
                color: item.color,
                border: `1px solid ${item.border}`,
                gap: '0.4rem',
                fontSize: '0.8rem',
                padding: '0.35rem 0.75rem',
              }}
              title={item.title}
            >
              <Icon size={14} />
              <span>{item.name}</span>
            </a>
          );
        })}

        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-sm btn-outline-dark"
          style={{
            gap: '0.4rem',
            fontSize: '0.8rem',
            padding: '0.35rem 0.75rem',
          }}
          title="Copy Link"
        >
          {copied ? <Check size={14} style={{ color: '#16a34a' }} /> : <Copy size={14} />}
          <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    );
  }

  // 3. Banner variant (rich, prominent card at the top or bottom of Sermons or Programs)
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--surface-white) 0%, var(--surface-warm) 100%)',
        borderRadius: '16px',
        border: '1.5px solid rgba(197, 155, 39, 0.4)',
        padding: '2rem 1.75rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2.5rem',
      }}
      aria-label="Social Media Share Widget"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div style={{ maxWidth: '580px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--text-gold)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.4rem',
            }}
          >
            <Share2 size={15} />
            <span>Spread God’s Word & Invite Others</span>
          </div>
          <h3
            style={{
              fontSize: '1.35rem',
              color: 'var(--primary-navy)',
              margin: '0 0 0.4rem',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            {description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* WhatsApp Button */}
          <a
            href={shareLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{
              backgroundColor: '#25D366',
              color: '#ffffff',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
            }}
            title="Share via WhatsApp"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>

          {/* Facebook Button */}
          <a
            href={shareLinks[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{
              backgroundColor: '#1877F2',
              color: '#ffffff',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              boxShadow: '0 2px 8px rgba(24, 119, 242, 0.25)',
            }}
            title="Share via Facebook"
          >
            <Users size={16} />
            <span>Facebook</span>
          </a>

          {/* Telegram Button */}
          <a
            href={shareLinks[2].href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{
              backgroundColor: '#229ED9',
              color: '#ffffff',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              boxShadow: '0 2px 8px rgba(34, 158, 217, 0.25)',
            }}
            title="Share via Telegram"
          >
            <Send size={16} />
            <span>Telegram</span>
          </a>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-sm btn-outline-dark"
            style={{
              gap: '0.45rem',
              padding: '0.6rem 0.95rem',
              borderColor: copied ? '#16a34a' : 'var(--border-medium)',
              color: copied ? '#16a34a' : 'var(--text-primary)',
            }}
            title="Copy link to share"
          >
            {copied ? <Check size={15} style={{ color: '#16a34a' }} /> : <Copy size={15} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
