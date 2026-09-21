import React from 'react';
import { SermonItem } from '@/lib/types';
import { Play, Calendar, User, BookOpen, Volume2 } from 'lucide-react';

interface SermonCardProps {
  sermon: SermonItem;
}

export default function SermonCard({ sermon }: SermonCardProps) {
  const formattedDate = new Date(sermon.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}
      aria-labelledby={`sermon-title-${sermon.id}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--accent-gold-subtle)',
            color: 'var(--text-gold)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
          }}
        >
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </span>

        {sermon.series && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {sermon.series}
          </span>
        )}
      </div>

      <h3
        id={`sermon-title-${sermon.id}`}
        style={{
          fontSize: '1.4rem',
          color: 'var(--primary-navy)',
          marginBottom: '0.75rem',
          lineHeight: '1.3',
        }}
      >
        {sermon.title}
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--accent-gold-dark)',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        <User size={15} />
        <span>{sermon.speaker}</span>
      </div>

      <p
        style={{
          fontSize: '0.95rem',
          lineHeight: '1.65',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          flex: 1,
        }}
      >
        {sermon.description}
      </p>

      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
        <a
          href={sermon.videoUrl || '#'}
          className="btn btn-primary btn-sm"
          style={{ flex: 1, justifyContent: 'center' }}
          aria-label={`Watch message: ${sermon.title}`}
        >
          <Play size={14} fill="currentColor" />
          <span>Watch Message</span>
        </a>

        {sermon.audioUrl && (
          <a
            href={sermon.audioUrl}
            className="btn btn-outline-dark btn-sm"
            aria-label={`Listen to message: ${sermon.title}`}
          >
            <Volume2 size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
