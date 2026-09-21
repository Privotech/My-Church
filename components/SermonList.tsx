'use client';

import React, { useState, useMemo } from 'react';
import { SermonItem } from '@/lib/types';
import SermonCard from '@/components/SermonCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface SermonListProps {
  initialSermons: SermonItem[];
}

export default function SermonList({ initialSermons }: SermonListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('ALL');

  const speakers = useMemo(() => {
    const list = Array.from(new Set(initialSermons.map((s) => s.speaker)));
    return ['ALL', ...list];
  }, [initialSermons]);

  const filteredSermons = useMemo(() => {
    return initialSermons.filter((sermon) => {
      const matchesSearch =
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sermon.series && sermon.series.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpeaker =
        selectedSpeaker === 'ALL' || sermon.speaker === selectedSpeaker;
      return matchesSearch && matchesSpeaker;
    });
  }, [initialSermons, searchTerm, selectedSpeaker]);

  return (
    <div>
      {/* Search and Speaker Filter Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <label
            htmlFor="sermon-search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--primary-navy)',
              marginBottom: '0.5rem',
            }}
          >
            <Search size={15} style={{ color: 'var(--accent-gold)' }} />
            <span>Search Messages</span>
          </label>
          <input
            id="sermon-search"
            type="search"
            className="form-control"
            placeholder="Search by topic, Scripture passage, keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="speaker-filter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--primary-navy)',
              marginBottom: '0.5rem',
            }}
          >
            <Filter size={15} style={{ color: 'var(--accent-gold)' }} />
            <span>Filter by Speaker</span>
          </label>
          <select
            id="speaker-filter"
            className="form-control"
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
          >
            {speakers.map((spk) => (
              <option key={spk} value={spk}>
                {spk === 'ALL' ? 'All Ministerial Speakers' : spk}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sermon Results Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-secondary)' }}>
          Showing {filteredSermons.length} {filteredSermons.length === 1 ? 'message' : 'messages'}
        </p>

        {(searchTerm || selectedSpeaker !== 'ALL') && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedSpeaker('ALL');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              color: 'var(--text-gold)',
              fontWeight: 600,
            }}
          >
            <RefreshCw size={13} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Sermons Grid */}
      {filteredSermons.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredSermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-navy)' }}>
            No sermons found
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            We couldn't find any messages matching "{searchTerm}". Try a different topic or clear your search filter.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('');
              setSelectedSpeaker('ALL');
            }}
          >
            <span>View All Messages</span>
          </button>
        </div>
      )}
    </div>
  );
}
